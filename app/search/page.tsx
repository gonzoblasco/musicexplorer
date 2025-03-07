"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Artist } from "../../types";
import { searchArtist, getPopularArtists } from "../../lib/api/theAudioDB";
import ArtistList from "../../components/artist/ArtistList";
import Loader from "../../components/ui/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import NoResults from "../../components/common/NoResults";

// Configuración para forzar render dinámico en cliente
export const dynamic = "force-dynamic";

// Componente principal que renderiza la página de búsqueda
export default function SearchPage() {
  return (
    <Suspense fallback={<div>Cargando contenido de la búsqueda...</div>}>
      <SearchParamsHandler />
    </Suspense>
  );
}

// Componente que maneja los parámetros de búsqueda
function SearchParamsHandler() {
  const searchParams = useSearchParams(); // Hook de cliente para manejar los parámetros de consulta
  const query = searchParams?.get("q") || ""; // Parámetro "q" obtenido desde la URL

  return <SearchPageContent query={query} />; // Renderizar el contenido basado en los parámetros
}

// Componente para manejar la lógica de búsqueda y mostrar artistas populares
function SearchPageContent({ query }: { query: string }) {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [popularArtists, setPopularArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingPopular, setIsLoadingPopular] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Búsqueda de artistas según el query
  useEffect(() => {
    const fetchArtists = async () => {
      if (!query) return; // Si no hay query, no buscamos

      setIsLoading(true); // Inicia el estado de carga
      setError(null); // Reinicia errores

      try {
        const results = await searchArtist(query); // Llama a la API de búsqueda
        setArtists(results); // Actualiza el estado con los resultados
      } catch (err) {
        setError("Error al buscar artistas. Inténtalo de nuevo."); // Setea el error si hay problemas
      } finally {
        setIsLoading(false); // Finaliza el estado de carga
      }
    };

    fetchArtists();
  }, [query]); // Se ejecuta cada vez que "query" cambie

  // Cargar artistas populares si no hay query
  useEffect(() => {
    const fetchPopularArtists = async () => {
      if (query) return; // No carga artistas populares si hay una búsqueda activa

      setIsLoadingPopular(true); // Inicia el estado de carga de artistas populares

      try {
        const results = await getPopularArtists(); // Llama a la API de artistas populares
        setPopularArtists(results); // Actualiza el estado con los resultados
      } catch (err) {
        console.error("Error al cargar artistas populares:", err); // Manejo del error en consola
      } finally {
        setIsLoadingPopular(false); // Finaliza el estado de carga de artistas populares
      }
    };

    fetchPopularArtists();
  }, [query]); // Solo carga cuando no hay búsqueda activa

  // Renderizar el contenido de la página
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {query ? `Resultados para "${query}"` : "Artistas Populares"}
      </h1>
      {error && <ErrorMessage message={error} />}{" "}
      {/* Mostrar mensaje de error si lo hay */}
      {/* Mostrar resultados de búsqueda si hay un "query" activo */}
      {query &&
        (isLoading ? (
          <div className="py-12">
            <Loader /> {/* Loader mientras se buscan los artistas */}
          </div>
        ) : artists.length === 0 ? (
          <NoResults message={`No se encontraron resultados para "${query}"`} />
        ) : (
          <ArtistList artists={artists} /> // Lista de resultados
        ))}
      {/* Mostrar artistas populares si no hay búsqueda */}
      {!query &&
        (isLoadingPopular ? (
          <div className="py-12">
            <Loader /> {/* Loader mientras cargan los artistas populares */}
          </div>
        ) : (
          <ArtistList artists={popularArtists} /> // Lista de artistas populares
        ))}
    </div>
  );
}
