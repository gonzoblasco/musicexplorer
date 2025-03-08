import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../../../components/ui/Button";

const BUTTON_TEXT = "Click me";

describe("Button component", () => {
  const getButton = () => screen.getByText(BUTTON_TEXT);

  it("renders the button with the provided text", () => {
    render(<Button>{BUTTON_TEXT}</Button>);
    expect(getButton()).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>{BUTTON_TEXT}</Button>);
    fireEvent.click(getButton());
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies primary variant styles by default", () => {
    render(<Button>{BUTTON_TEXT}</Button>);
    expect(getButton().className).toContain("bg-indigo");
  });

  it("applies secondary variant styles when specified", () => {
    render(<Button variant="secondary">{BUTTON_TEXT}</Button>);
    expect(getButton().className).toContain("bg-gray");
  });

  it("disables the button when the disabled prop is true", () => {
    render(<Button disabled>{BUTTON_TEXT}</Button>);
    expect(getButton()).toBeDisabled();
  });

  it("applies an additional className when provided", () => {
    render(<Button className="custom-class">{BUTTON_TEXT}</Button>);
    expect(getButton().className).toContain("custom-class");
  });
});
