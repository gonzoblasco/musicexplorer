// app/artist/[id]/page.tsx
import { Suspense } from "react";
import ArtistPageWrapper from "../../../components/artist/ArtistPageWrapper";
import Loader from "../../../components/ui/Loader";

/**
 * Metadatos de la página para SEO
 */
export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    // Podríamos obtener datos del artista aquí para metadatos dinámicos,
    // pero lo dejamos simple por ahora
    return {
      title: `Perfil de Artista | MusicExplorer`,
      description: `Información detallada, biografía y discografía completa del artista`,
    };
  } catch {
    return {
      title: "Artista | MusicExplorer",
      description: "Información de artistas musicales",
    };
  }
}

/**
 * Configuración para asegurar que los parámetros dinámicos se manejan correctamente
 */
export const dynamicParams = true;

/**
 * Componente de página para la ruta /artist/[id]
 * Aprovecha el Server Component ArtistPageWrapper para obtener datos
 * y pasarlos hidratados al componente cliente
 */
export default function ArtistPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<Loader className="py-12 w-full" />}>
      <ArtistPageWrapper params={params} />
    </Suspense>
  );
}
