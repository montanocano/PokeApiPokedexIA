import { useEffect } from "react";
import { usePokemonDetailStore } from "../store/store";
import type { DefaultPokemonDetailRepository } from "../repositories/DefaultPokemonDetailRepository";
import { pokemonDetailRepositoryImpl } from "../repositories/pokemonDetailRepositoryImpl";

export function usePokemonDetail(
  pokemonId: number,
  repo: DefaultPokemonDetailRepository = pokemonDetailRepositoryImpl,
) {
  const selectedPokemon = usePokemonDetailStore((s) => s.selectedPokemon);
  const isLoading = usePokemonDetailStore((s) => s.isLoading);
  const error = usePokemonDetailStore((s) => s.error);
  const fetchPokemonDetail = usePokemonDetailStore((s) => s.fetchPokemonDetail);
  const clearSelectedPokemon = usePokemonDetailStore(
    (s) => s.clearSelectedPokemon,
  );

  useEffect(() => {
    fetchPokemonDetail(pokemonId, repo);
    return () => {
      clearSelectedPokemon();
    };
    // repo is stable (default impl object), pokemonId drives re-fetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonId]);

  return { pokemon: selectedPokemon, isLoading, error, fetchPokemonDetail };
}
