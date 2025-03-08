// app/album/[id]/page.tsx
import { Suspense } from "react";
import AlbumPageWrapper from "../../../components/album/AlbumPageWrapper";
import Loader from "../../../components/ui/Loader";

/**
 * Metadatos de la página para SEO
 */
export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    return {
      title: `Álbum | MusicExplorer`,
      description: `Información detallada, tracks y datos sobre este álbum`,
    };
  } catch {
    return {
      title: "Álbum | MusicExplorer",
      description: "Información de álbumes musicales",
    };
  }
}

/**
 * Configuración para asegurar que los parámetros dinámicos se manejan correctamente
 */
export const dynamicParams = true;

/**
 * Componente de página para la ruta /album/[id]
 * Aprovecha el Server Component AlbumPageWrapper para obtener datos
 * y pasarlos hidratados al componente cliente
 */
export default function AlbumPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<Loader className="py-12 w-full" />}>
      <AlbumPageWrapper params={params} />
    </Suspense>
  );
}
