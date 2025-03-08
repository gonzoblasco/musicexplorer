// __tests__/components/search/SearchContent.test.tsx
import React from "react";
import { render, screen } from "../../utils/testUtils";
import SearchContent from "../../../components/search/SearchContent";

// Mock the entire hooks module
jest.mock("../../../hooks/useArtistQueries", () => ({
  useArtistSearch: jest.fn(),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Import the mocked hook after mocking
import { useArtistSearch } from "../../../hooks/useArtistQueries";

describe("SearchContent component", () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    // Type assertion to handle the mocked function
    (useArtistSearch as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
      error: null,
    });

    render(<SearchContent />);

    // Check for loader
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });

  it("shows no results when search returns empty", () => {
    (useArtistSearch as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<SearchContent />);

    // Cambia el texto a "No hay artistas populares disponibles."
    const noResultsMessage = screen.getByText(
      /No hay artistas populares disponibles/i,
    );
    expect(noResultsMessage).toBeInTheDocument();
  });

  it("shows error state when search fails", () => {
    // Mock the hook to return an error state
    const errorMessage = "Search error occurred";
    (useArtistSearch as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
      error: new Error(errorMessage),
    });

    render(<SearchContent />);

    // Check for error message
    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });

  it("renders artist list when results are found", () => {
    // Mock the hook to return some artists
    const mockArtists = [
      {
        idArtist: "1",
        strArtist: "Test Artist",
        strArtistThumb: "http://example.com/artist.jpg",
      },
    ];

    (useArtistSearch as jest.Mock).mockReturnValue({
      data: mockArtists,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<SearchContent />);

    // Check for artist name
    const artistName = screen.getByText("Test Artist");
    expect(artistName).toBeInTheDocument();
  });
});
