// lib/api/theAudioDB.ts (actualizado)
import {ApiResponse, Artist, Album, MusicVideo, Track} from "../../types";
import {POPULAR_ARTIST_IDS} from "../utils/constants";

const API_KEY = "2";
const BASE_URL = "https://www.theaudiodb.com/api/v1/json/";

export async function searchArtist(artistName: string): Promise<Artist[]> {
  if (!artistName.trim()) {
    return [];
  }

  // Normalizamos el texto de búsqueda a minúsculas
  const normalizedName = artistName.toLowerCase();

  const response = await fetch(
    `${BASE_URL}/${API_KEY}/search.php?s=${encodeURIComponent(normalizedName)}`,
  );

  if (!response.ok) {
    throw new Error(`Error en la búsqueda: ${response.status}`);
  }

  const data: ApiResponse<Artist> = await response.json();
  return data.artists || [];
}

export async function getArtistById(artistId: string): Promise<Artist | null> {
  if (!artistId) {
    throw new Error("Se requiere ID de artista");
  }

  const response = await fetch(
    `${BASE_URL}/${API_KEY}/artist.php?i=${artistId}`,
  );

  if (!response.ok) {
    throw new Error(`Error obteniendo datos del artista: ${response.status}`);
  }

  const data: ApiResponse<Artist> = await response.json();
  return data.artists && data.artists.length > 0 ? data.artists[0] : null;
}

// Actualiza los otros métodos de manera similar...