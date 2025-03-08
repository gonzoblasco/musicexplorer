// hooks/useArtistQueries.ts
import { ApiError } from "../lib/utils/errorHandling";
import { createApiQueryHook } from "./useApiQuery";
import {
  searchArtist,
  getPopularArtists,
  getArtistById,
} from "../lib/api/theAudioDB";
import { Artist } from "../types";
import { UseQueryOptions } from "@tanstack/react-query";

/**
 * Hook para buscar artistas por nombre
 *
 * @param query - Término de búsqueda
 * @returns Resultado de la consulta con artistas encontrados
 */
export const useArtistSearch = createApiQueryHook<Artist[], [string]>(
  (query) => ["artistSearch", query],
  searchArtist,
  {
    // Solo habilitar la consulta si hay un término de búsqueda válido
    getEnabled: ([query]) => !!query.trim(),
    // Mantener en caché por 5 minutos
    staleTime: 5 * 60 * 1000,
  },
);

/**
 * Hook para obtener artistas populares predefinidos
 *
 * @returns Resultado de la consulta con artistas populares
 */
export const usePopularArtists = createApiQueryHook<Artist[], []>(
  () => ["popularArtists"],
  getPopularArtists,
  {
    // Mantener en caché por 30 minutos ya que cambia con menos frecuencia
    staleTime: 30 * 60 * 1000,
  },
);

/**
 * Hook para obtener los detalles de un artista por su ID
 *
 * @param artistId - ID del artista
 * @param options - Opciones adicionales para la consulta
 * @returns Resultado de la consulta con detalles del artista
 */
export const useArtistDetails = createApiQueryHook<Artist | null, [string]>(
  (artistId) => ["artist", artistId],
  getArtistById,
  {
    // Solo habilitar la consulta si hay un ID de artista válido
    getEnabled: ([artistId]) => !!artistId,
    // Mantener en caché por 15 minutos
    staleTime: 15 * 60 * 1000,
  },
);

/**
 * Hook flexible para obtener y buscar artistas con opciones de configuración extendidas
 *
 * @param artistId - ID del artista o undefined
 * @param options - Opciones para configurar la consulta
 * @returns Resultado de la consulta
 */
export function useArtist(
  artistId: string | undefined,
  options?: {
    enabled?: boolean;
    onSuccess?: (data: Artist | null) => void;
    onError?: (error: ApiError) => void;
    select?: (data: Artist | null) => any;
  } & Partial<UseQueryOptions<Artist | null, ApiError>>,
) {
  // @ts-ignore
  return useArtistDetails(artistId || "", {
    enabled: !!artistId && options?.enabled !== false,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
    select: options?.select,
    ...(options || {}),
  });
}

/**
 * Hook para realizar búsquedas de artistas con opciones extendidas
 *
 * @param query - Término de búsqueda o undefined
 * @param options - Opciones adicionales para la consulta
 * @returns Resultado de la consulta
 */
export function useArtistSearchWithOptions(
  query: string | undefined,
  options?: {
    enabled?: boolean;
    onSuccess?: (data: Artist[]) => void;
    onError?: (error: ApiError) => void;
    select?: (data: Artist[]) => any;
    refetchOnWindowFocus?: boolean;
  },
) {
  // @ts-ignore
  return useArtistSearch(query || "", {
    enabled: !!query && options?.enabled !== false,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
    select: options?.select,
    refetchOnWindowFocus: options?.refetchOnWindowFocus,
  });
}
