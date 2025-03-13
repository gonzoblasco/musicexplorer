// components/layout/Header.tsx
import Link from "next/link";
import SearchBar from "./SearchBar";
import { ThemeToggle } from "../ui/ThemeToggle";
import { Heart } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-indigo-700 dark:bg-indigo-900 text-white py-4 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-2xl font-bold">
              MusicExplorer
            </Link>
            <Link
              href="/favorites"
              className="flex items-center gap-1 text-white hover:text-pink-200 transition-colors"
            >
              <Heart size={18} className="fill-current" />
              <span>Favoritos</span>
            </Link>
            <ThemeToggle />
          </div>
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
