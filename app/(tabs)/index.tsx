import React, { useEffect } from "react";
import {
  FlatList,
  RefreshControl,
  ActivityIndicator,
  View,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, YStack, XStack } from "tamagui";
import { router } from "expo-router";
import { useShallow } from "zustand/react/shallow";
import { usePokemonList } from "../../src/features/pokemon-list/hooks/usePokemonList";
import { PokemonCard } from "../../src/shared/ui/components/PokemonCard";
import { SearchBar } from "../../src/shared/ui/components/SearchBar";
import { TypeFilter } from "../../src/shared/ui/components/TypeFilter";
import { usePokemonListStore } from "../../src/features/pokemon-list/store/store";
import { selectFilteredPokemon } from "../../src/features/pokemon-list/store/pokemonListStore";
import { colors } from "../../src/shared/ui/tokens/colors";
import type { PokemonDetailResponse } from "../../src/shared/api/types";

export default function PokedexScreen() {
  const {
    pokemon,
    isLoading,
    isRefreshing,
    error,
    loadList,
    loadMore,
    refreshList,
  } = usePokemonList();

  const filteredPokemon = usePokemonListStore(
    useShallow(selectFilteredPokemon),
  );

  const activeTypeFilters = usePokemonListStore((s) => s.activeTypeFilters);
  const hasMore = usePokemonListStore((s) => s.hasMore);

  useEffect(() => {
    loadList();
  }, [loadList]);

  // When type filters are active, keep loading pages until all Pokémon are
  // fetched so the filter searches the full Pokédex, not just loaded pages.
  useEffect(() => {
    if (
      activeTypeFilters.length > 0 &&
      !isLoading &&
      !isRefreshing &&
      hasMore
    ) {
      loadMore();
    }
  }, [activeTypeFilters.length, isLoading, isRefreshing, hasMore, loadMore]);

  if (isLoading && pokemon.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <YStack
          flex={1}
          alignItems="center"
          justifyContent="center"
          backgroundColor="$background"
        >
          <ActivityIndicator size="large" color={colors.primary.brand} />
          <Text marginTop="$3" color="$colorSubtle" fontSize="$4">
            Loading Pokédex…
          </Text>
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
          <YStack flex={1}>
            <Text
              fontSize={32}
              fontWeight="800"
              color="$lightSurface"
              letterSpacing={-0.5}
            >
              Pokédex
            </Text>
          </YStack>
        </XStack>
      </YStack>

      {/* Content */}
      <YStack flex={1} backgroundColor="$lightBackground">
        <YStack paddingHorizontal="$4" paddingTop="$3" gap="$2">
          <SearchBar />
          <TypeFilter />
        </YStack>

        {activeTypeFilters.length > 0 && hasMore && isLoading && (
          <XStack
            alignItems="center"
            justifyContent="center"
            gap="$2"
            paddingVertical="$2"
            backgroundColor="$brand"
            opacity={0.9}
          >
            <ActivityIndicator size="small" color="white" />
            <Text color="white" fontSize="$3">
              Searching all Pokémon…
            </Text>
          </XStack>
        )}

        <FlatList<PokemonDetailResponse>
          data={filteredPokemon}
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
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            isLoading && filteredPokemon.length > 0 ? (
              <View style={styles.footer}>
                <ActivityIndicator color={colors.primary.brand} />
              </View>
            ) : null
          }
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refreshList}
              tintColor={colors.primary.brand}
              colors={[colors.primary.brand]}
            />
          }
        />

        {error ? (
          <Text color="$error" textAlign="center" padding="$3">
            {error}
          </Text>
        ) : null}
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
  footer: {
    paddingVertical: 20,
    alignItems: "center",
  },
});
