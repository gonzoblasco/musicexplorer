// components/album/AlbumDetail.tsx
import Image from "next/image";
import Link from "next/link";
import { Album, Artist } from "../../types";

interface AlbumDetailProps {
  album: Album;
  artist?: Artist | null;
}

export default function AlbumDetail({ album, artist }: AlbumDetailProps) {
  const {
    strAlbum,
    strAlbumThumb,
    intYearReleased,
    strGenre,
    strDescription,
    strStyle,
    strReleaseFormat,
    intSales,
  } = album;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <div className="relative h-80 w-full mb-4">
          {strAlbumThumb ? (
            <Image
              src={strAlbumThumb}
              alt={strAlbum}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg">
              <span className="text-gray-400 dark:text-gray-500">
                Sin imagen
              </span>
            </div>
          )}
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-2">{strAlbum}</h1>
          {artist && (
            <Link
              href={`/artist/${artist.idArtist}`}
              className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              {artist.strArtist}
            </Link>
          )}
          <div className="space-y-2 mt-4 text-gray-700 dark:text-gray-300">
            {intYearReleased && (
              <p>
                <span className="font-semibold">Año:</span> {intYearReleased}
              </p>
            )}
            {strGenre && (
              <p>
                <span className="font-semibold">Género:</span> {strGenre}
              </p>
            )}
            {strStyle && (
              <p>
                <span className="font-semibold">Estilo:</span> {strStyle}
              </p>
            )}
            {strReleaseFormat && (
              <p>
                <span className="font-semibold">Formato:</span>{" "}
                {strReleaseFormat}
              </p>
            )}
            {intSales && (
              <p>
                <span className="font-semibold">Ventas:</span>{" "}
                {parseInt(intSales).toLocaleString()} copias
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="md:col-span-2">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Acerca del álbum</h2>
          <div className="prose dark:prose-invert max-w-none">
            {strDescription ? (
              strDescription.split("\n").map((paragraph, idx) =>
                paragraph.trim() ? (
                  <p key={idx} className="mb-4">
                    {paragraph}
                  </p>
                ) : null,
              )
            ) : (
              <p>No hay descripción disponible para este álbum.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
