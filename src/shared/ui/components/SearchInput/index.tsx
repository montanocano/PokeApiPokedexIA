import React from "react";
import { TextInputProps, TouchableOpacity } from "react-native";
import { Input, Text, XStack } from "tamagui";
import { colors } from "../../tokens/colors";
import { borderRadius, sizes, spacing } from "../../tokens/spacing";
import { fontSize } from "../../tokens/typography";

export interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSubmitEditing?: TextInputProps["onSubmitEditing"];
}

export function SearchInput({
  value,
  onChangeText,
  placeholder,
  onSubmitEditing,
}: SearchInputProps) {
  return (
    <XStack
      alignItems="center"
      backgroundColor={colors.theme.light.surface}
      borderRadius={borderRadius.lg}
      borderWidth={1}
      borderColor={colors.theme.light.border}
      paddingHorizontal={spacing[3]}
      height={sizes.button.md}
    >
      {/* Search icon */}
      <Text
        fontSize={fontSize.sm}
        marginRight={spacing[2]}
        color={colors.theme.light.text}
      >
        🔍
      </Text>

      <Input
        unstyled
        flex={1}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.theme.light.textSecondary}
        onSubmitEditing={onSubmitEditing}
        returnKeyType="search"
        fontSize={fontSize.md}
        color={colors.theme.light.text}
        padding={0}
      />

      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onChangeText("")}
          hitSlop={{
            top: spacing[2],
            bottom: spacing[2],
            left: spacing[2],
            right: spacing[2],
          }}
        >
          <Text fontSize={fontSize.sm} color={colors.theme.light.textSecondary}>
            ✕
          </Text>
        </TouchableOpacity>
      )}
    </XStack>
  );
}
