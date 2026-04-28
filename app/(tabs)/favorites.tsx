import React from "react";
import { FlatList, View, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, YStack, XStack } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useFavoriteList } from "../../src/features/pokemon-favorite/hooks/useFavoriteList";
import { PokemonCard } from "../../src/shared/ui/components/PokemonCard";
import { colors } from "../../src/shared/ui/tokens/colors";
import type { PokemonDetailResponse } from "../../src/shared/api/types";

export default function FavoritesScreen() {
  const { favoritePokemon, isHydrated } = useFavoriteList();

  if (!isHydrated) {
    return (
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <YStack flex={1} alignItems="center" justifyContent="center">
          <ActivityIndicator size="large" color={colors.primary.brand} />
        </YStack>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {/* Header */}
      <YStack
        backgroundColor="$brand"
        paddingHorizontal="$5"
        paddingTop="$3"
        paddingBottom="$4"
      >
        <XStack alignItems="center" gap="$2">
          <Text
            fontSize={32}
            fontWeight="800"
            color="$lightSurface"
            letterSpacing={-0.5}
          >
            Favorites
          </Text>
        </XStack>
      </YStack>

      {/* Content */}
      <YStack flex={1} backgroundColor="$lightBackground">
        {favoritePokemon.length === 0 ? (
          <YStack
            flex={1}
            alignItems="center"
            justifyContent="center"
            gap="$4"
            paddingHorizontal="$6"
          >
            <Ionicons
              name="heart-outline"
              size={72}
              color={colors.theme.light.textSecondary}
            />
            <Text
              fontSize="$5"
              fontWeight="700"
              color="$colorSubtle"
              textAlign="center"
            >
              No favourites yet
            </Text>
            <Text
              fontSize="$3"
              color="$colorSubtle"
              textAlign="center"
              lineHeight={22}
            >
              Tap the heart icon on any Pokémon to save it here.
            </Text>
          </YStack>
        ) : (
          <FlatList<PokemonDetailResponse>
            data={favoritePokemon}
            keyExtractor={(item) => String(item.id)}
            numColumns={2}
            style={styles.list}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.cardWrapper}>
                <PokemonCard
                  pokemon={item}
                  onPress={() =>
                    router.push({
                      pathname: "/detail/[id]",
                      params: { id: item.id },
                    })
                  }
                />
              </View>
            )}
          />
        )}
      </YStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.brand,
  },
  list: {
    flex: 1,
  },
  row: {
    gap: 12,
    paddingHorizontal: 16,
  },
  listContent: {
    gap: 12,
    paddingTop: 16,
    paddingBottom: 32,
  },
  cardWrapper: {
    flex: 1,
  },
});
