// components/album/AlbumPageClient.tsx
"use client";

import { useParams } from "next/navigation";
import { useAlbumDetails, useAlbumTracks } from "../../hooks/useAlbumQueries";
import { useArtistDetails } from "../../hooks/useArtistQueries";
import AlbumDetail from "./AlbumDetail";
import TrackList from "./TrackList";
import Loader from "../ui/Loader";
import ErrorMessage from "../common/ErrorMessage";
import Link from "next/link";

export default function AlbumPageClient() {
  const { id } = useParams();
  const albumId = typeof id === "string" ? id : "";

  // Obtenemos datos del álbum
  const {
    data: album,
    isLoading: albumLoading,
    isError: albumError,
    error: albumErrorDetails,
  } = useAlbumDetails(albumId);

  // Obtenemos los tracks
  const { data: tracks = [], isLoading: tracksLoading } =
    useAlbumTracks(albumId);

  // Si tenemos el álbum, obtenemos los datos del artista
  const { data: artist, isLoading: artistLoading } = useArtistDetails(
    album?.idArtist || "",
    {
      enabled: !!album?.idArtist,
    },
  );

  const isLoading = albumLoading || (album?.idArtist ? artistLoading : false);

  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <Loader />
      </div>
    );
  }

  if (albumError || !album) {
    return (
      <div className="py-8">
        <ErrorMessage
          message={
            albumErrorDetails instanceof Error
              ? albumErrorDetails.message
              : "No se encontró el álbum solicitado."
          }
        />
        <div className="mt-4 text-center">
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Volver a la página principal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AlbumDetail album={album} artist={artist} />
      {tracksLoading ? (
        <div className="py-4">
          <Loader />
        </div>
      ) : (
        <TrackList tracks={tracks} />
      )}
    </div>
  );
}
