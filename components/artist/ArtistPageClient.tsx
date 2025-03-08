// components/artist/ArtistPageClient.tsx
"use client";

import { useState, useEffect } from "react";
import { useArtistDetails } from "../../hooks/useArtistQueries";
import { useArtistAlbums } from "../../hooks/useAlbumQueries";
import ArtistDetail from "./ArtistDetail";
import AlbumList from "../album/AlbumList";
import Loader from "../ui/Loader";
import ErrorMessage from "../common/ErrorMessage";
import NoResults from "../common/NoResults";
import { Artist, Album } from "../../types";
import { ArtistSkeletonLoader, GridSkeletonLoader } from "../ui/SkeletonLoader";

// Props para el componente ArtistPageClient
interface ArtistPageClientProps {
  artistId: string;
  initialArtistData?: Artist | null;
  initialAlbumsData?: Album[];
}

export default function ArtistPageClient({
  artistId,
  initialArtistData,
  initialAlbumsData,
}: ArtistPageClientProps) {
  // Estado para controlar si debemos usar los datos iniciales o consultar
  const [shouldFetch, setShouldFetch] = useState(!initialArtistData);

  // Consultas para obtener datos del artista solo si no tenemos datos iniciales
  const {
    data: artist,
    isLoading: artistLoading,
    isError: artistError,
    error: artistErrorDetails,
  } = useArtistDetails(artistId, { enabled: shouldFetch });

  // Consultas para obtener álbumes del artista solo si no tenemos datos iniciales
  const {
    data: albums = [],
    isLoading: albumsLoading,
    isError: albumsError,
  } = useArtistAlbums(artistId, { enabled: shouldFetch });

  // Estado local para mantener los datos correctos
  const [artistData, setArtistData] = useState<Artist | null>(
    initialArtistData || null,
  );
  const [albumsData, setAlbumsData] = useState<Album[]>(
    initialAlbumsData || [],
  );

  // Actualizar estados locales cuando las consultas se completan
  useEffect(() => {
    if (artist && !artistLoading) {
      setArtistData(artist);
    }

    if (albums.length > 0 && !albumsLoading) {
      setAlbumsData(albums);
    }
  }, [artist, albums, artistLoading, albumsLoading]);

  // Estado de carga
  const isLoading =
    shouldFetch &&
    (artistLoading || albumsLoading) &&
    (!artistData || albumsData.length === 0);

  // Estados de error
  const isError = shouldFetch && (artistError || !artistData);
  const errorMessage =
    artistErrorDetails instanceof Error
      ? artistErrorDetails.message
      : "No se encontró al artista solicitado.";

  if (isLoading) {
    return <ArtistSkeletonLoader />;
  }

  if (isError) {
    return (
      <div className="py-8">
        <ErrorMessage message={errorMessage} />
      </div>
    );
  }

  // Verificar que tenemos datos de artista
  if (!artistData) {
    return (
      <div className="py-8">
        <NoResults message="No se encontró información del artista" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Detalles del artista */}
      <ArtistDetail artist={artistData} />

      {/* Lista de álbumes */}
      {albumsLoading ? (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">Álbumes</h2>
          <GridSkeletonLoader items={8} />
        </div>
      ) : albumsError ? (
        <ErrorMessage message="Error al cargar los álbumes" />
      ) : (
        <AlbumList albums={albumsData} />
      )}
    </div>
  );
}
