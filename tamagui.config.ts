import { config as defaultConfig } from "@tamagui/config/v3";
import { createTamagui, createTokens } from "@tamagui/core";

import { colors } from "./src/shared/ui/tokens/colors";
import { borderRadius, spacing } from "./src/shared/ui/tokens/spacing";
import { fontSize, fontWeight } from "./src/shared/ui/tokens/typography";

const tokens = createTokens({
  ...defaultConfig.tokens,

  color: {
    ...defaultConfig.tokens.color,
    // Primary
    brand: colors.primary.brand,
    primaryBackground: colors.primary.background,
    primarySurface: colors.primary.surface,
    primaryText: colors.primary.text,
    // Light theme
    lightBackground: colors.theme.light.background,
    lightSurface: colors.theme.light.surface,
    lightText: colors.theme.light.text,
    lightTextSecondary: colors.theme.light.textSecondary,
    lightBorder: colors.theme.light.border,
    // Dark theme
    darkBackground: colors.theme.dark.background,
    darkSurface: colors.theme.dark.surface,
    darkText: colors.theme.dark.text,
    darkTextSecondary: colors.theme.dark.textSecondary,
    darkBorder: colors.theme.dark.border,
    // Semantic
    success: colors.semantic.success,
    error: colors.semantic.error,
    warning: colors.semantic.warning,
    // Pokemon types
    typeNormal: colors.pokemonTypes.normal,
    typeFire: colors.pokemonTypes.fire,
    typeWater: colors.pokemonTypes.water,
    typeGrass: colors.pokemonTypes.grass,
    typeElectric: colors.pokemonTypes.electric,
    typeIce: colors.pokemonTypes.ice,
    typeFighting: colors.pokemonTypes.fighting,
    typePoison: colors.pokemonTypes.poison,
    typeGround: colors.pokemonTypes.ground,
    typeFlying: colors.pokemonTypes.flying,
    typePsychic: colors.pokemonTypes.psychic,
    typeBug: colors.pokemonTypes.bug,
    typeRock: colors.pokemonTypes.rock,
    typeGhost: colors.pokemonTypes.ghost,
    typeDragon: colors.pokemonTypes.dragon,
    typeDark: colors.pokemonTypes.dark,
    typeSteel: colors.pokemonTypes.steel,
    typeFairy: colors.pokemonTypes.fairy,
    // Pokemon type backgrounds
    typeBgNormal: colors.pokemonTypeBackgrounds.normal,
    typeBgFire: colors.pokemonTypeBackgrounds.fire,
    typeBgWater: colors.pokemonTypeBackgrounds.water,
    typeBgGrass: colors.pokemonTypeBackgrounds.grass,
    typeBgElectric: colors.pokemonTypeBackgrounds.electric,
    typeBgIce: colors.pokemonTypeBackgrounds.ice,
    typeBgFighting: colors.pokemonTypeBackgrounds.fighting,
    typeBgPoison: colors.pokemonTypeBackgrounds.poison,
    typeBgGround: colors.pokemonTypeBackgrounds.ground,
    typeBgFlying: colors.pokemonTypeBackgrounds.flying,
    typeBgPsychic: colors.pokemonTypeBackgrounds.psychic,
    typeBgBug: colors.pokemonTypeBackgrounds.bug,
    typeBgRock: colors.pokemonTypeBackgrounds.rock,
    typeBgGhost: colors.pokemonTypeBackgrounds.ghost,
    typeBgDragon: colors.pokemonTypeBackgrounds.dragon,
    typeBgDark: colors.pokemonTypeBackgrounds.dark,
    typeBgSteel: colors.pokemonTypeBackgrounds.steel,
    typeBgFairy: colors.pokemonTypeBackgrounds.fairy,
  },

  space: {
    ...defaultConfig.tokens.space,
    1: spacing[1],
    2: spacing[2],
    3: spacing[3],
    4: spacing[4],
    5: spacing[5],
    6: spacing[6],
    8: spacing[8],
    10: spacing[10],
    12: spacing[12],
    16: spacing[16],
  },

  size: {
    ...defaultConfig.tokens.size,
  },

  radius: {
    ...defaultConfig.tokens.radius,
    0: borderRadius.none,
    1: borderRadius.sm,
    2: borderRadius.md,
    3: borderRadius.lg,
    4: borderRadius.xl,
    full: borderRadius.full,
  },

  zIndex: {
    ...defaultConfig.tokens.zIndex,
  },
});

export const config = createTamagui({
  ...defaultConfig,
  tokens,
  fonts: {
    ...defaultConfig.fonts,
    body: {
      ...defaultConfig.fonts.body,
      size: {
        1: fontSize.xs,
        2: fontSize.sm,
        3: fontSize.md,
        4: fontSize.lg,
        5: fontSize.xl,
        6: fontSize["2xl"],
        7: fontSize["3xl"],
        8: fontSize["4xl"],
      },
      weight: {
        1: String(fontWeight.regular),
        4: String(fontWeight.medium),
        6: String(fontWeight.semibold),
        7: String(fontWeight.bold),
      },
    },
    heading: {
      ...defaultConfig.fonts.heading,
      size: {
        1: fontSize.lg,
        2: fontSize.xl,
        3: fontSize["2xl"],
        4: fontSize["3xl"],
        5: fontSize["4xl"],
      },
      weight: {
        1: String(fontWeight.semibold),
        7: String(fontWeight.bold),
      },
    },
  },
});

export type AppConfig = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}
}
