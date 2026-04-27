import React from "react";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { XStack, YStack, Text } from "tamagui";
import { Card } from "../Card";
import { Chip } from "../Chip";
import { colors } from "../../tokens/colors";
import type { PokemonDetailResponse } from "../../../api/types";

// Sourced from the centralized color tokens — no inline hex values.
const TYPE_COLORS: Record<string, string> = { ...colors.pokemonTypes };
const TYPE_BACKGROUNDS: Record<string, string> = {
  ...colors.pokemonTypeBackgrounds,
};

function formatId(id: number): string {
  return `#${String(id).padStart(3, "0")}`;
}

function capitalize(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export interface PokemonCardProps {
  pokemon: PokemonDetailResponse;
  onPress?: () => void;
}

export function PokemonCard({ pokemon, onPress }: PokemonCardProps) {
  const spriteUri =
    pokemon.sprites.other?.["official-artwork"]?.front_default ??
    pokemon.sprites.front_default;

  const primaryType = pokemon.types[0]?.type.name ?? "normal";
  const bgColor =
    TYPE_BACKGROUNDS[primaryType] ?? colors.pokemonTypeBackgrounds.normal;

  return (
    <Card elevation="sm" onPress={onPress} padding="$0">
      <YStack
        alignItems="center"
        gap="$2"
        padding="$3"
        backgroundColor={bgColor}
        borderRadius="$3"
      >
        <Text
          fontSize="$2"
          color={TYPE_COLORS[primaryType] ?? colors.pokemonTypes.normal}
          fontWeight="700"
          alignSelf="flex-start"
          opacity={0.9}
        >
          {formatId(pokemon.id)}
        </Text>

        {spriteUri ? (
          <Image
            source={{ uri: spriteUri }}
            style={styles.sprite}
            contentFit="contain"
          />
        ) : (
          <YStack width={110} height={110} />
        )}

        <Text fontSize="$4" fontWeight="700" color="$lightText">
          {capitalize(pokemon.name)}
        </Text>

        <XStack gap="$2" flexWrap="wrap" justifyContent="center">
          {pokemon.types.map((t) => (
            <Chip
              key={t.type.name}
              label={capitalize(t.type.name)}
              color={TYPE_COLORS[t.type.name] ?? colors.pokemonTypes.normal}
            />
          ))}
        </XStack>
      </YStack>
    </Card>
  );
}

const styles = StyleSheet.create({
  sprite: {
    width: 110,
    height: 110,
  },
});
