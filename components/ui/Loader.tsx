// components/ui/Loader.tsx
interface LoaderProps {
  className?: string;
}

export default function Loader({ className = "" }: LoaderProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
    </div>
  );
}
