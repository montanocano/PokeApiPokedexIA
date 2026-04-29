import React from "react";
import { YStack, XStack, Text } from "tamagui";
import { Card } from "../Card";
import { spacing } from "../../tokens/spacing";
import { fontSize } from "../../tokens/typography";
import { colors } from "../../tokens/colors";
import {
  formatHeight,
  formatWeight,
  capitalize,
} from "../../../../features/pokemon-detail/utils/formatters";
import type { PokemonDetailResponse } from "../../../api/types";

interface InfoCardProps {
  icon: string;
  label: string;
  value: string;
}

function InfoCard({ icon, label, value }: InfoCardProps) {
  return (
    <Card elevation="sm" padding={spacing[3]}>
      <YStack alignItems="center" gap={spacing[1]}>
        <Text fontSize={fontSize["2xl"]}>{icon}</Text>
        <Text
          fontSize={fontSize.lg}
          fontWeight="700"
          color={colors.primary.text}
        >
          {value}
        </Text>
        <Text fontSize={fontSize.sm} color={colors.theme.light.textSecondary}>
          {label}
        </Text>
      </YStack>
    </Card>
  );
}

interface PokemonBasicInfoSectionProps {
  pokemon: PokemonDetailResponse;
}

export function PokemonBasicInfoSection({
  pokemon,
}: PokemonBasicInfoSectionProps) {
  const normalAbilities = pokemon.abilities
    .filter((a) => !a.is_hidden)
    .map((a) => capitalize(a.ability.name));

  const hiddenAbilities = pokemon.abilities
    .filter((a) => a.is_hidden)
    .map((a) => capitalize(a.ability.name));

  const normalLabel =
    normalAbilities.length > 0 ? normalAbilities.join(", ") : "—";

  return (
    <YStack padding={spacing[4]} gap={spacing[3]}>
      <Text fontSize={fontSize.xl} fontWeight="700" color={colors.primary.text}>
        Info
      </Text>
      <XStack gap={spacing[3]}>
        <YStack flex={1}>
          <InfoCard
            icon="📏"
            label="Height"
            value={formatHeight(pokemon.height)}
          />
        </YStack>
        <YStack flex={1}>
          <InfoCard
            icon="⚖️"
            label="Weight"
            value={formatWeight(pokemon.weight)}
          />
        </YStack>
      </XStack>
      <Card elevation="sm" padding={spacing[3]}>
        <XStack alignItems="center" gap={spacing[2]}>
          <Text fontSize={fontSize.xl}>✨</Text>
          <YStack flex={1}>
            <Text
              fontSize={fontSize.sm}
              color={colors.theme.light.textSecondary}
            >
              Abilities
            </Text>
            <Text
              fontSize={fontSize.md}
              fontWeight="600"
              color={colors.primary.text}
            >
              {normalLabel}
            </Text>
          </YStack>
        </XStack>
      </Card>
      {hiddenAbilities.length > 0 && (
        <Card elevation="sm" padding={spacing[3]}>
          <XStack alignItems="center" gap={spacing[2]}>
            <Text fontSize={fontSize.xl}>🔮</Text>
            <YStack flex={1}>
              <Text
                fontSize={fontSize.sm}
                color={colors.theme.light.textSecondary}
              >
                Hidden Ability
              </Text>
              <Text
                fontSize={fontSize.md}
                fontWeight="600"
                color={colors.primary.text}
              >
                {hiddenAbilities.join(", ")}
              </Text>
            </YStack>
          </XStack>
        </Card>
      )}
    </YStack>
  );
}
