// __tests__/components/artist/ArtistCard.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import ArtistCard from "../../../components/artist/ArtistCard";
import { Artist } from "../../../types";
import { mockNextImage, mockNextLink } from "../../../__mocks__/nextMocks";

// Aplicar mocks
jest.mock("next/image", () => ({
  __esModule: true,
  default: mockNextImage,
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: mockNextLink,
}));

describe("ArtistCard component", () => {
  const mockArtist: Artist = {
    idArtist: "123",
    strArtist: "Test Artist",
    strArtistThumb: "https://example.com/artist.jpg",
    strGenre: "Rock",
  };

  it("renders artist name correctly", () => {
    render(<ArtistCard artist={mockArtist} />);
    expect(screen.getByText("Test Artist")).toBeInTheDocument();
  });

  it("renders artist genre when available", () => {
    render(<ArtistCard artist={mockArtist} />);
    expect(screen.getByText("Rock")).toBeInTheDocument();
  });

  it("renders image when artist thumbnail is available", () => {
    render(<ArtistCard artist={mockArtist} />);
    const img = screen.getByAltText("Test Artist");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/artist.jpg");
  });

  it("renders placeholder when artist thumbnail is not available", () => {
    const artistWithoutThumb = { ...mockArtist, strArtistThumb: undefined };
    render(<ArtistCard artist={artistWithoutThumb} />);

    expect(screen.getByText("Sin imagen")).toBeInTheDocument();
  });

  it("links to correct artist page", () => {
    render(<ArtistCard artist={mockArtist} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/artist/123");
  });
});
