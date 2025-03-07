// lib/api/theAudioDB.ts
import { ApiResponse, Artist, Album, MusicVideo, Track } from "../../types";
import { POPULAR_ARTIST_IDS } from "../utils/constants";

const API_KEY = "2";
const BASE_URL = "https://www.theaudiodb.com/api/v1/json/";

export async function searchArtist(artistName: string): Promise<Artist[]> {
  try {
    // Normalizamos el texto de búsqueda a minúsculas
    const normalizedName = artistName.toLowerCase();

    // Esta API gratuita solo permite búsqueda de "coldplay" con la clave de prueba
    const response = await fetch(
      `${BASE_URL}/${API_KEY}/search.php?s=${encodeURIComponent(normalizedName)}`,
    );

    if (!response.ok) {
      throw new Error("Error en la búsqueda");
    }
    const data: ApiResponse<Artist> = await response.json();

    return data.artists || [];
  } catch (error) {
    console.error("Error buscando artista:", error);

    return [];
  }
}

export async function getArtistById(artistId: string): Promise<Artist | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/${API_KEY}/artist.php?i=${artistId}`,
    );

    if (!response.ok) {
      throw new Error("Error obteniendo datos del artista");
    }

    const data: ApiResponse<Artist> = await response.json();

    return data.artists && data.artists.length > 0 ? data.artists[0] : null;
  } catch (error) {
    console.error("Error obteniendo artista:", error);

    return null;
  }
}

export async function getAlbumsByArtistId(artistId: string): Promise<Album[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/${API_KEY}/album.php?i=${artistId}`,
    );

    if (!response.ok) {
      throw new Error("Error obteniendo álbumes");
    }

    const data: ApiResponse<Album> = await response.json();

    return data.album || [];
  } catch (error) {
    console.error("Error obteniendo álbumes:", error);

    return [];
  }
}

export async function getMusicVideosByArtistId(
  artistId: string,
): Promise<MusicVideo[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/${API_KEY}/mvid.php?i=${artistId}`,
    );

    if (!response.ok) {
      throw new Error("Error obteniendo videos musicales");
    }

    const data: ApiResponse<MusicVideo> = await response.json();

    return data.mvids || [];
  } catch (error) {
    console.error("Error obteniendo videos:", error);

    return [];
  }
}

export async function getPopularArtists(): Promise<Artist[]> {
  try {
    // Forma alternativa de eliminar duplicados sin usar spread con Set
    const uniqueArtistIds = Array.from(new Set(POPULAR_ARTIST_IDS));

    // Obtenemos varios artistas en paralelo
    const artistPromises = uniqueArtistIds.map((id) => getArtistById(id));
    const artistResults = await Promise.all(artistPromises);

    // Filtramos los nulls que pudieran venir de errores
    const artists = artistResults.filter(
      (artist): artist is Artist => artist !== null,
    );

    // Adicionalmente, asegurémonos de que los IDs son únicos en el resultado final
    const artistMap = new Map();
    artists.forEach((artist) => {
      if (!artistMap.has(artist.idArtist)) {
        artistMap.set(artist.idArtist, artist);
      }
    });

    return Array.from(artistMap.values());
  } catch (error) {
    console.error("Error obteniendo artistas populares:", error);
    return [];
  }
}

export async function getAlbumById(albumId: string): Promise<Album | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/${API_KEY}/album.php?m=${albumId}`,
    );

    if (!response.ok) {
      throw new Error("Error obteniendo datos del álbum");
    }

    const data: ApiResponse<Album> = await response.json();

    return data.album && data.album.length > 0 ? data.album[0] : null;
  } catch (error) {
    console.error("Error obteniendo álbum:", error);
    return null;
  }
}

export async function getTracksByAlbumId(albumId: string): Promise<Track[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/${API_KEY}/track.php?m=${albumId}`,
    );

    if (!response.ok) {
      throw new Error("Error obteniendo tracks del álbum");
    }

    const data: ApiResponse<Track> = await response.json();

    return data.track || [];
  } catch (error) {
    console.error("Error obteniendo tracks:", error);
    return [];
  }
}
