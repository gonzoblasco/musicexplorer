import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import useDebounce from "../../hooks/useDebounce";

describe("useDebounce hook", () => {
  // Usar timers falsos para evitar esperas reales
  beforeEach(() => {
    jest.useFakeTimers();
  });

  // Limpiar después de cada test
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial value", 500));
    expect(result.current).toBe("initial value");
  });

  it("should update the value after the specified delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "initial value", delay: 500 } },
    );

    // Verificar valor inicial
    expect(result.current).toBe("initial value");

    // Cambiar el valor
    rerender({ value: "updated value", delay: 500 });

    // El valor no debería cambiar inmediatamente
    expect(result.current).toBe("initial value");

    // Avanzar el tiempo hasta justo antes del límite
    act(() => {
      jest.advanceTimersByTime(499);
    });

    // El valor todavía no debería cambiar
    expect(result.current).toBe("initial value");

    // Avanzar el tiempo más allá del límite
    act(() => {
      jest.advanceTimersByTime(1);
    });

    // Ahora el valor debería actualizarse
    expect(result.current).toBe("updated value");
  });

  it("should reset the timer when value changes before delay completes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "initial value", delay: 500 } },
    );

    // Cambiar el valor una primera vez
    rerender({ value: "intermediate value", delay: 500 });

    // Avanzar el tiempo parcialmente
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // El valor no debería cambiar todavía
    expect(result.current).toBe("initial value");

    // Cambiar el valor nuevamente (esto debería reiniciar el timer)
    rerender({ value: "final value", delay: 500 });

    // Avanzar el tiempo hasta el punto donde el primer cambio
    // debería haberse aplicado si no hubiera sido reemplazado
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // El valor todavía debería ser el inicial
    expect(result.current).toBe("initial value");

    // Avanzar hasta el punto donde el segundo cambio debería aplicarse
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Ahora el valor debería ser el final
    expect(result.current).toBe("final value");
  });

  it("should handle different delay values", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "test", delay: 1000 } },
    );

    // Cambiar delay a un valor más corto
    rerender({ value: "faster test", delay: 200 });

    // Avanzar tiempo para el nuevo delay
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // El valor debería actualizarse con el nuevo delay
    expect(result.current).toBe("faster test");
  });

  it("should handle null and undefined values correctly", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "initial", delay: 500 } },
    );

    // Cambiar a null
    // @ts-ignore
    rerender({ value: null, delay: 500 });

    // Avanzar tiempo
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Debería manejar null correctamente
    expect(result.current).toBe(null);

    // Cambiar a undefined
    // @ts-ignore
    rerender({ value: undefined, delay: 500 });

    // Avanzar tiempo
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Debería manejar undefined correctamente
    expect(result.current).toBe(undefined);
  });
});
