// __tests__/utils/testUtils.tsx
import React, { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { ThemeProvider } from "next-themes";

// Mock implementation of window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Crear un cliente de consulta para pruebas con configuración optimizada para testing
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // Desactivar reintentos para pruebas más predecibles
        retry: false,
        // No mantener datos en caché después del unmount
        gcTime: 0,
        // No refrescar datos en enfoque de ventana durante pruebas
        refetchOnWindowFocus: false,
        // Consideramos los datos como frescos para evitar refetching automático
        staleTime: Infinity,
      },
    },
    // Silenciar errores de consola durante las pruebas
    // @ts-ignore
    logger: {
      log: console.log,
      warn: console.warn,
      // No mostrar errores en consola durante pruebas
      error: () => {},
    },
  });

// Interfaces para los providers de test
interface AllTheProvidersProps {
  children: React.ReactNode;
  theme?: "light" | "dark" | "system";
}

/**
 * Wrapper que proporciona todos los providers necesarios para las pruebas
 */
export const AllTheProviders = ({
  children,
  theme = "light",
}: AllTheProvidersProps) => {
  const testQueryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={testQueryClient}>
      <ThemeProvider attribute="class" defaultTheme={theme} enableSystem>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

/**
 * Opciones extendidas para el renderizado que incluyen theme
 */
interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  theme?: "light" | "dark" | "system";
}

/**
 * Función personalizada de renderizado que envuelve el componente con los providers necesarios
 */
export function customRender(
  ui: ReactElement,
  options: CustomRenderOptions = {},
): RenderResult {
  const { theme = "light", ...renderOptions } = options;

  return render(ui, {
    wrapper: (props) => <AllTheProviders {...props} theme={theme} />,
    ...renderOptions,
  });
}

// Re-exportar todo lo demás de testing-library
export * from "@testing-library/react";

// Sobreescribir la función render
export { customRender as render };
