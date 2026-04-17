import React from "react";
import { styled, XStack, Text } from "tamagui";
import { ActivityIndicator } from "react-native";
import { colors } from "../../tokens/colors";

const ButtonFrame = styled(XStack, {
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "$3",
  flexDirection: "row",

  variants: {
    variant: {
      primary: {
        backgroundColor: "$brand",
      },
      secondary: {
        backgroundColor: "$lightBorder",
      },
      outline: {
        backgroundColor: "transparent",
        borderWidth: 1.5,
        borderColor: "$brand",
      },
    },
    size: {
      sm: {
        height: 32,
        paddingHorizontal: "$3",
      },
      md: {
        height: 40,
        paddingHorizontal: "$4",
      },
      lg: {
        height: 48,
        paddingHorizontal: "$5",
      },
    },
    disabled: {
      true: {
        opacity: 0.4,
      },
    },
  } as const,

  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

const labelColors: Record<"primary" | "secondary" | "outline", string> = {
  primary: "#FFFFFF",
  secondary: colors.primary.text,
  outline: colors.primary.brand,
};

export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  onPress,
  children,
}: ButtonProps) {
  const handlePress = () => {
    if (!loading && !disabled && onPress) {
      onPress();
    }
  };

  const textColor = labelColors[variant];
  const spinnerColor = variant === "primary" ? "#FFFFFF" : colors.primary.brand;

  return (
    <ButtonFrame
      variant={variant}
      size={size}
      disabled={disabled || loading}
      onPress={handlePress}
      pressStyle={{ opacity: 0.8 }}
    >
      {loading ? (
        <ActivityIndicator size="small" color={spinnerColor} />
      ) : (
        <Text
          color={textColor}
          fontSize={size === "sm" ? "$2" : size === "lg" ? "$4" : "$3"}
          fontWeight="600"
        >
          {children}
        </Text>
      )}
    </ButtonFrame>
  );
}
