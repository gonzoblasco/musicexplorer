// components/album/AlbumCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Album } from "../../types";
import Card from "../ui/Card";

interface AlbumCardProps {
  album: Album;
}

export default function AlbumCard({ album }: AlbumCardProps) {
  const { idAlbum, strAlbum, strAlbumThumb, intYearReleased, strGenre } = album;

  return (
    <Link href={`/album/${idAlbum}`} className="block h-full">
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 w-full">
          {strAlbumThumb ? (
            <Image
              src={strAlbumThumb}
              alt={strAlbum}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={false}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">
                Sin imagen
              </span>
            </div>
          )}
        </div>
        <div className="p-4 flex-grow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {strAlbum}
          </h3>
          <div className="flex flex-wrap justify-between mt-2 text-sm">
            {intYearReleased && (
              <span className="text-gray-700 dark:text-gray-300">
                {intYearReleased}
              </span>
            )}
            {strGenre && (
              <span className="text-gray-600 dark:text-gray-300 ml-auto">
                {strGenre}
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
