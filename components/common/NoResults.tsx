// components/common/NoResults.tsx
interface NoResultsProps {
  message?: string;
}

export default function NoResults({
  message = "No se encontraron resultados",
}: NoResultsProps) {
  return (
    <div className="text-center py-16">
      <svg
        className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">
        {message}
      </h3>
    </div>
  );
}
