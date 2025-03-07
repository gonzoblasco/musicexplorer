// app/album/[id]/page.tsx
import AlbumPageClient from "../../../components/album/AlbumPageClient";
import { getAlbumById } from "../../../lib/api/theAudioDB";

export const dynamicParams = true;

interface AlbumPageParams {
  id: string;
}

export default async function AlbumPage({
  params,
}: {
  params: AlbumPageParams;
}) {
  const { id } = params;

  if (!id || typeof id !== "string") {
    return (
      <div>
        <h1>Error</h1>
        <p>ID del álbum inválido.</p>
      </div>
    );
  }

  // Intenta obtener datos del álbum en el servidor
  let initialAlbum;
  try {
    initialAlbum = await getAlbumById(id);
  } catch (error) {
    // Si falla, dejaremos que el componente cliente maneje la carga
    console.error(error);
  }

  return (
    <AlbumPageClient albumId={id} initialAlbum={initialAlbum || undefined} />
  );
}
