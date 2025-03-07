// components/artist/ArtistCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Artist } from "../../types";
import Card from "../ui/Card";

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  const { idArtist, strArtist, strArtistThumb, strGenre } = artist;

  return (
    <Link href={`/artist/${idArtist}`} className="block h-full">
      <Card className="h-full flex flex-col cursor-pointer">
        <div className="relative h-48 w-full">
          {strArtistThumb ? (
            <Image
              src={strArtistThumb}
              alt={strArtist}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400 dark:text-gray-500">
                Sin imagen
              </span>
            </div>
          )}
        </div>
        <div className="p-4 flex-grow">
          <h2 className="text-xl font-bold truncate">{strArtist}</h2>
          {strGenre && (
            <p className="text-gray-600 dark:text-gray-400">{strGenre}</p>
          )}
        </div>
      </Card>
    </Link>
  );
}
