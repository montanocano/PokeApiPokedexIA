import type { PokemonDetailResponse } from "../../../../shared/api/types";

export function filterPokemon(
  list: PokemonDetailResponse[],
  query: string,
  types: string[],
): PokemonDetailResponse[] {
  let result = list;

  if (types.length > 0) {
    result = result.filter((p) =>
      types.every((type) => p.types.some((t) => t.type.name === type)),
    );
  }

  const trimmed = query.trim().toLowerCase();
  if (trimmed !== "") {
    result = result.filter((p) => p.name.toLowerCase().includes(trimmed));
  }

  return result;
}
