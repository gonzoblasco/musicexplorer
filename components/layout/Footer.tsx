// components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} MusicExplorer</p>
          <div className="mt-4 md:mt-0">
            <p>Desarrollado con Next.js, TypeScript y TheAudioDB API</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
