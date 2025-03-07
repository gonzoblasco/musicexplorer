import React from "react";
import { render, screen } from "@testing-library/react";
import ArtistCard from "../../../components/artist/ArtistCard";
import { Artist } from "../../../types";

// Mock Next.js components con tipos explícitos
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    className,
    fill,
    sizes,
    ...props
  }: {
    src: string;
    alt: string;
    className?: string;
    fill?: boolean;
    sizes?: string;
    [key: string]: any;
  }) => (
    <img
      src={src}
      alt={alt}
      className={className}
      data-testid="next-image"
      {...props}
    />
  ),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    className,
    children,
    ...props
  }: {
    href: string;
    className?: string;
    children: React.ReactNode;
    [key: string]: any;
  }) => (
    <a href={href} className={className} data-testid="next-link" {...props}>
      {children}
    </a>
  ),
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

  it("applies hover styles through card component", () => {
    render(<ArtistCard artist={mockArtist} />);
    // Verificar que la clase de hover está presente en el componente Card
    const card = screen.getByTestId("next-link");
    expect(card.className).toContain("hover:shadow-lg");
  });
});
