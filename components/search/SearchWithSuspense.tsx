// components/search/SearchWithSuspense.tsx
"use client";

import { Suspense } from "react";
import SearchContent from "./SearchContent";

export default function SearchWithSuspense() {
  return (
    <Suspense
      fallback={<div className="py-8 text-center">Cargando búsqueda...</div>}
    >
      <SearchContent />
    </Suspense>
  );
}
