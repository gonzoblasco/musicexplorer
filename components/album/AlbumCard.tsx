"use client";
// components/album/AlbumCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Album } from "../../types";
import Card from "../ui/Card";
import { useState, useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Heart } from "lucide-react";

interface AlbumCardProps {
  album: Album;
}

export default function AlbumCard({ album }: AlbumCardProps) {
  const { idAlbum, strAlbum, strAlbumThumb, intYearReleased, strGenre } = album;
  const [favoriteAlbums, setFavoriteAlbums] = useLocalStorage<Album[]>(
    "favoriteAlbums",
    [],
  );
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if this album is in favorites
  useEffect(() => {
    setIsFavorite(
      favoriteAlbums.some((favAlbum) => favAlbum.idAlbum === idAlbum),
    );
  }, [favoriteAlbums, idAlbum]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the heart
    e.stopPropagation();

    if (isFavorite) {
      // Remove from favorites
      setFavoriteAlbums(
        favoriteAlbums.filter((favAlbum) => favAlbum.idAlbum !== idAlbum),
      );
    } else {
      // Add to favorites
      setFavoriteAlbums([...favoriteAlbums, album]);
    }
  };

  return (
    <Link href={`/album/${idAlbum}`} className="block h-full">
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 relative">
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            size={20}
            className={`${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`}
          />
        </button>
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
