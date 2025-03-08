import React from "react";
import { render, screen } from "../../../__tests__/utils/testUtils";
import ArtistCard from "../../../components/artist/ArtistCard";
import { Artist } from "../../../types";

// Mock de componentes de UI reutilizados
jest.mock(
  "../../../components/ui/Card",
  () =>
    ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => (
      <div data-testid="card" className={className}>
        {children}
      </div>
    ),
);

// Algunos mocks de Next.js
jest.mock(
  "next/image",
  () =>
    ({ src, alt, ...props }: { src: string; alt: string }) => (
      <img src={src} alt={alt} {...props} />
    ),
);
jest.mock(
  "next/link",
  () =>
    ({
      href,
      children,
      ...props
    }: {
      href: string;
      children: React.ReactNode;
    }) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
);

describe("Componente ArtistCard", () => {
  const mockArtist: Artist = {
    idArtist: "123",
    strArtist: "Test Artist",
    strArtistThumb: "https://example.com/artist.jpg",
    strGenre: "Rock",
  };

  it("Muestra el nombre del artista correctamente", () => {
    render(<ArtistCard artist={mockArtist} />);
    expect(screen.getByText("Test Artist")).toBeInTheDocument();
  });

  it("Muestra el género si está disponible", () => {
    render(<ArtistCard artist={mockArtist} />);
    expect(screen.getByText("Rock")).toBeInTheDocument();
  });

  it("Renderiza la imagen del artista si el thumbnail está disponible", () => {
    render(<ArtistCard artist={mockArtist} />);
    const img = screen.getByRole("img", { name: "Test Artist" });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/artist.jpg");
  });

  it("Muestra un placeholder si no hay thumbnail", () => {
    const artistWithoutThumb: Artist = {
      ...mockArtist,
      strArtistThumb: undefined,
    };
    render(<ArtistCard artist={artistWithoutThumb} />);
    expect(screen.getByText("Sin imagen")).toBeInTheDocument();
  });

  it("Vincula correctamente al enlace del artista", () => {
    render(<ArtistCard artist={mockArtist} />);
    const link = screen.getByRole("link", {
      name: "Test Artist Test Artist Rock",
    });
    expect(link).toHaveAttribute("href", "/artist/123");
  });

  it("Aplica clases específicas al componente Card de UI", () => {
    render(<ArtistCard artist={mockArtist} />);
    const card = screen.getByTestId("card");
    expect(card).toHaveClass("h-full flex flex-col cursor-pointer");
  });
});
