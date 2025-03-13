"use client";
// components/artist/ArtistCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Artist } from "../../types";
import Card from "../ui/Card";
import { useState, useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Heart } from "lucide-react";

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  const { idArtist, strArtist, strArtistThumb, strGenre } = artist;
  const [favoriteArtists, setFavoriteArtists] = useLocalStorage<Artist[]>(
    "favoriteArtists",
    [],
  );
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if this artist is in favorites
  useEffect(() => {
    setIsFavorite(
      favoriteArtists.some((favArtist) => favArtist.idArtist === idArtist),
    );
  }, [favoriteArtists, idArtist]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the heart
    e.stopPropagation();

    if (isFavorite) {
      // Remove from favorites
      setFavoriteArtists(
        favoriteArtists.filter((favArtist) => favArtist.idArtist !== idArtist),
      );
    } else {
      // Add to favorites
      setFavoriteArtists([...favoriteArtists, artist]);
    }
  };

  return (
    <Link href={`/artist/${idArtist}`} className="block h-full">
      <Card className="h-full flex flex-col cursor-pointer relative">
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
