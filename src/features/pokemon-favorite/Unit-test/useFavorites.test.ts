import { renderHook, act } from "@testing-library/react-native";
import { useFavoritesStore } from "../store/store";
import { useFavorites } from "../hooks/useFavorites";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
}));

beforeEach(() => {
  useFavoritesStore.setState({ favorites: [], isHydrated: false });
});

describe("useFavorites", () => {
  it("returns empty favorites and isHydrated false initially", () => {
    const { result } = renderHook(() => useFavorites());

    expect(result.current.favorites).toEqual([]);
    expect(result.current.isHydrated).toBe(false);
  });

  it("reflects added favorite in the hook", () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addFavorite(25);
    });

    expect(result.current.favorites).toContain(25);
  });

  it("reflects removed favorite in the hook", () => {
    useFavoritesStore.setState({ favorites: [25, 1] });

    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.removeFavorite(25);
    });

    expect(result.current.favorites).not.toContain(25);
    expect(result.current.favorites).toContain(1);
  });

  it("isFavorite returns correct value for a given id", () => {
    useFavoritesStore.setState({ favorites: [10] });

    const { result } = renderHook(() => useFavorites());

    expect(result.current.isFavorite(10)).toBe(true);
    expect(result.current.isFavorite(99)).toBe(false);
  });

  it("reflects isHydrated when set to true", () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      useFavoritesStore.getState().setHydrated(true);
    });

    expect(result.current.isHydrated).toBe(true);
  });
});
