import React from "react";
import { TouchableOpacity } from "react-native";
import { YStack, Text } from "tamagui";
import { colors } from "../../tokens/colors";
import { borderRadius, spacing } from "../../tokens/spacing";
import { fontSize, fontWeight } from "../../tokens/typography";

export interface ChipProps {
  label: string;
  color?: string;
  selected?: boolean;
  onPress?: () => void;
}

function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#1A1A1A" : "#FFFFFF";
}

export function Chip({ label, color, selected = false, onPress }: ChipProps) {
  const bgColor = color ?? colors.theme.light.border;
  const textColor = color ? getContrastColor(bgColor) : colors.primary.text;

  const chipContent = (
    <YStack
      alignItems="center"
      justifyContent="center"
      paddingHorizontal={spacing[3]}
      paddingVertical={spacing[1]}
      borderRadius={borderRadius.full}
      backgroundColor={bgColor}
      borderWidth={selected ? 2 : 0}
      borderColor={selected ? colors.primary.brand : "transparent"}
    >
      <Text
        color={textColor}
        fontSize={fontSize.xs}
        fontWeight={
          String(selected ? fontWeight.semibold : fontWeight.medium) as any
        }
      >
        {label}
      </Text>
    </YStack>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {chipContent}
      </TouchableOpacity>
    );
  }

  return chipContent;
}
