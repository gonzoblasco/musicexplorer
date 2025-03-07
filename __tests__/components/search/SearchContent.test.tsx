import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchContent from "../../../components/search/SearchContent";

// Mock más robusto para next/navigation
const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
};

const mockSearchParams = new URLSearchParams({ q: "coldplay" });

// Usar un mock de función para poder cambiar el valor en tests específicos
let mockQueryValue = "coldplay";

jest.mock("next/navigation", () => ({
  useSearchParams: () => mockSearchParams,
  useRouter: () => mockRouter,
  usePathname: () => "/search",
}));

// Mock para useDebounce que simplemente devuelve el valor (sin debounce)
jest.mock("../../../hooks/useDebounce", () => (value: any) => value);

// Mock global de fetch
global.fetch = jest.fn();

describe("SearchContent component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockQueryValue = "coldplay"; // Reset para cada test
    mockSearchParams.set("q", mockQueryValue);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("displays loading state initially", async () => {
    // Mock fetch para mantener el estado de carga
    (fetch as jest.Mock).mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          // No resolver la promesa para mantener el estado de carga
          setTimeout(() => {
            resolve({
              ok: true,
              json: async () => ({ artists: [] }),
            });
          }, 10000); // Tiempo largo para asegurar estado de carga
        }),
    );

    render(<SearchContent />);

    // Comprobar que el indicador de carga está presente
    expect(screen.getByText(/cargando/i)).toBeInTheDocument();
  });

  it("displays results when API call is successful", async () => {
    const mockArtists = [
      { idArtist: "123", strArtist: "Coldplay", strGenre: "Rock" },
      { idArtist: "456", strArtist: "Coldcut", strGenre: "Electronic" },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ artists: mockArtists }),
    });

    render(<SearchContent />);

    // Esperar a que los resultados se muestren
    await waitFor(() => {
      expect(
        screen.getByText('Resultados para "coldplay"'),
      ).toBeInTheDocument();
    });

    // Verificar que los artistas se muestran
    expect(screen.getByText("Coldplay")).toBeInTheDocument();
    expect(screen.getByText("Coldcut")).toBeInTheDocument();

    // Verificar que se llamó a fetch con la URL correcta
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/search?q=coldplay"),
    );
  });

  it("displays error message when API call fails", async () => {
    // Mock fetch para simular un error
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    render(<SearchContent />);

    // Esperar a que aparezca el mensaje de error
    await waitFor(() => {
      expect(
        screen.getByText(/error al cargar los datos/i),
      ).toBeInTheDocument();
    });
  });

  it("displays no results message when API returns empty array", async () => {
    // Mock fetch para devolver array vacío
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ artists: [] }),
    });

    render(<SearchContent />);

    // Esperar a que aparezca el mensaje de "no se encontraron resultados"
    await waitFor(() => {
      expect(
        screen.getByText(/no se encontraron resultados/i),
      ).toBeInTheDocument();
    });
  });

  it("fetches popular artists when no query is provided", async () => {
    // Cambiar el mock para simular que no hay query
    mockSearchParams.delete("q");

    const mockPopularArtists = [
      { idArtist: "789", strArtist: "Popular Artist", strGenre: "Pop" },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ artists: mockPopularArtists }),
    });

    render(<SearchContent />);

    // Esperar a que se muestren los artistas populares
    await waitFor(() => {
      expect(screen.getByText("Artistas Populares")).toBeInTheDocument();
      expect(screen.getByText("Popular Artist")).toBeInTheDocument();
    });

    // Verificar que se llamó a la API correcta
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/api/popular"));
  });

  it("handles network errors gracefully", async () => {
    // Mock fetch para lanzar una excepción de red
    (fetch as jest.Mock).mockImplementationOnce(() => {
      throw new Error("Network error");
    });

    render(<SearchContent />);

    // Esperar a que aparezca el mensaje de error
    await waitFor(() => {
      expect(
        screen.getByText(/error al cargar los datos/i),
      ).toBeInTheDocument();
    });
  });

  it("shows correct loading and error states in sequence", async () => {
    // Primero mostrará el estado de carga, luego dará error
    (fetch as jest.Mock).mockImplementationOnce(
      () =>
        new Promise((resolve, reject) => {
          // Simular un retraso antes de rechazar
          setTimeout(() => {
            reject(new Error("API error"));
          }, 100);
        }),
    );

    render(<SearchContent />);

    // Primero debería mostrar el estado de carga
    expect(screen.getByText(/cargando/i)).toBeInTheDocument();

    // Luego debería mostrar el error
    await waitFor(() => {
      expect(
        screen.getByText(/error al cargar los datos/i),
      ).toBeInTheDocument();
    });
  });
});
