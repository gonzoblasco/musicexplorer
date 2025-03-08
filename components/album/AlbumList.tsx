// components/album/AlbumList.tsx
import { Album } from "../../types";
import AlbumCard from "./AlbumCard";
import NoResults from "../common/NoResults";

interface AlbumListProps {
  albums: Album[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export default function AlbumList({
  albums,
  isLoading = false,
  emptyMessage = "No se encontraron álbumes para este artista.",
}: AlbumListProps) {
  // Si está cargando, no mostrar nada (el componente padre debería mostrar un esqueleto)
  if (isLoading) {
    return null;
  }

  // Si no hay álbumes, mostrar mensaje personalizado
  if (!albums || albums.length === 0) {
    return (
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-6">Álbumes</h2>
        <NoResults message={emptyMessage} icon="music" />
      </div>
    );
  }

  // Ordenar álbumes por año de lanzamiento (más reciente primero)
  const sortedAlbums = [...albums].sort((a, b) => {
    const yearA = a.intYearReleased ? parseInt(a.intYearReleased) : 0;
    const yearB = b.intYearReleased ? parseInt(b.intYearReleased) : 0;
    return yearB - yearA;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Álbumes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedAlbums.map((album) => (
          <AlbumCard key={album.idAlbum} album={album} />
        ))}
      </div>
    </div>
  );
}
