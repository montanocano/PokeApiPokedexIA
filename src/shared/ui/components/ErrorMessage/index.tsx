import React from "react";
import { YStack, XStack, Text } from "tamagui";
import { colors } from "../../tokens/colors";
import { spacing } from "../../tokens/spacing";
import { fontSize } from "../../tokens/typography";
import { Button } from "../Button";

export interface ErrorMessageProps {
  message?: string | null;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  if (!message) {
    return null;
  }

  return (
    <YStack
      alignItems="center"
      justifyContent="center"
      gap={spacing[3]}
      padding={spacing[4]}
    >
      <XStack alignItems="center" gap={spacing[2]}>
        <Text fontSize={fontSize.lg}>⚠️</Text>
        <Text
          color={colors.semantic.error}
          fontSize={fontSize.md}
          textAlign="center"
        >
          {message}
        </Text>
      </XStack>

      {onRetry && (
        <Button variant="outline" size="sm" onPress={onRetry}>
          Reintentar
        </Button>
      )}
    </YStack>
  );
}
