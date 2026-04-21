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
  const visibleAbilities = pokemon.abilities
    .filter((a) => !a.is_hidden)
    .map((a) => capitalize(a.ability.name));

  const abilitiesLabel =
    visibleAbilities.length > 0 ? visibleAbilities.join(", ") : "—";

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
              {abilitiesLabel}
            </Text>
          </YStack>
        </XStack>
      </Card>
    </YStack>
  );
}
