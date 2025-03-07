// Archivo: app/artist/[id]/page.tsx

import ArtistPageClient from "../../../components/artist/ArtistPageClient"; // Componente cliente
import {
  getArtistById,
  getAlbumsByArtistId,
} from "../../../lib/api/theAudioDB";

export default async function ArtistPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params?.id;

  if (!id || typeof id !== "string") {
    // Renderizamos un mensaje de error si el ID no es válido
    return (
      <div>
        <h1>Error</h1>
        <p>ID de artista inválido o no proporcionado.</p>
      </div>
    );
  }

  try {
    // Obtenemos todos los datos necesarios en el servidor
    const [artist, albums] = await Promise.all([
      getArtistById(id),
      getAlbumsByArtistId(id),
    ]);

    if (!artist) {
      throw new Error("No se encontró el artista.");
    }

    // Pasamos los datos como props al componente cliente
    return <ArtistPageClient artist={artist} albums={albums} />;
  } catch (err) {
    console.error(err);
    return (
      <div>
        <h1>Error</h1>
        <p>Hubo un problema al cargar la página del artista.</p>
      </div>
    );
  }
}
