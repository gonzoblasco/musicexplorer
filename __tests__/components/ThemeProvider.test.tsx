import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "../../components/ThemeProvider";

describe("ThemeProvider", () => {
  it("renders children correctly", () => {
    render(
      <ThemeProvider>
        <div data-testid="child-element">Test Child</div>
      </ThemeProvider>,
    );

    const childElement = screen.getByTestId("child-element");
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent("Test Child");
  });

  it("applies the default theme attribute", () => {
    render(
      <ThemeProvider>
        <div data-testid="child-element">Test Child</div>
      </ThemeProvider>,
    );

    const htmlElement = document.documentElement;
    expect(htmlElement).toHaveAttribute("class", "dark");
  });
});
