// hooks/useArtistSearch.ts
import { useState, useCallback, useEffect } from "react";
import { Artist } from "../types";
import { searchArtist } from "../lib/api/theAudioDB";
import useDebounce from "./useDebounce";
import { ApiError, handleApiError } from "../lib/utils/errorHandling";

/**
 * Interfaz del resultado del hook useArtistSearch
 */
interface UseArtistSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  artists: Artist[];
  isLoading: boolean;
  isError: boolean;
  error: ApiError | null;
  clearResults: () => void;
}

/**
 * Hook personalizado para implementar búsqueda de artistas con debounce
 *
 * @param initialQuery - Consulta inicial opcional
 * @param debounceMs - Tiempo de debounce en milisegundos
 * @returns Estado y funciones para gestionar la búsqueda de artistas
 */
export default function useArtistSearch(
  initialQuery: string = "",
  debounceMs: number = 500,
): UseArtistSearchReturn {
  // Estado para el término de búsqueda
  const [query, setQuery] = useState<string>(initialQuery);
  // Estado para los resultados de la búsqueda
  const [artists, setArtists] = useState<Artist[]>([]);
  // Estado para indicar si está cargando
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Estado para indicar si hay un error
  const [isError, setIsError] = useState<boolean>(false);
  // Estado para el mensaje de error específico
  const [error, setError] = useState<ApiError | null>(null);

  // Aplicar debounce al término de búsqueda para evitar demasiadas peticiones
  const debouncedQuery = useDebounce<string>(query, debounceMs);

  // Función para limpiar resultados
  const clearResults = useCallback(() => {
    setArtists([]);
    setIsError(false);
    setError(null);
  }, []);

  // Efecto para realizar la búsqueda cuando cambia el término de búsqueda con debounce
  useEffect(() => {
    // Si la consulta está vacía, limpiar resultados
    if (!debouncedQuery.trim()) {
      clearResults();
      return;
    }

    const fetchArtists = async () => {
      setIsLoading(true);
      setIsError(false);
      setError(null);

      try {
        const results = await searchArtist(debouncedQuery);
        setArtists(results);
      } catch (err) {
        const apiError = handleApiError(
          err,
          "Error al buscar artistas. Inténtalo de nuevo.",
        );
        setIsError(true);
        setError(apiError);
        setArtists([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtists();
  }, [debouncedQuery, clearResults]);

  return {
    query,
    setQuery,
    artists,
    isLoading,
    isError,
    error,
    clearResults,
  };
}
