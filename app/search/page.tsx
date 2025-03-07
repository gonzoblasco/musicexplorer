// app/search/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Artist } from "../../types";
import { searchArtist, getPopularArtists } from "../../lib/api/theAudioDB";
import ArtistList from "../../components/artist/ArtistList";
import Loader from "../../components/ui/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import NoResults from "../../components/common/NoResults";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [artists, setArtists] = useState<Artist[]>([]);
  const [popularArtists, setPopularArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingPopular, setIsLoadingPopular] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Búsqueda de artistas basada en query
  useEffect(() => {
    const fetchArtists = async () => {
      if (!query) return;

      setIsLoading(true);
      setError(null);

      try {
        const results = await searchArtist(query);
        setArtists(results);
      } catch (err) {
        setError("Error al buscar artistas. Inténtalo de nuevo.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtists();
  }, [query]);

  // Cargar artistas populares si no hay búsqueda
  useEffect(() => {
    const fetchPopularArtists = async () => {
      if (query) return; // No cargar si hay una búsqueda activa

      setIsLoadingPopular(true);

      try {
        const results = await getPopularArtists();
        setPopularArtists(results);
      } catch (err) {
        console.error("Error fetching popular artists:", err);
      } finally {
        setIsLoadingPopular(false);
      }
    };

    fetchPopularArtists();
  }, [query]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {query ? `Resultados para "${query}"` : "Artistas Populares"}
      </h1>

      {error && <ErrorMessage message={error} />}

      {/* Mostrar resultados de búsqueda si hay query */}
      {query &&
        (isLoading ? (
          <div className="py-12">
            <Loader />
          </div>
        ) : artists.length === 0 ? (
          <NoResults message={`No se encontraron resultados para "${query}"`} />
        ) : (
          <ArtistList artists={artists} />
        ))}

      {/* Mostrar artistas populares si no hay query */}
      {!query &&
        (isLoadingPopular ? (
          <div className="py-12">
            <Loader />
          </div>
        ) : (
          <ArtistList artists={popularArtists} />
        ))}
    </div>
  );
}
