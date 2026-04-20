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
import { usePokemonList } from "../../src/features/pokemon-list/hooks/usePokemonList";
import { PokemonCard } from "../../src/shared/ui/components/PokemonCard";
import type { PokemonDetailResponse } from "../../src/shared/api/types";

export default function PokedexScreen() {
  const { pokemon, isLoading, error, loadList, loadMore, refreshList } =
    usePokemonList();

  useEffect(() => {
    loadList();
  }, []);

  if (isLoading && pokemon.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <YStack flex={1} alignItems="center" justifyContent="center" backgroundColor="$background">
          <ActivityIndicator size="large" color="#CC0000" />
          <Text marginTop="$3" color="$colorSubtle" fontSize="$4">
            Loading Pokédex…
          </Text>
        </YStack>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <YStack backgroundColor="#CC0000" paddingHorizontal="$5" paddingTop="$3" paddingBottom="$4">
        <XStack alignItems="center" gap="$2">
          <YStack flex={1}>
            <Text fontSize={32} fontWeight="800" color="white" letterSpacing={-0.5}>
              Pokédex
            </Text>
          </YStack>
        </XStack>
      </YStack>

      {/* Content */}
      <YStack flex={1} backgroundColor="#F5F5F5">
        <FlatList<PokemonDetailResponse>
          data={pokemon}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          style={styles.list}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <PokemonCard pokemon={item} />
            </View>
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            isLoading && pokemon.length > 0 ? (
              <View style={styles.footer}>
                <ActivityIndicator color="#CC0000" />
              </View>
            ) : null
          }
          refreshControl={
            <RefreshControl
              refreshing={isLoading && pokemon.length > 0}
              onRefresh={refreshList}
              tintColor="#CC0000"
              colors={["#CC0000"]}
            />
          }
        />

        {error ? (
          <Text color="$red10" textAlign="center" padding="$3">
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
    backgroundColor: "#CC0000",
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
