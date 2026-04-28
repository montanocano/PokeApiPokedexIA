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

describe("useFavoriteList", () => {
  it("returns empty list when there are no favorites", () => {
    usePokemonListStore.setState({ pokemon: [makePokemon(1), makePokemon(2)] });

    const { result } = renderHook(() => useFavoriteList());

    expect(result.current.favoritePokemon).toHaveLength(0);
  });

  it("returns only the favourited pokemon from the list store", () => {
    const pokemon = [makePokemon(1), makePokemon(2), makePokemon(25)];
    usePokemonListStore.setState({ pokemon });
    useFavoritesStore.setState({ favorites: [25, 1], isHydrated: true });

    const { result } = renderHook(() => useFavoriteList());

    const ids = result.current.favoritePokemon.map((p) => p.id);
    expect(ids).toContain(25);
    expect(ids).toContain(1);
    expect(ids).not.toContain(2);
  });

  it("reflects isHydrated from the favorites store", () => {
    useFavoritesStore.setState({ favorites: [], isHydrated: false });

    const { result } = renderHook(() => useFavoriteList());

    expect(result.current.isHydrated).toBe(false);
  });
});
