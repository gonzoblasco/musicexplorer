// components/album/AlbumList.tsx
import { Album } from "../../types";
import AlbumCard from "./AlbumCard";

interface AlbumListProps {
  albums: Album[];
}

export default function AlbumList({ albums }: AlbumListProps) {
  if (!albums || albums.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          No se encontraron álbumes para este artista.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Álbumes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {albums.map((album) => (
          <AlbumCard key={album.idAlbum} album={album} />
        ))}
      </div>
    </div>
  );
}
