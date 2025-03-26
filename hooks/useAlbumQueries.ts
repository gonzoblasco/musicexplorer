// hooks/useAlbumQueries.ts
import { ApiError } from "../lib/utils/errorHandling";
import { createApiQueryHook } from "./useApiQuery";
import {
  getAlbumById,
  getTracksByAlbumId,
  getAlbumsByArtistId,
} from "../lib/api/theAudioDB";
import { Album, Track } from "../types";

/**
 * Hook para obtener los detalles de un álbum por su ID
 *
 * @param albumId - ID del álbum
 * @param options - Opciones adicionales para la consulta
 * @returns Resultado de la consulta con detalles del álbum
 */
export const useAlbumDetails = createApiQueryHook<Album | null, [string]>(
  (albumId) => ["album", albumId],
  getAlbumById,
  {
    // Solo habilitar la consulta si hay un ID de álbum válido
    getEnabled: ([albumId]) => !!albumId,
    // Mantener en caché por 10 minutos
    staleTime: 10 * 60 * 1000,
  },
);

/**
 * Hook para obtener las pistas de un álbum por su ID
 *
 * @param albumId - ID del álbum
 * @param options - Opciones adicionales para la consulta
 * @returns Resultado de la consulta con pistas del álbum
 */
export const useAlbumTracks = createApiQueryHook<Track[], [string]>(
  (albumId) => ["albumTracks", albumId],
  getTracksByAlbumId,
  {
    // Solo habilitar la consulta si hay un ID de álbum válido
    getEnabled: ([albumId]) => !!albumId,
    // Mantener en caché por 10 minutos
    staleTime: 10 * 60 * 1000,
  },
);

/**
 * Hook para obtener los álbumes de un artista por su ID
 *
 * @param artistId - ID del artista
 * @param options - Opciones adicionales para la consulta
 * @returns Resultado de la consulta con álbumes del artista
 */
export const useArtistAlbums = createApiQueryHook<Album[], [string]>(
  (artistId) => ["artistAlbums", artistId],
  getAlbumsByArtistId,
  {
    // Solo habilitar la consulta si hay un ID de artista válido
    getEnabled: ([artistId]) => !!artistId,
    // Mantener en caché por 15 minutos ya que cambia con menos frecuencia
    staleTime: 15 * 60 * 1000,
  },
);

/**
 * Hook para obtener y buscar álbumes con más opciones de configuración
 *
 * @param albumId - ID del álbum o undefined
 * @param options - Opciones para configurar la consulta
 * @returns Resultado de la consulta
 */
export function useAlbum(
  albumId: string | undefined,
  options?: {
    enabled?: boolean;
    onSuccess?: (data: Album | null) => void;
    onError?: (error: ApiError) => void;
  },
) {
  return useAlbumDetails(albumId || "", {
    enabled: !!albumId && options?.enabled !== false,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  } as any);
}

/**
 * Hook para obtener tracks con control adicional
 *
 * @param albumId - ID del álbum o undefined
 * @param options - Opciones para configurar la consulta
 * @returns Resultado de la consulta
 */
export function useAlbumTracksWithOptions(
  albumId: string | undefined,
  options?: {
    enabled?: boolean;
    onSuccess?: (data: Track[]) => void;
    onError?: (error: ApiError) => void;
  },
) {
  return useAlbumTracks(albumId || "", {
    enabled: !!albumId && options?.enabled !== false,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  } as any);
}
