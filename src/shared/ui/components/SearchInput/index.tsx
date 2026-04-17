import React from 'react';
import { TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import { YStack, XStack } from 'tamagui';
import { colors } from '../../tokens/colors';
import { borderRadius, spacing } from '../../tokens/spacing';
import { fontSize } from '../../tokens/typography';

export interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSubmitEditing?: TextInputProps['onSubmitEditing'];
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
      height={40}
    >
      {/* Search icon */}
      <YStack marginRight={spacing[2]}>
        <TextInput editable={false} value="🔍" style={{ fontSize: 14, padding: 0 }} />
      </YStack>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.theme.light.textSecondary}
        onSubmitEditing={onSubmitEditing}
        returnKeyType="search"
        style={{
          flex: 1,
          fontSize: fontSize.md,
          color: colors.theme.light.text,
          padding: 0,
        }}
      />

      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onChangeText('')}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <TextInput
            editable={false}
            value="✕"
            style={{
              fontSize: 14,
              color: colors.theme.light.textSecondary,
              padding: 0,
            }}
          />
        </TouchableOpacity>
      )}
    </XStack>
  );
}
