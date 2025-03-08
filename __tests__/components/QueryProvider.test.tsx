import { render } from "@testing-library/react";
import { QueryProvider } from "../../components/QueryProvider";

describe("QueryProvider", () => {
  it("should render children within QueryClientProvider", () => {
    const ChildComponent = () => <div>Test Child Component</div>;
    const { getByText } = render(
      <QueryProvider>
        <ChildComponent />
      </QueryProvider>,
    );

    expect(getByText("Test Child Component")).toBeInTheDocument();
  });

  it("should render QueryClientProvider within QueryProvider", () => {
    const { container } = render(
      <QueryProvider>
        <div>Test</div>
      </QueryProvider>,
    );

    // Validación de que el componente envuelve correctamente a los hijos
    expect(container).toContainHTML("Test");
  });
});
