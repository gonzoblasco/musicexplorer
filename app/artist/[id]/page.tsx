// app/artist/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Artist, Album } from "../../../types";
import {
  getArtistById,
  getAlbumsByArtistId,
} from "../../../lib/api/theAudioDB";
import ArtistDetail from "../../../components/artist/ArtistDetail";
import AlbumList from "../../../components/album/AlbumList";
import Loader from "../../../components/ui/Loader";
import ErrorMessage from "../../../components/common/ErrorMessage";

interface ArtistPageProps {
  params: {
    id: string;
  };
}

export default function ArtistPage({ params }: ArtistPageProps) {
  // Extraemos el ID de manera segura
  const id = params?.id || "";

  const [artist, setArtist] = useState<Artist | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchArtistData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [artistData, albumsData] = await Promise.all([
          getArtistById(id),
          getAlbumsByArtistId(id),
        ]);

        if (!artistData) {
          throw new Error("No se encontró el artista");
        }

        setArtist(artistData);
        setAlbums(albumsData);
      } catch (err) {
        setError("Error al cargar la información del artista.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtistData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="py-12">
        <Loader />
      </div>
    );
  }

  if (error || !artist) {
    return <ErrorMessage message={error || "No se encontró el artista"} />;
  }

  return (
    <div className="space-y-10">
      <ArtistDetail artist={artist} />
      <AlbumList albums={albums} />
    </div>
  );
}
