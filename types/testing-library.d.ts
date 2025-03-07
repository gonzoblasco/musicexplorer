// types/testing-library.d.ts
import "@testing-library/jest-dom";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;

      toHaveAttribute(attr: string, value?: string): R;

      // Añade otros métodos de jest-dom que necesites
    }
  }
}
