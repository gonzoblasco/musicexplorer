// hooks/useArtistSearch.ts
import { useState, useEffect } from "react";
import { Artist } from "../types";
import { searchArtist } from "../lib/api/theAudioDB";
import useDebounce from "./useDebounce";

interface UseArtistSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  artists: Artist[];
  isLoading: boolean;
  error: string | null;
}

export default function useArtistSearch(): UseArtistSearchReturn {
  const [query, setQuery] = useState<string>("");
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce<string>(query, 500);

  useEffect(() => {
    const fetchArtists = async () => {
      if (!debouncedQuery.trim()) {
        setArtists([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const results = await searchArtist(debouncedQuery);
        setArtists(results);
      } catch (err) {
        setError("Error al buscar artistas. Inténtalo de nuevo.");
        setArtists([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtists();
  }, [debouncedQuery]);

  return { query, setQuery, artists, isLoading, error };
}
