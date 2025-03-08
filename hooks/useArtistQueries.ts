// hooks/useArtistQueries.ts
import { useQuery } from "@tanstack/react-query";
import {
  searchArtist,
  getPopularArtists,
  getArtistById,
} from "../lib/api/theAudioDB";
import { Artist } from "../types";

// Hook para buscar artistas
export function useArtistSearch(query: string) {
  return useQuery({
    queryKey: ["artistSearch", query],
    queryFn: () => searchArtist(query),
    enabled: !!query.trim(),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

// Hook para obtener artistas populares
export function usePopularArtists() {
  return useQuery({
    queryKey: ["popularArtists"],
    queryFn: getPopularArtists,
    staleTime: 30 * 60 * 1000, // 30 minutos
  });
}

// Hook para obtener detalles de un artista
export function useArtistDetails(artistId: string, p0: { enabled: boolean }) {
  return useQuery({
    queryKey: ["artist", artistId],
    queryFn: () => getArtistById(artistId),
    enabled: !!artistId,
  });
}
