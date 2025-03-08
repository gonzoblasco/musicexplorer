// lib/api/theAudioDB.ts
import { ApiResponse, Artist, Album, MusicVideo, Track } from "../../types";
import { POPULAR_ARTIST_IDS, API_CONSTANTS } from "../utils/constants";

const { API_KEY, BASE_URL } = API_CONSTANTS;

// Función de ayuda para llamadas a la API
async function apiCall<T>(endpoint: string): Promise<T | null> {
  const response = await fetch(`${BASE_URL}/${API_KEY}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function searchArtist(artistName: string): Promise<Artist[]> {
  if (!artistName.trim()) {
    return [];
  }

  const normalizedName = artistName.toLowerCase();
  const data = await apiCall<ApiResponse<Artist>>(
    `search.php?s=${encodeURIComponent(normalizedName)}`,
  );

  return data?.artists || [];
}

export async function getArtistById(artistId: string): Promise<Artist | null> {
  if (!artistId) {
    throw new Error("Se requiere ID de artista");
  }

  const data = await apiCall<ApiResponse<Artist>>(`artist.php?i=${artistId}`);
  return data?.artists && data.artists.length > 0 ? data.artists[0] : null;
}

export async function getAlbumsByArtistId(artistId: string): Promise<Album[]> {
  if (!artistId) {
    throw new Error("Se requiere ID de artista");
  }

  const data = await apiCall<ApiResponse<Album>>(`album.php?i=${artistId}`);
  return data?.album || [];
}

export async function getAlbumById(albumId: string): Promise<Album | null> {
  if (!albumId) {
    throw new Error("Se requiere ID de álbum");
  }

  const data = await apiCall<ApiResponse<Album>>(`album.php?m=${albumId}`);
  return data?.album && data.album.length > 0 ? data.album[0] : null;
}

export async function getTracksByAlbumId(albumId: string): Promise<Track[]> {
  if (!albumId) {
    throw new Error("Se requiere ID de álbum");
  }

  const data = await apiCall<ApiResponse<Track>>(`track.php?m=${albumId}`);
  return data?.track || [];
}

export async function getPopularArtists(): Promise<Artist[]> {
  // Obtener artistas populares basados en IDs predefinidos
  const promises = POPULAR_ARTIST_IDS.map((id) => getArtistById(id));
  const artists = await Promise.all(promises);

  // Filtrar los nulos
  return artists.filter((artist) => artist !== null) as Artist[];
}
