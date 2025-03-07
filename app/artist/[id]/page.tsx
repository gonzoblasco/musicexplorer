// app/artist/[id]/page.tsx
import ArtistPageClient from "../../../components/artist/ArtistPageClient";
import {
  getArtistById,
  getAlbumsByArtistId,
} from "../../../lib/api/theAudioDB";

export const dynamicParams = true;

export default async function ArtistPage(props: any) {
  const { id } = props.params;

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
