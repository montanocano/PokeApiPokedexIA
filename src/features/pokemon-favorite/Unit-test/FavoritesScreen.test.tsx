/**
 * UI tests for the Favorites screen.
 *
 * Full component render tests would require a complete Tamagui provider and
 * Expo Router environment — matching the constraint noted in DetailScreen.test.ts.
 * These tests cover the screen's display logic as pure conditions and verify
 * the hook integration (the same approach used across this codebase).
 *
 * Component render tests can be added once a Tamagui test provider is wired up.
 */

import fs from "fs";
import path from "path";
import { useFavoritesStore } from "../store/store";
import { usePokemonListStore } from "../../pokemon-list/store/store";
import { renderHook } from "@testing-library/react-native";
import { useFavoriteList } from "../hooks/useFavoriteList";
import type { PokemonDetailResponse } from "../../../shared/api/types";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
}));

const makePokemon = (id: number): PokemonDetailResponse => ({
  id,
  name: `pokemon-${id}`,
  sprites: { front_default: null, front_shiny: null },
  types: [],
  stats: [],
  height: 1,
  weight: 1,
  abilities: [],
});

beforeEach(() => {
  useFavoritesStore.setState({ favorites: [], isHydrated: true });
  usePokemonListStore.setState({ pokemon: [] });
});

// ---------------------------------------------------------------------------
// 4.2: Empty state logic
// ---------------------------------------------------------------------------
describe("FavoritesScreen — empty state logic", () => {
  it("favoritePokemon is empty when there are no favourites → empty state renders", () => {
    usePokemonListStore.setState({
      pokemon: [makePokemon(1), makePokemon(4)],
    });

    const { result } = renderHook(() => useFavoriteList());

    expect(result.current.favoritePokemon).toHaveLength(0);
  });

  it("favoritePokemon is empty when favourited ids are not yet loaded in list store", () => {
    useFavoritesStore.setState({ favorites: [25], isHydrated: true });
    usePokemonListStore.setState({ pokemon: [] });

    const { result } = renderHook(() => useFavoriteList());

    expect(result.current.favoritePokemon).toHaveLength(0);
  });

  it("screen source contains an empty-state text element", () => {
    const src = fs.readFileSync(
      path.resolve(__dirname, "../../../../app/(tabs)/favorites.tsx"),
      "utf8",
    );

    expect(src).toContain("No favourites yet");
  });
});

// ---------------------------------------------------------------------------
// 4.3: List with favourites logic
// ---------------------------------------------------------------------------
describe("FavoritesScreen — list with favourites logic", () => {
  it("favoritePokemon contains only favourited pokemon → list renders those cards", () => {
    usePokemonListStore.setState({
      pokemon: [makePokemon(1), makePokemon(25), makePokemon(4)],
    });
    useFavoritesStore.setState({ favorites: [1, 25], isHydrated: true });

    const { result } = renderHook(() => useFavoriteList());

    const ids = result.current.favoritePokemon.map((p) => p.id);
    expect(ids).toContain(1);
    expect(ids).toContain(25);
    expect(ids).not.toContain(4);
  });

  it("a non-empty favoritePokemon array means the empty-state is not shown", () => {
    usePokemonListStore.setState({ pokemon: [makePokemon(7)] });
    useFavoritesStore.setState({ favorites: [7], isHydrated: true });

    const { result } = renderHook(() => useFavoriteList());

    expect(result.current.favoritePokemon.length).toBeGreaterThan(0);
  });

  it("screen source uses FlatList with PokemonCard for the list branch", () => {
    const src = fs.readFileSync(
      path.resolve(__dirname, "../../../../app/(tabs)/favorites.tsx"),
      "utf8",
    );

    expect(src).toContain("FlatList");
    expect(src).toContain("PokemonCard");
  });
});
