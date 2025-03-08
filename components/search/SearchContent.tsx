// components/search/SearchContent.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useArtistSearch } from "../../hooks/useArtistQueries";
import ArtistList from "../artist/ArtistList";
import Loader from "../ui/Loader";
import ErrorMessage from "../common/ErrorMessage";
import NoResults from "../common/NoResults";

export default function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("q") || "";

  const {
    data: artists = [],
    isLoading,
    isError,
    error,
  } = useArtistSearch(query);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {query ? `Resultados para "${query}"` : "Artistas Populares"}
      </h1>

      {isError && (
        <ErrorMessage
          message={
            error instanceof Error
              ? error.message || "Error al buscar artistas"
              : "Error al buscar artistas"
          }
        />
      )}

      {isLoading ? (
        <div className="py-12" data-testid="loader">
          <Loader />
        </div>
      ) : artists.length === 0 && !isError ? (
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
