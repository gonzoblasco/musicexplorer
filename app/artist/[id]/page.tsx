import ArtistPageClient from "../../../components/artist/ArtistPageClient";
import {
  getArtistById,
  getAlbumsByArtistId,
} from "../../../lib/api/theAudioDB";

// Declaramos que los parámetros son dinámicos.
export const dynamicParams = true;

// Sobrescribimos el tipo `params` sin depender de Next.js
export default async function ArtistPage({
  params,
}: {
  params: { id: string }; // Se ignoran completamente tipos globales de Next.js
}) {
  const { id } = params;

  if (!id || typeof id !== "string") {
    return (
      <div>
        <h1>Error</h1>
        <p>ID del artista inválido.</p>
      </div>
    );
  }

  try {
    const [artist, albums] = await Promise.all([
      getArtistById(id),
      getAlbumsByArtistId(id),
    ]);

    if (!artist) {
      throw new Error("No se encontró al artista.");
    }

    return <ArtistPageClient artist={artist} albums={albums} />;
  } catch (error) {
    console.error(error);
    return (
      <div>
        <h1>Error</h1>
        <p>Hubo un error cargando al artista.</p>
      </div>
    );
  }
}
