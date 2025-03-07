// components/album/TrackList.tsx
import { Track } from "../../types";

interface TrackListProps {
  tracks: Track[];
}

export default function TrackList({ tracks }: TrackListProps) {
  // Función para formatear la duración (de segundos a minutos:segundos)
  const formatDuration = (duration: string | undefined) => {
    if (!duration) return "N/A";

    // Verifica si la duración ya está en formato MM:SS
    if (duration.includes(":")) return duration;

    // Intenta convertir la duración a un número
    const seconds = parseInt(duration);
    if (isNaN(seconds)) return duration;

    // TheAudioDB parece devolver la duración total en segundos
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Si los minutos son superiores a 60, convertir a formato hora:min:seg
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}:${remainingMinutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    }

    // Formato normal minutos:segundos
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (!tracks || tracks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          No se encontraron pistas para este álbum.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">Pistas</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Duración
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {tracks.map((track) => (
              <tr
                key={track.idTrack}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {track.intTrackNumber || "—"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  <div>
                    <span>{track.strTrack}</span>
                    {track.strMusicVid && (
                      <a
                        href={track.strMusicVid}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        <span className="text-xs">(Video)</span>
                      </a>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {formatDuration(track.intDuration)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
