// components/artist/ArtistList.tsx
import { Artist } from "../../types";
import ArtistCard from "./ArtistCard";
import NoResults from "../common/NoResults";

interface ArtistListProps {
  artists: Artist[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRetry?: () => void;
}

export default function ArtistList({
  artists,
  isLoading = false,
  emptyMessage = "No se encontraron artistas.",
  onRetry,
}: ArtistListProps) {
  // Si está cargando, no mostrar nada (el componente padre debería mostrar un esqueleto)
  if (isLoading) {
    return null;
  }

  // Validar que artists sea un array
  if (!artists || !Array.isArray(artists) || artists.length === 0) {
    return (
      <NoResults
        message={emptyMessage}
        icon="search"
        actionText={onRetry ? "Intentar nuevamente" : undefined}
        onAction={onRetry}
      />
    );
  }

  // Eliminamos duplicados basados en idArtist y filtramos entradas nulas o indefinidas
  const uniqueArtistsMap = new Map();

  artists.forEach((artist) => {
    if (artist && artist.idArtist && !uniqueArtistsMap.has(artist.idArtist)) {
      uniqueArtistsMap.set(artist.idArtist, artist);
    }
  });

  const uniqueArtists = Array.from(uniqueArtistsMap.values());

  // Si después de filtrar no hay artistas, mostrar mensaje
  if (uniqueArtists.length === 0) {
    return (
      <NoResults
        message={emptyMessage}
        icon="search"
        actionText={onRetry ? "Intentar nuevamente" : undefined}
        onAction={onRetry}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {uniqueArtists.map((artist) => (
        <ArtistCard key={artist.idArtist} artist={artist} />
      ))}
    </div>
  );
}
