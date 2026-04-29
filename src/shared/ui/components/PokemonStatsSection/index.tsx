import React from "react";
import { YStack, XStack, Text } from "tamagui";
import { colors } from "../../tokens/colors";
import { spacing } from "../../tokens/spacing";
import { fontSize } from "../../tokens/typography";
import { formatStatName } from "../../../../features/pokemon-detail/utils/formatters";
import type { PokemonStat } from "../../../api/types";

const MAX_STAT = 255;
const STAT_BAR_HEIGHT = 8;
const STAT_BAR_BG_RADIUS = 4;

function getStatColor(value: number): string {
  if (value < 50) return colors.semantic.error;
  if (value < 100) return colors.semantic.warning;
  return colors.semantic.success;
}

interface StatRowProps {
  label: string;
  value: number;
  showBar?: boolean;
}

function StatRow({ label, value, showBar = true }: StatRowProps) {
  const barPercent = `${Math.min((value / MAX_STAT) * 100, 100)}%` as const;
  const barColor = getStatColor(value);

  return (
    <XStack alignItems="center" gap={spacing[3]}>
      <Text
        fontSize={fontSize.sm}
        color={colors.theme.light.textSecondary}
        width={64}
      >
        {label}
      </Text>
      <Text
        fontSize={fontSize.sm}
        fontWeight="700"
        color={colors.primary.text}
        width={36}
        textAlign="right"
      >
        {value}
      </Text>
      {showBar && (
        <YStack
          flex={1}
          backgroundColor={colors.theme.light.border}
          borderRadius={STAT_BAR_BG_RADIUS}
          height={STAT_BAR_HEIGHT}
        >
          <YStack
            height={STAT_BAR_HEIGHT}
            borderRadius={STAT_BAR_BG_RADIUS}
            backgroundColor={barColor}
            width={barPercent}
          />
        </YStack>
      )}
    </XStack>
  );
}

interface PokemonStatsSectionProps {
  stats: PokemonStat[];
}

export function PokemonStatsSection({ stats }: PokemonStatsSectionProps) {
  const total = stats.reduce((sum, s) => sum + s.base_stat, 0);

  return (
    <YStack padding={spacing[4]} gap={spacing[3]}>
      <Text fontSize={fontSize.xl} fontWeight="700" color={colors.primary.text}>
        Base Stats
      </Text>
      <YStack gap={spacing[2]}>
        {stats.map((s) => (
          <StatRow
            key={s.stat.name}
            label={formatStatName(s.stat.name)}
            value={s.base_stat}
          />
        ))}
        <YStack
          height={1}
          backgroundColor={colors.theme.light.border}
          marginVertical={spacing[1]}
        />
        <StatRow label="Total" value={total} showBar={false} />
      </YStack>
    </YStack>
  );
}
