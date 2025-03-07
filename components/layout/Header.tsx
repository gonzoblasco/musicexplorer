// components/layout/Header.tsx
import Link from "next/link";
import SearchBar from "./SearchBar";
import { ThemeToggle } from "../ui/ThemeToggle";

export default function Header() {
  return (
    <header className="bg-indigo-700 dark:bg-indigo-900 text-white py-4 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-bold">
              MusicExplorer
            </Link>
            <ThemeToggle />
          </div>
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
