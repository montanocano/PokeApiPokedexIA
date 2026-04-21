/// <reference types="jest" />
import { isPokemonListResponse } from "../types";
import type { PokemonListResponse, PokemonDetailResponse } from "../types";

const listResponse: PokemonListResponse = {
  count: 1302,
  next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  previous: null,
  results: [{ name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" }],
};

const detailResponse: PokemonDetailResponse = {
  id: 1,
  name: "bulbasaur",
  sprites: {
    front_default: "https://example.com/bulbasaur.png",
    front_shiny: null,
  },
  types: [
    {
      slot: 1,
      type: { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" },
    },
  ],
  stats: [
    {
      base_stat: 45,
      effort: 0,
      stat: { name: "hp", url: "https://pokeapi.co/api/v2/stat/1/" },
    },
  ],
  height: 7,
  weight: 69,
  abilities: [
    {
      ability: {
        name: "overgrow",
        url: "https://pokeapi.co/api/v2/ability/65/",
      },
      is_hidden: false,
      slot: 1,
    },
  ],
};

describe("isPokemonListResponse", () => {
  it("returns true for a valid PokemonListResponse", () => {
    expect(isPokemonListResponse(listResponse)).toBe(true);
  });

  it("returns false for a PokemonDetailResponse", () => {
    expect(isPokemonListResponse(detailResponse)).toBe(false);
  });

  it("returns false for null", () => {
    expect(isPokemonListResponse(null)).toBe(false);
  });

  it("returns false for a plain object without results", () => {
    expect(isPokemonListResponse({ count: 5 })).toBe(false);
  });

  it("returns false for a non-array results field", () => {
    expect(isPokemonListResponse({ results: "not-an-array" })).toBe(false);
  });

  it("narrows the type correctly inside an if block (compile-time check)", () => {
    const unknown: unknown = listResponse;
    if (isPokemonListResponse(unknown)) {
      // TypeScript should resolve .count as number here without a cast
      expect(typeof unknown.count).toBe("number");
    } else {
      fail("Type guard should have returned true");
    }
  });
});
