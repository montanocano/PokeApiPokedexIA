import React from "react";
import { Image } from "expo-image";
import { XStack, YStack, Text } from "tamagui";
import { Card } from "../Card";
import { Chip } from "../Chip";
import type { PokemonDetailResponse } from "../../../api/types";

const TYPE_COLORS: Record<string, string> = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
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
};

const TYPE_BACKGROUNDS: Record<string, string> = {
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
  const bgColor = TYPE_BACKGROUNDS[primaryType] ?? "#F5F5F0";

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
          color={TYPE_COLORS[primaryType] ?? "#A8A878"}
          fontWeight="700"
          alignSelf="flex-start"
          opacity={0.9}
        >
          {formatId(pokemon.id)}
        </Text>

        {spriteUri ? (
          <Image
            source={{ uri: spriteUri }}
            style={{ width: 110, height: 110 }}
            contentFit="contain"
          />
        ) : (
          <YStack width={110} height={110} />
        )}

        <Text fontSize="$4" fontWeight="700" color="#1A1A1A">
          {capitalize(pokemon.name)}
        </Text>

        <XStack gap="$2" flexWrap="wrap" justifyContent="center">
          {pokemon.types.map((t) => (
            <Chip
              key={t.type.name}
              label={capitalize(t.type.name)}
              color={TYPE_COLORS[t.type.name] ?? "#A8A878"}
            />
          ))}
        </XStack>
      </YStack>
    </Card>
  );
}
