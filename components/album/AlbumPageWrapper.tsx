// components/album/AlbumPageWrapper.tsx
import { Suspense } from "react";
import { getAlbumById, getTracksByAlbumId } from "../../lib/api/theAudioDB";
import { getArtistById } from "../../lib/api/theAudioDB";
import AlbumPageClient from "./AlbumPageClient";
import Loader from "../ui/Loader";
import ErrorMessage from "../common/ErrorMessage";
import Link from "next/link";

/**
 * Props para el componente AlbumPageWrapper
 */
interface AlbumPageWrapperProps {
  params: { id: string };
}

/**
 * Componente Server que obtiene datos de un álbum, sus pistas y el artista relacionado
 * para pasarlos hidratados al componente cliente.
 *
 * Aprovecha React Server Components para realizar estas peticiones
 * en el servidor y reducir el JS enviado al cliente.
 */
export default async function AlbumPageWrapper({
  params,
}: AlbumPageWrapperProps) {
  // Extraer el ID del álbum de los parámetros
  const albumId = params.id;

  try {
    // Obtener datos del álbum
    const albumData = await getAlbumById(albumId);

    // Si no se encuentra el álbum, mostrar error
    if (!albumData) {
      return (
        <div className="py-8">
          <ErrorMessage message="No se encontró el álbum solicitado." />
          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Volver a la página principal
            </Link>
          </div>
        </div>
      );
    }

    // Obtener pistas y artista en paralelo
    const [tracksData, artistData] = await Promise.all([
      getTracksByAlbumId(albumId),
      // Solo intentar obtener el artista si tenemos un ID de artista válido
      albumData.idArtist
        ? getArtistById(albumData.idArtist)
        : Promise.resolve(null),
    ]);

    // Renderizar el componente cliente con datos pre-cargados
    return (
      <Suspense fallback={<Loader className="py-12" />}>
        <AlbumPageClient
          initialAlbumData={albumData}
          initialTracksData={tracksData}
          initialArtistData={artistData}
          albumId={albumId}
        />
      </Suspense>
    );
  } catch (error) {
    // Capturar errores durante la obtención de datos
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Ocurrió un error al cargar los datos del álbum.";

    return (
      <div className="py-8">
        <ErrorMessage message={errorMessage} />
        <div className="mt-4 text-center">
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Volver a la página principal
          </Link>
        </div>
      </div>
    );
  }
}
