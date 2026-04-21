import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { YStack } from "tamagui";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { PokemonDetailHeader } from "../components/PokemonDetailHeader";
import { PokemonBasicInfoSection } from "../components/PokemonBasicInfoSection";
import { PokemonStatsSection } from "../components/PokemonStatsSection";
import { usePokemonDetail } from "../../../features/pokemon-detail/hooks/usePokemonDetail";

interface DetailScreenProps {
  pokemonId: number;
}

export function DetailScreen({ pokemonId }: DetailScreenProps) {
  const { pokemon, isLoading, error, fetchPokemonDetail } =
    usePokemonDetail(pokemonId);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <YStack flex={1} alignItems="center" justifyContent="center">
          <LoadingSpinner size="lg" />
        </YStack>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <YStack flex={1} alignItems="center" justifyContent="center">
          <ErrorMessage
            message={error}
            onRetry={() => fetchPokemonDetail(pokemonId)}
          />
        </YStack>
      </SafeAreaView>
    );
  }

  if (!pokemon) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView>
        <PokemonDetailHeader pokemon={pokemon} />
        <PokemonBasicInfoSection pokemon={pokemon} />
        <PokemonStatsSection stats={pokemon.stats} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
