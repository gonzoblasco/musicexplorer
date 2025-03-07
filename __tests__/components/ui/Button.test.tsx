// __tests__/components/ui/Button.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // Importación explícita
import Button from "../../../components/ui/Button";

describe("Button component", () => {
  it("renders the button with provided text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies primary variant styles by default", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByText("Click me");

    // Verificar que tiene las clases correctas para un botón primario
    expect(button.className).toContain("bg-indigo");
  });

  it("applies secondary variant styles when specified", () => {
    render(<Button variant="secondary">Click me</Button>);
    const button = screen.getByText("Click me");

    // Verificar que tiene las clases correctas para un botón secundario
    expect(button.className).toContain("bg-gray");
  });

  it("disables the button when disabled prop is true", () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText("Click me")).toBeDisabled();
  });

  it("applies additional className when provided", () => {
    render(<Button className="custom-class">Click me</Button>);
    expect(screen.getByText("Click me").className).toContain("custom-class");
  });
});
