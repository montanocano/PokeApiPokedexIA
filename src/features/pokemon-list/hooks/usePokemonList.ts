import { usePokemonListStore } from "../store/store";

export function usePokemonList() {
  const pokemon = usePokemonListStore((s) => s.pokemon);
  const isLoading = usePokemonListStore((s) => s.isLoading);
  const isRefreshing = usePokemonListStore((s) => s.isRefreshing);
  const error = usePokemonListStore((s) => s.error);
  const hasMore = usePokemonListStore((s) => s.hasMore);
  const loadList = usePokemonListStore((s) => s.loadList);
  const loadMore = usePokemonListStore((s) => s.loadMore);
  const refreshList = usePokemonListStore((s) => s.refreshList);

  return {
    pokemon,
    isLoading,
    isRefreshing,
    error,
    hasMore,
    loadList,
    loadMore,
    refreshList,
  };
}
