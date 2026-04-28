import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { YStack, XStack, Text } from "tamagui";
import { Chip } from "../Chip";
import { FavoriteButton } from "../FavoriteButton";
import { colors } from "../../tokens/colors";
import { spacing } from "../../tokens/spacing";
import { fontSize } from "../../tokens/typography";
import {
  formatId,
  capitalize,
} from "../../../../features/pokemon-detail/utils/formatters";
import type { PokemonDetailResponse } from "../../../api/types";

const TYPE_COLORS: Record<string, string> = { ...colors.pokemonTypes };
const TYPE_BACKGROUNDS: Record<string, string> = {
  ...colors.pokemonTypeBackgrounds,
};
const ARTWORK_SIZE = 200;
const FALLBACK_BG = colors.pokemonTypeBackgrounds.normal;

interface PokemonDetailHeaderProps {
  pokemon: PokemonDetailResponse;
}

export function PokemonDetailHeader({ pokemon }: PokemonDetailHeaderProps) {
  const router = useRouter();

  const primaryType = pokemon.types[0]?.type.name ?? "normal";
  const bgColor = TYPE_BACKGROUNDS[primaryType] ?? FALLBACK_BG;

  const spriteUri =
    pokemon.sprites.other?.["official-artwork"]?.front_default ??
    pokemon.sprites.front_default;

  return (
    <YStack backgroundColor={bgColor} paddingBottom={spacing[6]}>
      {/* Back button row */}
      <XStack
        paddingHorizontal={spacing[4]}
        paddingTop={spacing[10]}
        justifyContent="space-between"
        alignItems="center"
      >
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <Text
            fontSize={fontSize.lg}
            color={TYPE_COLORS[primaryType] ?? colors.pokemonTypes.normal}
            fontWeight="700"
          >
            ← Back
          </Text>
        </TouchableOpacity>
        <FavoriteButton pokemonId={pokemon.id} size={28} />
      </XStack>

      {/* Artwork */}
      <YStack alignItems="center" marginTop={spacing[2]}>
        {spriteUri ? (
          <Image
            source={{ uri: spriteUri }}
            style={styles.artwork}
            contentFit="contain"
          />
        ) : (
          <YStack width={ARTWORK_SIZE} height={ARTWORK_SIZE} />
        )}
      </YStack>

      {/* Name and Pokédex number */}
      <YStack
        alignItems="center"
        gap={spacing[1]}
        paddingHorizontal={spacing[4]}
      >
        <Text
          fontSize={fontSize["3xl"]}
          fontWeight="800"
          color="$lightText"
          textAlign="center"
        >
          {capitalize(pokemon.name)}
        </Text>
        <Text
          fontSize={fontSize.md}
          fontWeight="700"
          color={TYPE_COLORS[primaryType] ?? colors.pokemonTypes.normal}
          opacity={0.9}
        >
          {formatId(pokemon.id)}
        </Text>
      </YStack>

      {/* Type chips */}
      <XStack
        justifyContent="center"
        gap={spacing[2]}
        flexWrap="wrap"
        marginTop={spacing[3]}
        paddingHorizontal={spacing[4]}
      >
        {pokemon.types.map((t) => (
          <Chip
            key={t.type.name}
            label={capitalize(t.type.name)}
            color={TYPE_COLORS[t.type.name] ?? colors.pokemonTypes.normal}
          />
        ))}
      </XStack>
    </YStack>
  );
}

const styles = StyleSheet.create({
  artwork: {
    width: ARTWORK_SIZE,
    height: ARTWORK_SIZE,
  },
});
