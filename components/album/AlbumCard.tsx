// components/album/AlbumCard.tsx
import Image from "next/image";
import { Album } from "../../types";
import Card from "../ui/Card";

interface AlbumCardProps {
  album: Album;
}

export default function AlbumCard({ album }: AlbumCardProps) {
  const { strAlbum, strAlbumThumb, intYearReleased, strGenre } = album;

  return (
    <Card className="h-full flex flex-col">
      <div className="relative h-48 w-full">
        {strAlbumThumb ? (
          <Image
            src={strAlbumThumb}
            alt={strAlbum}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400 dark:text-gray-500">Sin imagen</span>
          </div>
        )}
      </div>
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold">{strAlbum}</h3>
        <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
          {intYearReleased && <span>{intYearReleased}</span>}
          {strGenre && <span>{strGenre}</span>}
        </div>
      </div>
    </Card>
  );
}
