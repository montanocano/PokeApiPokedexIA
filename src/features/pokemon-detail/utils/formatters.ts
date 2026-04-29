const POKEAPI_UNIT_DIVISOR = 10;

const STAT_LABEL_MAP: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

export function formatId(id: number): string {
  return `#${String(id).padStart(3, "0")}`;
}

export function formatHeight(height: number): string {
  return `${(height / POKEAPI_UNIT_DIVISOR).toFixed(1)} m`;
}

export function formatWeight(weight: number): string {
  return `${(weight / POKEAPI_UNIT_DIVISOR).toFixed(1)} kg`;
}

export function formatStatName(name: string): string {
  return STAT_LABEL_MAP[name] ?? name;
}

export function capitalize(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}
