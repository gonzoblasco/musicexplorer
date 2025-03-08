"use client";

import { useState, useEffect } from "react";
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
  // Si no hay datos iniciales, se activa la búsqueda de datos
  const shouldFetchAlbum = !initialAlbumData;
  const shouldFetchTracks = !initialTracksData;
  const shouldFetchArtist = !initialArtistData;

  // Consulta para obtener los datos del álbum
  const {
    data: album,
    isLoading: albumLoading,
    isError: albumError,
    error: albumErrorDetails,
  } = useAlbumDetails(albumId, { enabled: shouldFetchAlbum });

  // Consulta para obtener los datos de las pistas
  const { data: tracks = [], isLoading: tracksLoading } = useAlbumTracks(
    albumId,
    {
      enabled: shouldFetchTracks && !!album?.idAlbum, // Solo se consulta si hay un álbum válido
    },
  );

  // Consulta para obtener los datos del artista
  const { data: artist, isLoading: artistLoading } = useArtistDetails(
    album?.idArtist || "",
    {
      enabled: shouldFetchArtist && !!album?.idArtist, // Solo se consulta si hay un ID de artista válido
    },
  );

  // Cargando: espera múltiples estados de carga
  const isLoading = albumLoading || tracksLoading || artistLoading;

  // Renderizar estado de carga
  if (isLoading) {
    return <AlbumSkeletonLoader />;
  }

  // Error general en la carga del álbum
  if (albumError || (!album && !initialAlbumData)) {
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

  // Determinar datos finales basados en lo inicial o traído por consultas
  const finalAlbum = album || initialAlbumData;
  const finalTracks = tracks || initialTracksData || [];
  const finalArtist = artist || initialArtistData;

  return (
    <div className="space-y-8">
      {/* Detalles del álbum */}
      {finalAlbum && (
        <AlbumDetail album={finalAlbum} artist={finalArtist || null} />
      )}

      {/* Lista de pistas */}
      <div className="mt-8">
        {tracksLoading ? (
          <>
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
          </>
        ) : (
          <TrackList tracks={finalTracks} />
        )}
      </div>
    </div>
  );
}
