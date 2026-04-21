import type { PokemonDetailResponse } from "../../../shared/api/types";
import { pokemonListRepositoryImpl } from "../repositories/pokemonListRepositoryImpl";

function extractErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (
    typeof e === "object" &&
    e !== null &&
    "message" in e &&
    typeof (e as Record<string, unknown>).message === "string"
  ) {
    return (e as { message: string }).message;
  }
  return String(e);
}

const PAGE_SIZE = 30;

export interface PokemonListState {
  pokemon: PokemonDetailResponse[];
  offset: number;
  hasMore: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
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
  isRefreshing: false,
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
  set: (fn: (state: PokemonListStore) => Partial<PokemonListStore>) => void,
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
          error: extractErrorMessage(e),
        }));
      }
    },

    loadMore: async () => {
      const { isLoading, isRefreshing, hasMore, offset } = get();
      if (isLoading || isRefreshing || !hasMore) return;
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
          error: extractErrorMessage(e),
        }));
      }
    },

    refreshList: async () => {
      // Use isRefreshing (not isLoading) so the pull-to-refresh spinner is
      // independent from the pagination footer spinner and the loadMore guard.
      set(() => ({ isRefreshing: true, error: null, offset: 0 }));
      try {
        const { pokemon, hasMore } = await fetchPage(0);
        set(() => ({
          pokemon,
          offset: PAGE_SIZE,
          hasMore,
          isRefreshing: false,
        }));
      } catch (e) {
        set(() => ({
          isRefreshing: false,
          error: extractErrorMessage(e),
        }));
      }
    },
  };
}
