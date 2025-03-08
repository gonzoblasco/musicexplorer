// components/ui/SkeletonLoader.tsx
"use client";

/**
 * Props para el componente SkeletonLoader
 */
interface SkeletonLoaderProps {
  className?: string;
  variant?:
    | "rectangle"
    | "circle"
    | "text"
    | "card"
    | "artist"
    | "album"
    | "track";
  width?: string;
  height?: string;
  repeat?: number;
  animate?: boolean;
}

/**
 * Componente que muestra un estado de carga con efecto de esqueleto (skeleton)
 * para mejorar la experiencia de usuario durante la carga de contenido.
 */
export default function SkeletonLoader({
  className = "",
  variant = "rectangle",
  width,
  height,
  repeat = 1,
  animate = true,
}: SkeletonLoaderProps) {
  // Clase base para la animación de pulso
  const animationClass = animate
    ? "animate-pulse bg-gray-200 dark:bg-gray-700"
    : "bg-gray-200 dark:bg-gray-700";

  // Estilos base según la variante
  const getSkeletonStyles = (): string => {
    switch (variant) {
      case "circle":
        return `rounded-full ${width || "w-12"} ${height || "h-12"}`;
      case "text":
        return `h-4 rounded ${width || "w-full"}`;
      case "card":
        return `rounded-lg ${width || "w-full"} ${height || "h-64"}`;
      case "artist":
        return "rounded-lg w-full h-full";
      case "album":
        return "rounded-lg w-full h-full";
      case "track":
        return "h-8 rounded w-full mb-2";
      default:
        return `rounded ${width || "w-full"} ${height || "h-6"}`;
    }
  };

  // Componente base del esqueleto
  const SkeletonItem = () => (
    <div
      className={`${animationClass} ${getSkeletonStyles()} ${className}`}
    ></div>
  );

  // Renderiza múltiples esqueletos si repeat > 1
  if (repeat > 1) {
    return (
      <div className="space-y-2">
        {[...Array(repeat)].map((_, index) => (
          <SkeletonItem key={index} />
        ))}
      </div>
    );
  }

  // Renderizar un único esqueleto
  return <SkeletonItem />;
}

/**
 * Esqueleto para la página de artista
 */
export function ArtistSkeletonLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Columna izquierda */}
      <div className="md:col-span-1">
        <SkeletonLoader variant="card" height="h-80" className="mb-4" />
        <SkeletonLoader variant="card" className="p-4">
          <div className="space-y-4">
            <SkeletonLoader variant="text" className="h-8 w-3/4" />
            <SkeletonLoader variant="text" />
            <SkeletonLoader variant="text" />
            <SkeletonLoader variant="text" />
          </div>
        </SkeletonLoader>
      </div>

      {/* Columna derecha */}
      <div className="md:col-span-2">
        <SkeletonLoader variant="card" className="p-6">
          <div className="space-y-4">
            <SkeletonLoader variant="text" className="h-6 w-1/3" />
            <SkeletonLoader variant="text" />
            <SkeletonLoader variant="text" />
            <SkeletonLoader variant="text" />
            <SkeletonLoader variant="text" />
            <SkeletonLoader variant="text" />
          </div>
        </SkeletonLoader>
      </div>
    </div>
  );
}

/**
 * Esqueleto para la página de álbum
 */
export function AlbumSkeletonLoader() {
  return (
    <div className="space-y-8">
      {/* Detalles del álbum */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <SkeletonLoader variant="card" height="h-80" className="mb-4" />
          <SkeletonLoader variant="card" className="p-4">
            <div className="space-y-4">
              <SkeletonLoader variant="text" className="h-8 w-3/4" />
              <SkeletonLoader variant="text" />
              <SkeletonLoader variant="text" />
            </div>
          </SkeletonLoader>
        </div>

        <div className="md:col-span-2">
          <SkeletonLoader variant="card" className="p-6">
            <div className="space-y-4">
              <SkeletonLoader variant="text" className="h-6 w-1/3" />
              <SkeletonLoader variant="text" />
              <SkeletonLoader variant="text" />
              <SkeletonLoader variant="text" />
            </div>
          </SkeletonLoader>
        </div>
      </div>

      {/* Lista de pistas */}
      <div>
        <SkeletonLoader variant="text" className="h-8 w-1/4 mb-6" />
        <SkeletonLoader variant="card" className="p-4">
          <SkeletonLoader variant="track" repeat={8} />
        </SkeletonLoader>
      </div>
    </div>
  );
}

/**
 * Esqueleto para la lista de elementos (artistas o álbumes)
 */
export function GridSkeletonLoader({ items = 8 }: { items?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(items)].map((_, index) => (
        <SkeletonLoader key={index} variant="card" height="h-64" />
      ))}
    </div>
  );
}
