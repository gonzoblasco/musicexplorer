// __tests__/components/artist/ArtistCard.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import ArtistCard from "../../../components/artist/ArtistCard";
import { Artist } from "../../../types";

// Importar los mocks existentes
jest.mock("next/image", () => {
  return {
    __esModule: true,
    default: require("../../../__mocks__/nextMocks").mockNextImage,
  };
});

jest.mock("next/link", () => {
  return {
    __esModule: true,
    default: require("../../../__mocks__/nextMocks").mockNextLink,
  };
});

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
    const img = screen.getByTestId("next-image");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/artist.jpg");
    expect(img).toHaveAttribute("alt", "Test Artist");
  });

  it("renders placeholder when artist thumbnail is not available", () => {
    const artistWithoutThumb: Artist = {
      ...mockArtist,
      strArtistThumb: undefined,
    };

    render(<ArtistCard artist={artistWithoutThumb} />);
    expect(screen.getByText("Sin imagen")).toBeInTheDocument();
  });

  it("links to correct artist page", () => {
    render(<ArtistCard artist={mockArtist} />);
    const link = screen.getByTestId("next-link");
    expect(link).toHaveAttribute("href", "/artist/123");
  });

  it("applies correct classes to Link component", () => {
    render(<ArtistCard artist={mockArtist} />);
    const link = screen.getByTestId("next-link");
    expect(link.className).toContain("block h-full");
  });

  it("applies correct classes to Card component", () => {
    render(<ArtistCard artist={mockArtist} />);
    const card = screen.getByTestId("card-component");
    expect(card.className).toContain("h-full flex flex-col cursor-pointer");
  });
});
