// components/layout/SearchBar.tsx
"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [search, setSearch] = useState<string>(initialQuery);
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
      <Input
        type="text"
        placeholder="Buscar artista (ej: Coldplay, Daft Punk)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit">Buscar</Button>
    </form>
  );
}
