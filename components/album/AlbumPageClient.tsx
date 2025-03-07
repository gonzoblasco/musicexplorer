// components/album/AlbumPageClient.tsx
"use client";

import { useEffect, useState } from "react";
import { Album, Artist, Track } from "../../types";
import AlbumDetail from "./AlbumDetail";
import TrackList from "./TrackList";
import Loader from "../ui/Loader";
import ErrorMessage from "../common/ErrorMessage";
import Link from "next/link";

interface AlbumPageClientProps {
  albumId: string;
  initialAlbum?: Album;
}

export default function AlbumPageClient({
  albumId,
  initialAlbum,
}: AlbumPageClientProps) {
  const [album, setAlbum] = useState<Album | null>(initialAlbum || null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!initialAlbum);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos del álbum
  useEffect(() => {
    if (initialAlbum) return; // Skip if we already have initial data

    const fetchAlbumData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/album/${albumId}`);
        if (!response.ok) throw new Error("Error fetching album data");

        const data = await response.json();
        setAlbum(data.album);

        // Si tenemos el álbum, busca el artista
        if (data.album && data.album.idArtist) {
          const artistResponse = await fetch(
            `/api/artist/${data.album.idArtist}`,
          );
          if (artistResponse.ok) {
            const artistData = await artistResponse.json();
            setArtist(artistData.artist);
          }
        }
      } catch (err) {
        console.error("Error loading album:", err);
        setError("No se pudo cargar la información del álbum.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbumData();
  }, [albumId, initialAlbum]);

  // Cargar pistas del álbum
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch(`/api/album/${albumId}/tracks`);
        if (!response.ok) throw new Error("Error fetching tracks");

        const data = await response.json();
        setTracks(data.tracks || []);
      } catch (err) {
        console.error("Error loading tracks:", err);
        // No establecemos error aquí para no bloquear el resto de la UI
      }
    };

    if (albumId) {
      fetchTracks();
    }
  }, [albumId]);

  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <Loader />
      </div>
    );
  }

  if (error || !album) {
    return (
      <div className="py-8">
        <ErrorMessage
          message={error || "No se encontró el álbum solicitado."}
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
      <TrackList tracks={tracks} />
    </div>
  );
}
