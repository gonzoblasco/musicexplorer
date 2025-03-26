"use client";

import {
  useAlbumDetails,
  useAlbumTracksWithOptions,
} from "../../hooks/useAlbumQueries";
import { useArtistDetails } from "../../hooks/useArtistQueries";
import AlbumDetail from "./AlbumDetail";
import TrackList from "./TrackList";
import ErrorMessage from "../common/ErrorMessage";
import { AlbumSkeletonLoader } from "../ui/SkeletonLoader";
import Link from "next/link";
import { Album, Artist, Track } from "../../types";

interface AlbumPageClientProps {
  albumId: string;
  initialAlbumData?: Album | null;
  initialTracksData?: Track[];
  initialArtistData?: Artist | null;
}

// Extrae la lógica de manejo de errores en un componente auxiliar
function renderErrorMessage(errorDetails: unknown) {
  const errorMessage =
    errorDetails instanceof Error
      ? errorDetails.message
      : "No se encontró el álbum solicitado.";
  return (
    <div className="py-8">
      <ErrorMessage message={errorMessage} />
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

export default function AlbumPageClient({
  albumId,
  initialAlbumData,
  initialTracksData,
  initialArtistData,
}: AlbumPageClientProps) {
  const shouldFetchAlbumData = !initialAlbumData;
  const shouldFetchTracksData = !initialTracksData;
  const shouldFetchArtistData = !initialArtistData;

  // Album fetch
  const {
    data: album,
    isLoading: isAlbumLoading,
    isError: isAlbumError,
    error: albumErrorDetails,
  } = useAlbumDetails(albumId);

  // Tracks fetch
  const { data: tracks = [], isLoading: isTracksLoading } =
    useAlbumTracksWithOptions(albumId, {
      enabled: shouldFetchTracksData && !!album?.idAlbum,
    });

  // Artist fetch
  const { data: artist, isLoading: isArtistLoading } = useArtistDetails(
    album?.idArtist || "",
    { enabled: shouldFetchArtistData && !!album?.idArtist },
  );

  // Renderizando cargando si el álbum o el artista están cargando
  if (isAlbumLoading || isArtistLoading) {
    return <AlbumSkeletonLoader />;
  }

  // Render error si hay errores en la carga del álbum
  if (isAlbumError || (!album && !initialAlbumData)) {
    return renderErrorMessage(albumErrorDetails);
  }

  // Datos finales para renderizado
  const finalAlbum = album || initialAlbumData;
  const finalTracks = tracks || initialTracksData || [];
  const finalArtist = artist || initialArtistData;

  return (
    <div className="space-y-8">
      {finalAlbum && (
        <AlbumDetail album={finalAlbum} artist={finalArtist || null} />
      )}

      {/* Lista de pistas */}
      <div className="mt-8">
        {isTracksLoading ? (
          <>
            <h2 className="text-2xl font-bold mb-6">Pistas</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              {Array(8)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"
                  ></div>
                ))}
            </div>
          </>
        ) : (
          <TrackList tracks={finalTracks} />
        )}
      </div>
    </div>
  );
}
