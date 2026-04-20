export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  other?: {
    "official-artwork"?: {
      front_default: string | null;
    };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: PokemonSprites;
  types: PokemonType[];
  stats: PokemonStat[];
}

export type PokemonDetailResponse = Pokemon;

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export function isPokemonListResponse(
  value: unknown,
): value is PokemonListResponse {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.count === "number" &&
    (typeof candidate.next === "string" || candidate.next === null) &&
    (typeof candidate.previous === "string" || candidate.previous === null) &&
    Array.isArray(candidate.results) &&
    candidate.results.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "name" in item &&
        typeof (item as Record<string, unknown>).name === "string" &&
        "url" in item &&
        typeof (item as Record<string, unknown>).url === "string",
    )
  );
}

export interface ApiError {
  status: number;
  message: string;
}
