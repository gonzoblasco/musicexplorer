// components/album/AlbumPageClient.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAlbumDetails, useAlbumTracks } from "../../hooks/useAlbumQueries";
import { useArtistDetails } from "../../hooks/useArtistQueries";
import AlbumDetail from "./AlbumDetail";
import TrackList from "./TrackList";
import ErrorMessage from "../common/ErrorMessage";
import Link from "next/link";
import { Album, Artist, Track } from "../../types";
import { AlbumSkeletonLoader } from "../ui/SkeletonLoader";

// Props para el componente AlbumPageClient
interface AlbumPageClientProps {
  albumId: string;
  initialAlbumData?: Album | null;
  initialTracksData?: Track[];
  initialArtistData?: Artist | null;
}

export default function AlbumPageClient({
  albumId,
  initialAlbumData,
  initialTracksData,
  initialArtistData,
}: AlbumPageClientProps) {
  // Estado para controlar si debemos usar los datos iniciales o consultar
  const [shouldFetch, setShouldFetch] = useState(!initialAlbumData);

  // Consulta para obtener datos del álbum solo si no tenemos datos iniciales
  const {
    data: album,
    isLoading: albumLoading,
    isError: albumError,
    error: albumErrorDetails,
  } = useAlbumDetails(albumId, { enabled: shouldFetch });

  // Estado local para mantener los datos correctos
  const [albumData, setAlbumData] = useState<Album | null>(
    initialAlbumData || null,
  );
  const [tracksData, setTracksData] = useState<Track[]>(
    initialTracksData || [],
  );
  const [artistData, setArtistData] = useState<Artist | null>(
    initialArtistData || null,
  );

  // Consulta para obtener pistas solo si no tenemos datos iniciales
  const { data: tracks = [], isLoading: tracksLoading } = useAlbumTracks(
    albumId,
    {
      enabled: shouldFetch && !!albumData,
    },
  );

  // Consulta para obtener datos del artista solo si no tenemos datos iniciales
  const { data: artist, isLoading: artistLoading } = useArtistDetails(
    albumData?.idArtist || "",
    {
      enabled: shouldFetch && !!albumData?.idArtist,
    },
  );

  // Actualizar estados locales cuando las consultas se completan
  useEffect(() => {
    if (album && !albumLoading) {
      setAlbumData(album);
    }

    if (tracks.length > 0 && !tracksLoading) {
      setTracksData(tracks);
    }

    if (artist && !artistLoading) {
      setArtistData(artist);
    }
  }, [album, tracks, artist, albumLoading, tracksLoading, artistLoading]);

  // Estado de carga
  const isLoading = shouldFetch && albumLoading;

  if (isLoading) {
    return <AlbumSkeletonLoader />;
  }

  // Estado de error
  if (albumError || !albumData) {
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
      {/* Detalles del álbum */}
      <AlbumDetail album={albumData} artist={artistData} />

      {/* Lista de pistas */}
      {shouldFetch && tracksLoading ? (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Pistas</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"
                ></div>
              ))}
          </div>
        </div>
      ) : (
        <TrackList tracks={tracksData} />
      )}
    </div>
  );
}
