// components/artist/ArtistList.tsx
import { Artist } from "../../types";
import ArtistCard from "./ArtistCard";

interface ArtistListProps {
  artists: Artist[];
}

export default function ArtistList({ artists }: ArtistListProps) {
  if (!artists || !Array.isArray(artists) || artists.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          No se encontraron artistas.
        </p>
      </div>
    );
  }

  // Eliminamos duplicados basados en idArtist
  const uniqueArtistsMap = new Map();
  artists.forEach((artist) => {
    if (artist && artist.idArtist && !uniqueArtistsMap.has(artist.idArtist)) {
      uniqueArtistsMap.set(artist.idArtist, artist);
    }
  });

  const uniqueArtists = Array.from(uniqueArtistsMap.values());

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {uniqueArtists.map((artist) => (
        <ArtistCard key={artist.idArtist} artist={artist} />
      ))}
    </div>
  );
}
