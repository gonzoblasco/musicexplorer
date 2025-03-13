"use client";
// app/favorites/page.tsx
import { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Artist, Album } from "../../types";
import ArtistCard from "../../components/artist/ArtistCard";
import AlbumCard from "../../components/album/AlbumCard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/Tabs";
import { Trash2 } from "lucide-react";

export default function FavoritesPage() {
  const [favoriteArtists, setFavoriteArtists] = useLocalStorage<Artist[]>(
    "favoriteArtists",
    [],
  );
  const [favoriteAlbums, setFavoriteAlbums] = useLocalStorage<Album[]>(
    "favoriteAlbums",
    [],
  );
  const [mounted, setMounted] = useState(false);

  // Ensure we only render client-side to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const removeArtist = (idArtist: string) => {
    setFavoriteArtists(
      favoriteArtists.filter((artist) => artist.idArtist !== idArtist),
    );
  };

  const removeAlbum = (idAlbum: string) => {
    setFavoriteAlbums(
      favoriteAlbums.filter((album) => album.idAlbum !== idAlbum),
    );
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mis Favoritos</h1>

      <Tabs defaultValue="artists" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="artists">
            Artistas ({favoriteArtists.length})
          </TabsTrigger>
          <TabsTrigger value="albums">
            Álbumes ({favoriteAlbums.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="artists">
          {favoriteArtists.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No tienes artistas favoritos guardados.
              </p>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favoriteArtists.map((artist) => (
                  <div key={artist.idArtist} className="relative group">
                    <button
                      onClick={() => removeArtist(artist.idArtist)}
                      className="absolute top-2 left-2 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                      aria-label="Remove from favorites"
                    >
                      <Trash2 size={20} className="text-red-500" />
                    </button>
                    <ArtistCard artist={artist} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="albums">
          {favoriteAlbums.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No tienes álbumes favoritos guardados.
              </p>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favoriteAlbums.map((album) => (
                  <div key={album.idAlbum} className="relative group">
                    <button
                      onClick={() => removeAlbum(album.idAlbum)}
                      className="absolute top-2 left-2 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                      aria-label="Remove from favorites"
                    >
                      <Trash2 size={20} className="text-red-500" />
                    </button>
                    <AlbumCard album={album} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
