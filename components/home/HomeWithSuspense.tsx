// components/home/HomeWithSuspense.tsx
"use client";

import { Suspense } from "react";
import HomeContent from "./HomeContent";

export default function HomeWithSuspense() {
  return (
    <Suspense
      fallback={<div className="py-8 text-center">Cargando contenido...</div>}
    >
      <HomeContent />
    </Suspense>
  );
}
