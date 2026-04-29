import type { PokemonDetailResponse } from "../../../shared/api/types";
import type { DefaultPokemonDetailRepository } from "../repositories/DefaultPokemonDetailRepository";
import { pokemonDetailRepositoryImpl } from "../repositories/pokemonDetailRepositoryImpl";

export interface PokemonDetailState {
  selectedPokemon: PokemonDetailResponse | null;
  isLoading: boolean;
  error: string | null;
}

export interface PokemonDetailActions {
  fetchPokemonDetail(
    id: number,
    repo?: DefaultPokemonDetailRepository,
  ): Promise<void>;
  clearSelectedPokemon(): void;
}

export type PokemonDetailStore = PokemonDetailState & PokemonDetailActions;

export const initialState: PokemonDetailState = {
  selectedPokemon: null,
  isLoading: false,
  error: null,
};

export function createPokemonDetailActions(
  set: (fn: (state: PokemonDetailStore) => Partial<PokemonDetailStore>) => void,
): PokemonDetailActions {
  return {
    fetchPokemonDetail: async (
      id: number,
      repo: DefaultPokemonDetailRepository = pokemonDetailRepositoryImpl,
    ) => {
      set(() => ({ isLoading: true, error: null }));
      try {
        const pokemon = await repo.fetchPokemonDetail(id);
        set(() => ({
          selectedPokemon: pokemon,
          isLoading: false,
          error: null,
        }));
      } catch (e) {
        set(() => ({
          isLoading: false,
          error: e instanceof Error ? e.message : String(e),
        }));
      }
    },

    clearSelectedPokemon: () => {
      set(() => ({ ...initialState }));
    },
  };
}
