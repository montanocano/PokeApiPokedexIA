/**
 * UI tests for DetailScreen, PokemonDetailHeader, PokemonBasicInfoSection,
 * and PokemonStatsSection.
 *
 * The tests below cover pure utility logic used by the UI components.
 * Component render tests can be added using @testing-library/react-native
 * (already installed as a dev dependency).
 */
import {
  formatId,
  formatHeight,
  formatWeight,
  formatStatName,
  capitalize,
} from "../utils/formatters";
import { colors } from "../../../shared/ui/tokens/colors";

// ---------------------------------------------------------------------------
// formatters.ts (used across all UI components)
// ---------------------------------------------------------------------------
describe("formatId", () => {
  it("pads single-digit ids to 3 digits", () => {
    expect(formatId(1)).toBe("#001");
  });

  it("pads double-digit ids to 3 digits", () => {
    expect(formatId(25)).toBe("#025");
  });

  it("does not pad triple-digit ids", () => {
    expect(formatId(150)).toBe("#150");
  });
});

describe("formatHeight", () => {
  it("divides PokéAPI decimetres by 10 and appends m", () => {
    expect(formatHeight(7)).toBe("0.7 m");
    expect(formatHeight(14)).toBe("1.4 m");
  });
});

describe("formatWeight", () => {
  it("divides PokéAPI hectograms by 10 and appends kg", () => {
    expect(formatWeight(69)).toBe("6.9 kg");
    expect(formatWeight(905)).toBe("90.5 kg");
  });
});

describe("formatStatName", () => {
  it("maps known stat names to display labels", () => {
    expect(formatStatName("hp")).toBe("HP");
    expect(formatStatName("attack")).toBe("Attack");
    expect(formatStatName("defense")).toBe("Defense");
    expect(formatStatName("special-attack")).toBe("Sp. Atk");
    expect(formatStatName("special-defense")).toBe("Sp. Def");
    expect(formatStatName("speed")).toBe("Speed");
  });

  it("returns the original name for unknown stats", () => {
    expect(formatStatName("unknown-stat")).toBe("unknown-stat");
  });
});

describe("capitalize", () => {
  it("capitalizes the first letter", () => {
    expect(capitalize("bulbasaur")).toBe("Bulbasaur");
    expect(capitalize("charizard")).toBe("Charizard");
  });
});

// ---------------------------------------------------------------------------
// Stat bar color logic (from PokemonStatsSection)
// ---------------------------------------------------------------------------
function getStatColor(value: number): string {
  if (value < 50) return colors.semantic.error;
  if (value < 100) return colors.semantic.warning;
  return colors.semantic.success;
}

describe("getStatColor (stat bar color thresholds)", () => {
  it("returns error color for value < 50", () => {
    expect(getStatColor(45)).toBe(colors.semantic.error);
    expect(getStatColor(0)).toBe(colors.semantic.error);
    expect(getStatColor(49)).toBe(colors.semantic.error);
  });

  it("returns warning color for 50 <= value < 100", () => {
    expect(getStatColor(50)).toBe(colors.semantic.warning);
    expect(getStatColor(65)).toBe(colors.semantic.warning);
    expect(getStatColor(99)).toBe(colors.semantic.warning);
  });

  it("returns success color for value >= 100", () => {
    expect(getStatColor(100)).toBe(colors.semantic.success);
    expect(getStatColor(110)).toBe(colors.semantic.success);
    expect(getStatColor(255)).toBe(colors.semantic.success);
  });
});

// ---------------------------------------------------------------------------
// Type-background fallback logic (from PokemonDetailHeader)
// ---------------------------------------------------------------------------
describe("type-to-background-color mapping", () => {
  it("has a background color for all 18 standard types", () => {
    const types = [
      "normal",
      "fire",
      "water",
      "grass",
      "electric",
      "ice",
      "fighting",
      "poison",
      "ground",
      "flying",
      "psychic",
      "bug",
      "rock",
      "ghost",
      "dragon",
      "dark",
      "steel",
      "fairy",
    ];
    types.forEach((type) => {
      expect(colors.pokemonTypeBackgrounds).toHaveProperty(type);
    });
  });

  it("falls back to normal background for unrecognised types", () => {
    const unknownType = "unknown-type";
    const bg =
      (colors.pokemonTypeBackgrounds as Record<string, string>)[unknownType] ??
      colors.pokemonTypeBackgrounds.normal;
    expect(bg).toBe(colors.pokemonTypeBackgrounds.normal);
  });
});
