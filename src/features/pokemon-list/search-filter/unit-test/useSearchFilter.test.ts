import React from "react";
import { act, create } from "react-test-renderer";
import { useSearchFilter } from "../hooks/useSearchFilter";
import { usePokemonListStore } from "../../store/store";
import { SEARCH_DEBOUNCE_MS } from "../../../../shared/config";

let capturedHook: ReturnType<typeof useSearchFilter> | null = null;

function TestComponent() {
  capturedHook = useSearchFilter();
  return null;
}

beforeEach(() => {
  usePokemonListStore.setState({ searchQuery: "", activeTypeFilters: [] });
  capturedHook = null;
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe("useSearchFilter", () => {
  it("does not dispatch immediately on typing", () => {
    act(() => {
      create(React.createElement(TestComponent));
    });

    act(() => {
      capturedHook!.handleQueryChange("b");
    });

    expect(usePokemonListStore.getState().searchQuery).toBe("");
  });

  it("dispatches setSearchQuery after SEARCH_DEBOUNCE_MS", () => {
    act(() => {
      create(React.createElement(TestComponent));
    });

    act(() => {
      capturedHook!.handleQueryChange("bulba");
      jest.advanceTimersByTime(SEARCH_DEBOUNCE_MS);
    });

    expect(usePokemonListStore.getState().searchQuery).toBe("bulba");
  });

  it("only dispatches once when typing rapidly (debounce)", () => {
    act(() => {
      create(React.createElement(TestComponent));
    });

    act(() => {
      capturedHook!.handleQueryChange("b");
      jest.advanceTimersByTime(100);
      capturedHook!.handleQueryChange("bu");
      jest.advanceTimersByTime(100);
      capturedHook!.handleQueryChange("bul");
      jest.advanceTimersByTime(SEARCH_DEBOUNCE_MS);
    });

    expect(usePokemonListStore.getState().searchQuery).toBe("bul");
  });

  it("exposes setSearchQuery for immediate dispatch (used by clear)", () => {
    act(() => {
      create(React.createElement(TestComponent));
    });

    act(() => {
      capturedHook!.handleQueryChange("bulba");
      jest.advanceTimersByTime(SEARCH_DEBOUNCE_MS);
    });

    act(() => {
      capturedHook!.setSearchQuery("");
    });

    expect(usePokemonListStore.getState().searchQuery).toBe("");
  });
});
