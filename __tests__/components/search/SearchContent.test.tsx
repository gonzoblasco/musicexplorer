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
jest.mock("../../../hooks/useArtistQueries", () => {
  const actual = jest.requireActual("../../../hooks/useArtistQueries");
  return {
    ...actual,
    useArtistSearch: () => ({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    }),
  };
});

describe("SearchContent component", () => {
  it("renders without crashing", () => {
    // Ahora usamos el render personalizado que incluye QueryClientProvider
    expect(() => {
      render(<SearchContent />);
    }).not.toThrow();
  });

  it("shows loading state", () => {
    jest.mock("../../../hooks/useArtistQueries", () => ({
      useArtistSearch: () => ({
        data: [],
        isLoading: true,
        isError: false,
        error: null,
      }),
    }));

    const { getByTestId } = render(<SearchContent />);
    expect(getByTestId("loader")).toBeInTheDocument();
  });

  it("shows error state", () => {
    jest.mock("../../../hooks/useArtistQueries", () => ({
      useArtistSearch: () => ({
        data: [],
        isLoading: false,
        isError: true,
        error: new Error("Test error"),
      }),
    }));

    const { getByText } = render(<SearchContent />);
    expect(getByText("Test error")).toBeInTheDocument();
  });
});
