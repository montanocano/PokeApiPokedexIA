import React from "react";
import { ScrollView } from "react-native";
import { XStack } from "tamagui";
import { Chip } from "../Chip";
import { TYPE_COLORS } from "../../tokens/colors";
import { usePokemonListStore } from "../../../../features/pokemon-list/store/store";
import { spacing } from "../../tokens/spacing";

const POKEMON_TYPES = [
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
] as const;

export function TypeFilter() {
  const activeTypeFilters = usePokemonListStore((s) => s.activeTypeFilters);
  const toggleTypeFilter = usePokemonListStore((s) => s.toggleTypeFilter);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: spacing[3], gap: spacing[2] }}
    >
      <XStack gap={spacing[2]}>
        {POKEMON_TYPES.map((type) => (
          <Chip
            key={type}
            label={type.charAt(0).toUpperCase() + type.slice(1)}
            color={TYPE_COLORS[type]}
            selected={activeTypeFilters.includes(type)}
            onPress={() => toggleTypeFilter(type)}
          />
        ))}
      </XStack>
    </ScrollView>
  );
}
