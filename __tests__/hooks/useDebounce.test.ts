// __tests__/hooks/useDebounce.test.ts
import { renderHook } from "@testing-library/react"; // En vez de '@testing-library/react-hooks'
import { act } from "react-dom/test-utils";
import useDebounce from "../../hooks/useDebounce";

describe("useDebounce", () => {
  jest.useFakeTimers();

  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial value", 500));
    expect(result.current).toBe("initial value");
  });

  it("should update the value after the debounce time", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "initial value", delay: 500 } },
    );

    // Change the value
    rerender({ value: "new value", delay: 500 });

    // Value should not change yet
    expect(result.current).toBe("initial value");

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Now the value should be updated
    expect(result.current).toBe("new value");
  });

  it("should reset the timer if value changes before delay completes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "initial value", delay: 500 } },
    );

    // Change the value
    rerender({ value: "intermediate value", delay: 500 });

    // Fast-forward time partially
    act(() => {
      jest.advanceTimersByTime(250);
    });

    // Value should still be initial
    expect(result.current).toBe("initial value");

    // Change the value again
    rerender({ value: "final value", delay: 500 });

    // Fast-forward time partially again
    act(() => {
      jest.advanceTimersByTime(250);
    });

    // Value should still be initial
    expect(result.current).toBe("initial value");

    // Complete the time
    act(() => {
      jest.advanceTimersByTime(250);
    });

    // Now the value should be final
    expect(result.current).toBe("final value");
  });
});
