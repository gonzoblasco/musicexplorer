// hooks/useAlbumQueries.ts
import { useQuery } from "@tanstack/react-query";
import {
  getAlbumsByArtistId,
  getAlbumById,
  getTracksByAlbumId,
} from "../lib/api/theAudioDB";

// Hook para obtener álbumes de un artista
export function useArtistAlbums(artistId: string) {
  return useQuery({
    queryKey: ["albums", artistId],
    queryFn: () => getAlbumsByArtistId(artistId),
    enabled: !!artistId,
  });
}

// Hook para obtener detalles de un álbum
export function useAlbumDetails(albumId: string) {
  return useQuery({
    queryKey: ["album", albumId],
    queryFn: () => getAlbumById(albumId),
    enabled: !!albumId,
  });
}

// Hook para obtener tracks de un álbum
export function useAlbumTracks(albumId: string) {
  return useQuery({
    queryKey: ["tracks", albumId],
    queryFn: () => getTracksByAlbumId(albumId),
    enabled: !!albumId,
  });
}
