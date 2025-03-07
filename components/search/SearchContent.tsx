// components/search/SearchContent.tsx (versión modificada)
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, use } from "react";
import { Artist } from "../../types";
import ArtistList from "../artist/ArtistList";
import Loader from "../ui/Loader";
import ErrorMessage from "../common/ErrorMessage";
import NoResults from "../common/NoResults";

// Esta función fuerza la suspensión durante la hidratación
function useParamsWithSuspense() {
  // Este patrón fuerza a Next.js a reconocer la suspensión
  const searchParams = use(
    // @ts-ignore - Esto es intencional para forzar suspense
    Promise.resolve(useSearchParams()),
  );
  return searchParams;
}

export default function SearchContent() {
  // Usar nuestro hook personalizado en lugar del original
  const searchParams = useParamsWithSuspense();
  const query = searchParams?.get("q") || "";

  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const endpoint = query
          ? `/api/search?q=${encodeURIComponent(query)}`
          : "/api/popular";

        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error("Error fetching data");
        }

        const data = await response.json();
        setArtists(data.artists || []);
      } catch (err) {
        setError("Error al cargar los datos. Inténtalo de nuevo.");
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {query ? `Resultados para "${query}"` : "Artistas Populares"}
      </h1>

      {error && <ErrorMessage message={error} />}

      {isLoading ? (
        <div className="py-12">
          <Loader />
        </div>
      ) : artists.length === 0 ? (
        <NoResults
          message={
            query
              ? `No se encontraron resultados para "${query}"`
              : "No hay artistas populares disponibles."
          }
        />
      ) : (
        <ArtistList artists={artists} />
      )}
    </div>
  );
}
