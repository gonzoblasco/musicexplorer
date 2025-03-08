// lib/api/theAudioDB.ts
import { ApiResponse, Artist, Album, MusicVideo, Track } from "../../types";
import { POPULAR_ARTIST_IDS, API_CONSTANTS } from "../utils/constants";
import { ApiError, handleFetchResponse } from "../utils/errorHandling";

const { API_KEY, BASE_URL } = API_CONSTANTS;

/**
 * Función de ayuda para realizar llamadas a la API TheAudioDB.
 * Maneja la construcción de la URL y procesa los errores de forma consistente.
 *
 * @param endpoint - Endpoint relativo de la API
 * @returns Datos de respuesta tipados o null
 * @throws ApiError si hay problemas con la petición
 */
async function apiCall<T>(endpoint: string): Promise<T | null> {
  try {
    const url = `${BASE_URL}/${API_KEY}/${endpoint}`;
    const response = await fetch(url);

    return await handleFetchResponse<T>(response, "datos");
  } catch (error) {
    // Propagar errores que ya son ApiError
    if (error instanceof ApiError) {
      throw error;
    }

    // Convertir otros errores al formato estándar
    throw new ApiError(`Error en la llamada a la API: ${endpoint}`, 500, error);
  }
}

/**
 * Busca artistas por nombre
 *
 * @param artistName - Nombre del artista a buscar
 * @returns Array de artistas que coinciden con la búsqueda
 * @throws ApiError si hay un error en la petición
 */
export async function searchArtist(artistName: string): Promise<Artist[]> {
  // Validación de entrada
  if (!artistName.trim()) {
    return [];
  }

  try {
    const normalizedName = artistName.toLowerCase();
    const data = await apiCall<ApiResponse<Artist>>(
      `search.php?s=${encodeURIComponent(normalizedName)}`,
    );

    return data?.artists || [];
  } catch (error) {
    throw new ApiError("Error en la búsqueda de artistas", 500, error);
  }
}

/**
 * Obtiene los detalles de un artista por su ID
 *
 * @param artistId - ID del artista en TheAudioDB
 * @returns Objeto con los datos del artista o null si no se encuentra
 * @throws ApiError si hay un error en la petición o el ID es inválido
 */
export async function getArtistById(artistId: string): Promise<Artist | null> {
  // Validación de entrada
  if (!artistId) {
    throw new ApiError("Se requiere ID de artista", 400);
  }

  try {
    const data = await apiCall<ApiResponse<Artist>>(`artist.php?i=${artistId}`);
    return data?.artists && data.artists.length > 0 ? data.artists[0] : null;
  } catch (error) {
    throw new ApiError("Error obteniendo datos del artista", 500, error);
  }
}

/**
 * Obtiene los álbumes de un artista por su ID
 *
 * @param artistId - ID del artista en TheAudioDB
 * @returns Array de álbumes del artista
 * @throws ApiError si hay un error en la petición o el ID es inválido
 */
export async function getAlbumsByArtistId(artistId: string): Promise<Album[]> {
  // Validación de entrada
  if (!artistId) {
    throw new ApiError("Se requiere ID de artista", 400);
  }

  try {
    const data = await apiCall<ApiResponse<Album>>(`album.php?i=${artistId}`);
    return data?.album || [];
  } catch (error) {
    throw new ApiError("Error obteniendo álbumes del artista", 500, error);
  }
}

/**
 * Obtiene los detalles de un álbum por su ID
 *
 * @param albumId - ID del álbum en TheAudioDB
 * @returns Objeto con los datos del álbum o null si no se encuentra
 * @throws ApiError si hay un error en la petición o el ID es inválido
 */
export async function getAlbumById(albumId: string): Promise<Album | null> {
  // Validación de entrada
  if (!albumId) {
    throw new ApiError("Se requiere ID de álbum", 400);
  }

  try {
    const data = await apiCall<ApiResponse<Album>>(`album.php?m=${albumId}`);
    return data?.album && data.album.length > 0 ? data.album[0] : null;
  } catch (error) {
    throw new ApiError("Error obteniendo datos del álbum", 500, error);
  }
}

/**
 * Obtiene las pistas de un álbum por su ID
 *
 * @param albumId - ID del álbum en TheAudioDB
 * @returns Array de pistas del álbum
 * @throws ApiError si hay un error en la petición o el ID es inválido
 */
export async function getTracksByAlbumId(albumId: string): Promise<Track[]> {
  // Validación de entrada
  if (!albumId) {
    throw new ApiError("Se requiere ID de álbum", 400);
  }

  try {
    const data = await apiCall<ApiResponse<Track>>(`track.php?m=${albumId}`);
    return data?.track || [];
  } catch (error) {
    throw new ApiError("Error obteniendo pistas del álbum", 500, error);
  }
}

/**
 * Obtiene una lista de artistas populares predefinidos
 *
 * @returns Array de artistas populares
 * @throws ApiError si hay un error durante el proceso
 */
export async function getPopularArtists(): Promise<Artist[]> {
  try {
    // Obtener artistas populares basados en IDs predefinidos
    const promises = POPULAR_ARTIST_IDS.map((id) => getArtistById(id));
    const results = await Promise.allSettled(promises);

    // Filtrar los resultados exitosos y eliminar nulos
    return results
      .filter(
        (result): result is PromiseFulfilledResult<Artist | null> =>
          result.status === "fulfilled" && result.value !== null,
      )
      .map((result) => result.value as Artist);
  } catch (error) {
    throw new ApiError("Error obteniendo artistas populares", 500, error);
  }
}
