// __tests__/components/search/SearchContent.test.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchContent from "../../../components/search/SearchContent";

// Mocks
jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams({ q: "coldplay" }),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("../../../hooks/useDebounce", () => (value: any) => value);

// Mock fetch para simular llamadas a la API
global.fetch = jest.fn();

describe("SearchContent component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("displays loading state initially", () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => new Promise(() => {}), // Never resolves to keep loading
    });

    render(<SearchContent />);

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

    await waitFor(() => {
      expect(
        screen.getByText('Resultados para "coldplay"'),
      ).toBeInTheDocument();
      expect(screen.getByText("Coldplay")).toBeInTheDocument();
      expect(screen.getByText("Coldcut")).toBeInTheDocument();
    });
  });

  it("displays error message when API call fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(<SearchContent />);

    await waitFor(() => {
      expect(
        screen.getByText(/error al cargar los datos/i),
      ).toBeInTheDocument();
    });
  });

  it("displays no results message when API returns empty array", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ artists: [] }),
    });

    render(<SearchContent />);

    await waitFor(() => {
      expect(
        screen.getByText(/no se encontraron resultados/i),
      ).toBeInTheDocument();
    });
  });
});
