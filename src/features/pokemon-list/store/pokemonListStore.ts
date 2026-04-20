import type { PokemonDetailResponse } from "../../../shared/api/types";
import { pokemonListRepositoryImpl } from "../repositories/pokemonListRepositoryImpl";

const PAGE_SIZE = 30;

export interface PokemonListState {
  pokemon: PokemonDetailResponse[];
  offset: number;
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface PokemonListActions {
  loadList: () => Promise<void>;
  loadMore: () => Promise<void>;
  refreshList: () => Promise<void>;
}

export type PokemonListStore = PokemonListState & PokemonListActions;

export const initialState: PokemonListState = {
  pokemon: [],
  offset: 0,
  hasMore: true,
  isLoading: false,
  error: null,
};

async function fetchPage(offset: number): Promise<{
  pokemon: PokemonDetailResponse[];
  hasMore: boolean;
}> {
  const listResponse = await pokemonListRepositoryImpl.fetchPokemonList(
    offset,
    PAGE_SIZE,
  );
  const results = await Promise.allSettled(
    listResponse.results.map((item) =>
      pokemonListRepositoryImpl.fetchPokemonDetail(item.url),
    ),
  );
  const pokemon = results
    .filter(
      (r): r is PromiseFulfilledResult<PokemonDetailResponse> =>
        r.status === "fulfilled",
    )
    .map((r) => r.value);
  return { pokemon, hasMore: listResponse.next !== null };
}

export function createPokemonListActions(
  set: (
    fn: (state: PokemonListStore) => Partial<PokemonListStore>,
  ) => void,
  get: () => PokemonListStore,
): PokemonListActions {
  return {
    loadList: async () => {
      set(() => ({ ...initialState, isLoading: true }));
      try {
        const { pokemon, hasMore } = await fetchPage(0);
        set(() => ({ pokemon, offset: PAGE_SIZE, hasMore, isLoading: false }));
      } catch (e) {
        set(() => ({
          isLoading: false,
          error: e instanceof Error ? e.message : String(e),
        }));
      }
    },

    loadMore: async () => {
      const { isLoading, hasMore, offset } = get();
      if (isLoading || !hasMore) return;
      set(() => ({ isLoading: true, error: null }));
      try {
        const { pokemon: newPokemon, hasMore: more } = await fetchPage(offset);
        set((state) => ({
          pokemon: [...state.pokemon, ...newPokemon],
          offset: offset + PAGE_SIZE,
          hasMore: more,
          isLoading: false,
        }));
      } catch (e) {
        set(() => ({
          isLoading: false,
          error: e instanceof Error ? e.message : String(e),
        }));
      }
    },

    refreshList: async () => {
      set(() => ({ ...initialState, isLoading: true }));
      try {
        const { pokemon, hasMore } = await fetchPage(0);
        set(() => ({ pokemon, offset: PAGE_SIZE, hasMore, isLoading: false }));
      } catch (e) {
        set(() => ({
          isLoading: false,
          error: e instanceof Error ? e.message : String(e),
        }));
      }
    },
  };
}
