// components/QueryProvider.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minuto de tiempo de caducidad por defecto
            gcTime: 5 * 60 * 1000, // 5 minutos para recolección de basura
            refetchOnWindowFocus: false, // No recargar automáticamente al volver a la pestaña
            retry: 1, // Solo reintentar una vez en caso de error
            // Habilitar el uso compartido estructural para optimizar caché
            structuralSharing: true,
            // Manejador de errores global
            onError: (error) => {
              // Podríamos agregar telemetría o logging aquí
              console.error("Error en consulta:", error);
            },
          },
          mutations: {
            // Configuración para mutaciones si las necesitamos en el futuro
            retry: 1,
            onError: (error) => {
              console.error("Error en mutación:", error);
            },
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
