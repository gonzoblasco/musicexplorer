// components/artist/ArtistPageWrapper.tsx
import { Suspense } from "react";
import { getArtistById, getAlbumsByArtistId } from "../../lib/api/theAudioDB";
import ArtistPageClient from "./ArtistPageClient";
import Loader from "../ui/Loader";
import ErrorMessage from "../common/ErrorMessage";

/**
 * Props para el componente ArtistPageWrapper
 */
interface ArtistPageWrapperProps {
  params: { id: string };
}

/**
 * Componente Server que se encarga de obtener datos de artista y álbumes
 * para pasarlos hidratados al componente cliente.
 *
 * Este enfoque aprovecha React Server Components para realizar
 * la obtención de datos en el servidor y reducir el JS enviado al cliente.
 */
export default async function ArtistPageWrapper({
  params,
}: ArtistPageWrapperProps) {
  // Extraer el ID del artista de los parámetros
  const artistId = params.id;

  try {
    // Obtener datos del artista y sus álbumes en paralelo
    const [artistData, albumsData] = await Promise.all([
      getArtistById(artistId),
      getAlbumsByArtistId(artistId),
    ]);

    // Si no se encuentra el artista, mostrar error
    if (!artistData) {
      return (
        <div className="py-8">
          <ErrorMessage message="No se encontró el artista solicitado." />
        </div>
      );
    }

    // Renderizar el componente cliente con datos pre-cargados
    return (
      <Suspense fallback={<Loader className="py-12" />}>
        <ArtistPageClient
          initialArtistData={artistData}
          initialAlbumsData={albumsData}
          artistId={artistId}
        />
      </Suspense>
    );
  } catch (error) {
    // Capturar errores durante la obtención de datos
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Ocurrió un error al cargar los datos del artista.";

    return (
      <div className="py-8">
        <ErrorMessage message={errorMessage} />
      </div>
    );
  }
}
