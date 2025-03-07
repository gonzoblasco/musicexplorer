// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Artist } from "../types";
import { getPopularArtists } from "../lib/api/theAudioDB";
import SearchBar from "../components/layout/SearchBar";
import ArtistList from "../components/artist/ArtistList";
import Loader from "../components/ui/Loader";
import Link from "next/link";

export default function Home() {
  const [popularArtists, setPopularArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularArtists = async () => {
      setIsLoading(true);
      try {
        const artists = await getPopularArtists();
        // Asegúrate de que artists es un array antes de establecerlo
        if (Array.isArray(artists)) {
          setPopularArtists(artists);
        } else {
          console.error("Expected artists to be an array but got:", artists);
          setPopularArtists([]);
        }
      } catch (error) {
        console.error("Error fetching popular artists:", error);
        setError("No se pudieron cargar los artistas populares");
        setPopularArtists([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularArtists();
  }, []);

  return (
    <div className="flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold text-center mb-8">MusicExplorer</h1>

      <div className="max-w-2xl w-full text-center mb-12">
        <p className="text-xl mb-8">
          Encuentra información sobre tus artistas favoritos y descubre su
          discografía.
        </p>

        <div className="flex justify-center">
          <SearchBar />
        </div>
      </div>

      <div className="w-full mt-8">
        <h2 className="text-2xl font-bold mb-6">Artistas Populares</h2>

        {isLoading ? (
          <div className="py-12">
            <Loader />
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <ArtistList artists={popularArtists} />
        )}
      </div>

      <div className="mt-12 text-center">
        <p className="mb-4 text-gray-500">
          Esta aplicación usa TheAudioDB API gratuita. <br />
          <strong>Nota:</strong> La API gratuita está limitada, pero puedes
          buscar varios artistas.
        </p>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mt-6 max-w-xl mx-auto text-left">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700 dark:text-yellow-200">
                Prueba diferentes búsquedas como "coldplay", "daft punk" o
                "madonna".
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
