export const colors = {
  primary: {
    brand: "#CC0000",
    background: "#F5F5F5",
    surface: "#FFFFFF",
    text: "#1A1A1A",
  },

  pokemonTypes: {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  },

  pokemonTypeBackgrounds: {
    normal: "#F0F0E8",
    fire: "#FFF0E0",
    water: "#E8F0FF",
    electric: "#FFFBE0",
    grass: "#EAF5E8",
    ice: "#E8F8F8",
    fighting: "#FDEAED",
    poison: "#F5E8F8",
    ground: "#FDF5E0",
    flying: "#F0EBF8",
    psychic: "#FDE8F0",
    bug: "#F5F8E0",
    rock: "#F5F0E8",
    ghost: "#EDE8F5",
    dragon: "#EAE8F8",
    dark: "#EEEAE8",
    steel: "#EEEFF5",
    fairy: "#FDE8F0",
  },

  theme: {
    light: {
      background: "#F5F5F5",
      surface: "#FFFFFF",
      text: "#1A1A1A",
      textSecondary: "#6B6B6B",
      border: "#E0E0E0",
    },
    dark: {
      background: "#121212",
      surface: "#1E1E1E",
      text: "#F5F5F5",
      textSecondary: "#A0A0A0",
      border: "#2C2C2C",
    },
  },

  semantic: {
    success: "#4CAF50",
    error: "#F44336",
    warning: "#FF9800",
  },
} as const;

export type PokemonType = keyof typeof colors.pokemonTypes;

export const TYPE_COLORS: Record<PokemonType, string> = colors.pokemonTypes;
export const TYPE_BACKGROUNDS: Record<PokemonType, string> =
  colors.pokemonTypeBackgrounds;
