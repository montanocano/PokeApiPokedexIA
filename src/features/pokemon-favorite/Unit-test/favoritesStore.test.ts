import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFavoritesStore } from "../store/store";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
}));

const mockStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

beforeEach(() => {
  useFavoritesStore.setState({ favorites: [], isHydrated: false });
  jest.clearAllMocks();
});

describe("addFavorite", () => {
  it("adds a new id to the favorites array", () => {
    useFavoritesStore.getState().addFavorite(1);

    expect(useFavoritesStore.getState().favorites).toContain(1);
  });

  it("does not add a duplicate id", () => {
    useFavoritesStore.getState().addFavorite(1);
    useFavoritesStore.getState().addFavorite(1);

    expect(
      useFavoritesStore.getState().favorites.filter((id) => id === 1),
    ).toHaveLength(1);
  });
});

describe("removeFavorite", () => {
  it("removes the id from the favorites array", () => {
    useFavoritesStore.setState({ favorites: [1, 2, 3] });

    useFavoritesStore.getState().removeFavorite(2);

    expect(useFavoritesStore.getState().favorites).not.toContain(2);
    expect(useFavoritesStore.getState().favorites).toEqual([1, 3]);
  });

  it("does nothing when id is not in list", () => {
    useFavoritesStore.setState({ favorites: [1, 3] });

    useFavoritesStore.getState().removeFavorite(99);

    expect(useFavoritesStore.getState().favorites).toEqual([1, 3]);
  });
});

describe("isFavorite", () => {
  it("returns true when id is in favorites", () => {
    useFavoritesStore.setState({ favorites: [5] });

    expect(useFavoritesStore.getState().isFavorite(5)).toBe(true);
  });

  it("returns false when id is not in favorites", () => {
    useFavoritesStore.setState({ favorites: [5] });

    expect(useFavoritesStore.getState().isFavorite(99)).toBe(false);
  });
});

describe("setHydrated", () => {
  it("sets isHydrated to true", () => {
    useFavoritesStore.getState().setHydrated(true);

    expect(useFavoritesStore.getState().isHydrated).toBe(true);
  });
});

describe("persistence", () => {
  it("calls AsyncStorage.setItem when state changes", async () => {
    useFavoritesStore.getState().addFavorite(7);

    await Promise.resolve();

    expect(mockStorage.setItem).toHaveBeenCalledWith(
      "pokedex/favorites",
      expect.stringContaining("7"),
    );
  });
});
