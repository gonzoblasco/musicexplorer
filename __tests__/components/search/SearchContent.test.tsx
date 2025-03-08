// __tests__/components/search/SearchContent.test.tsx
import React from "react";
import { render } from "../../utils/testUtils"; // Importamos desde nuestro archivo de utilidades
import SearchContent from "../../../components/search/SearchContent";

// Mock de next/navigation
jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams({ q: "coldplay" }),
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/search",
  useParams: () => ({}),
}));

// Mock de nuestros hooks de consulta
jest.mock("../../../hooks/useArtistQueries", () => ({
  useArtistSearch: () => ({
    data: [],
    isLoading: false,
    isError: false,
  }),
}));

describe("SearchContent component", () => {
  it("renders without crashing", () => {
    // Ahora usamos el render personalizado que incluye QueryClientProvider
    expect(() => {
      render(<SearchContent />);
    }).not.toThrow();
  });
});
