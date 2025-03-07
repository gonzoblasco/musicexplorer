// __tests__/components/search/SearchContent.test.tsx
import React from "react";
import { render } from "@testing-library/react";
import SearchContent from "../../../components/search/SearchContent";

// Mock de next/navigation
jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams({ q: "coldplay" }),
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/search",
}));

// Desactivar temporalmente las advertencias y errores de consola
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

beforeAll(() => {
  console.warn = jest.fn();
  console.error = jest.fn();
});

afterAll(() => {
  console.warn = originalConsoleWarn;
  console.error = originalConsoleError;
});

describe("SearchContent component", () => {
  it("renders without crashing", () => {
    // Simplemente verificamos que no hay errores en el renderizado
    // No realizamos ninguna aserción sobre el comportamiento interno
    expect(() => {
      render(<SearchContent />);
    }).not.toThrow();
  });
});
