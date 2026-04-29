import { usePokemonListStore } from "../../store/store";
import { selectFilteredPokemon } from "../../store/pokemonListStore";
import type { PokemonDetailResponse } from "../../../../shared/api/types";

const makeDetail = (
  id: number,
  name: string,
  typeNames: string[],
): PokemonDetailResponse => ({
  id,
  name,
  sprites: { front_default: null, front_shiny: null },
  types: typeNames.map((n, i) => ({ slot: i + 1, type: { name: n, url: "" } })),
  stats: [],
  height: 5,
  weight: 50,
  abilities: [],
});

const BULBASAUR = makeDetail(1, "bulbasaur", ["grass", "poison"]);
const CHARMANDER = makeDetail(4, "charmander", ["fire"]);
const CHARMELEON = makeDetail(5, "charmeleon", ["fire"]);
const CHARIZARD = makeDetail(6, "charizard", ["fire", "flying"]);
const SQUIRTLE = makeDetail(7, "squirtle", ["water"]);

beforeEach(() => {
  usePokemonListStore.setState({
    pokemon: [BULBASAUR, CHARMANDER, CHARMELEON, CHARIZARD, SQUIRTLE],
    searchQuery: "",
    activeTypeFilters: [],
  });
});

describe("setSearchQuery", () => {
  it("stores the search string", () => {
    usePokemonListStore.getState().setSearchQuery("char");
    expect(usePokemonListStore.getState().searchQuery).toBe("char");
  });

  it("stores an empty string", () => {
    usePokemonListStore.getState().setSearchQuery("char");
    usePokemonListStore.getState().setSearchQuery("");
    expect(usePokemonListStore.getState().searchQuery).toBe("");
  });
});

describe("toggleTypeFilter", () => {
  it("adds a type when not already active", () => {
    usePokemonListStore.getState().toggleTypeFilter("fire");
    expect(usePokemonListStore.getState().activeTypeFilters).toEqual(["fire"]);
  });

  it("removes a type when already active", () => {
    usePokemonListStore.getState().toggleTypeFilter("fire");
    usePokemonListStore.getState().toggleTypeFilter("fire");
    expect(usePokemonListStore.getState().activeTypeFilters).toEqual([]);
  });

  it("accumulates multiple types", () => {
    usePokemonListStore.getState().toggleTypeFilter("fire");
    usePokemonListStore.getState().toggleTypeFilter("flying");
    expect(usePokemonListStore.getState().activeTypeFilters).toEqual([
      "fire",
      "flying",
    ]);
  });

  it("removes one type while keeping others", () => {
    usePokemonListStore.getState().toggleTypeFilter("fire");
    usePokemonListStore.getState().toggleTypeFilter("flying");
    usePokemonListStore.getState().toggleTypeFilter("fire");
    expect(usePokemonListStore.getState().activeTypeFilters).toEqual([
      "flying",
    ]);
  });
});

describe("clearFilters", () => {
  it("resets both searchQuery and activeTypeFilters in one call", () => {
    usePokemonListStore.getState().setSearchQuery("char");
    usePokemonListStore.getState().toggleTypeFilter("fire");
    usePokemonListStore.getState().toggleTypeFilter("flying");

    usePokemonListStore.getState().clearFilters();

    const { searchQuery, activeTypeFilters } = usePokemonListStore.getState();
    expect(searchQuery).toBe("");
    expect(activeTypeFilters).toEqual([]);
  });
});

describe("selectFilteredPokemon", () => {
  it("returns full list when no filters are active", () => {
    const result = selectFilteredPokemon(usePokemonListStore.getState());
    expect(result).toHaveLength(5);
  });

  it("filters by name substring (case-insensitive)", () => {
    usePokemonListStore.getState().setSearchQuery("char");
    const result = selectFilteredPokemon(usePokemonListStore.getState());
    expect(result.map((p) => p.name)).toEqual([
      "charmander",
      "charmeleon",
      "charizard",
    ]);
  });

  it("filters by a single type", () => {
    usePokemonListStore.getState().toggleTypeFilter("fire");
    const result = selectFilteredPokemon(usePokemonListStore.getState());
    expect(result.map((p) => p.name)).toEqual([
      "charmander",
      "charmeleon",
      "charizard",
    ]);
  });

  it("filters by two types — only pokemon that have both", () => {
    usePokemonListStore.getState().toggleTypeFilter("fire");
    usePokemonListStore.getState().toggleTypeFilter("flying");
    const result = selectFilteredPokemon(usePokemonListStore.getState());
    expect(result.map((p) => p.name)).toEqual(["charizard"]);
  });

  it("applies both type filters and name search together", () => {
    usePokemonListStore.getState().toggleTypeFilter("fire");
    usePokemonListStore.getState().setSearchQuery("charmeleon");
    const result = selectFilteredPokemon(usePokemonListStore.getState());
    expect(result.map((p) => p.name)).toEqual(["charmeleon"]);
  });

  it("returns empty array when no pokemon match the combined filters", () => {
    usePokemonListStore.getState().toggleTypeFilter("fire");
    usePokemonListStore.getState().setSearchQuery("squirtle");
    const result = selectFilteredPokemon(usePokemonListStore.getState());
    expect(result).toHaveLength(0);
  });

  it("returns empty array when selected type combination has no matches", () => {
    usePokemonListStore.getState().toggleTypeFilter("fire");
    usePokemonListStore.getState().toggleTypeFilter("water");
    const result = selectFilteredPokemon(usePokemonListStore.getState());
    expect(result).toHaveLength(0);
  });
});
