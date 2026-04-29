import { useFavoritesStore } from "../store/store";

export function useFavorites() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const isHydrated = useFavoritesStore((state) => state.isHydrated);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite);

  return { favorites, isHydrated, addFavorite, removeFavorite, isFavorite };
}
