// components/artist/ArtistDetail.tsx
import Image from "next/image";
import { Artist } from "../../types";

interface ArtistDetailProps {
  artist: Artist;
}

export default function ArtistDetail({ artist }: ArtistDetailProps) {
  const {
    strArtist,
    strArtistThumb,
    strGenre,
    intFormedYear,
    strCountry,
    strBiographyES,
    strBiographyEN,
    strWebsite,
    strFacebook,
    strTwitter,
    strLastFMChart,
  } = artist;

  // Usar biografía en español si está disponible, si no en inglés
  const biography =
    strBiographyES || strBiographyEN || "No hay biografía disponible";

  const formatUrl = (url: string | undefined): string => {
    if (!url) return "";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <div className="relative h-80 w-full mb-4">
          {strArtistThumb ? (
            <Image
              src={strArtistThumb}
              alt={strArtist}
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
          <h1 className="text-2xl font-bold mb-2">{strArtist}</h1>
          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            {strGenre && (
              <p>
                <span className="font-semibold">Género:</span> {strGenre}
              </p>
            )}
            {intFormedYear && (
              <p>
                <span className="font-semibold">Año de formación:</span>{" "}
                {intFormedYear}
              </p>
            )}
            {strCountry && (
              <p>
                <span className="font-semibold">País:</span> {strCountry}
              </p>
            )}
          </div>

          {(strWebsite || strFacebook || strTwitter) && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Enlaces:</h3>
              <div className="flex flex-wrap gap-2">
                {strWebsite && (
                  <a
                    href={formatUrl(strWebsite)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 rounded-full text-sm hover:bg-indigo-200 dark:hover:bg-indigo-800"
                  >
                    Sitio Web
                  </a>
                )}
                {strFacebook && (
                  <a
                    href={formatUrl(strFacebook)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-800"
                  >
                    Facebook
                  </a>
                )}
                {strTwitter && (
                  <a
                    href={formatUrl(strTwitter)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300 rounded-full text-sm hover:bg-sky-200 dark:hover:bg-sky-800"
                  >
                    Twitter
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="md:col-span-2">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Biografía</h2>
          <div className="prose dark:prose-invert max-w-none">
            {biography.split("\n").map((paragraph, idx) =>
              paragraph.trim() ? (
                <p key={idx} className="mb-4">
                  {paragraph}
                </p>
              ) : null,
            )}
          </div>

          {strLastFMChart && (
            <div className="mt-6">
              <a
                href={strLastFMChart}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
              >
                Ver en Last.fm
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
