// components/artist/ArtistPageClient.tsx
"use client";

import { useParams } from "next/navigation";
import { useArtistDetails } from "../../hooks/useArtistQueries";
import { useArtistAlbums } from "../../hooks/useAlbumQueries";
import ArtistDetail from "./ArtistDetail";
import AlbumList from "../album/AlbumList";
import Loader from "../ui/Loader";
import ErrorMessage from "../common/ErrorMessage";
import NoResults from "../common/NoResults";

export default function ArtistPageClient() {
  const { id } = useParams();
  const artistId = typeof id === "string" ? id : "";

  const {
    data: artist,
    isLoading: artistLoading,
    isError: artistError,
    error: artistErrorDetails,
  } = useArtistDetails(artistId);

  const {
    data: albums = [],
    isLoading: albumsLoading,
    isError: albumsError,
  } = useArtistAlbums(artistId);

  const isLoading = artistLoading || albumsLoading;

  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <Loader />
      </div>
    );
  }

  if (artistError || !artist) {
    return (
      <div className="py-8">
        <ErrorMessage
          message={
            artistErrorDetails instanceof Error
              ? artistErrorDetails.message
              : "No se encontró al artista solicitado."
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <ArtistDetail artist={artist} />
      {albumsError ? (
        <ErrorMessage message="Error al cargar los álbumes" />
      ) : (
        <AlbumList albums={albums} />
      )}
    </div>
  );
}
