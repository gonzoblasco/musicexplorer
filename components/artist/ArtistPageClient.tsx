// Archivo: components/artist/ArtistPageClient.tsx

"use client"; // Componente cliente

import { Artist, Album } from "../../types";
import ArtistDetail from "./ArtistDetail";
import AlbumList from "../album/AlbumList";

interface ArtistPageClientProps {
  artist: Artist;
  albums: Album[];
}

export default function ArtistPageClient({
  artist,
  albums,
}: ArtistPageClientProps) {
  return (
    <div className="space-y-10">
      <ArtistDetail artist={artist} />
      <AlbumList albums={albums} />
    </div>
  );
}
