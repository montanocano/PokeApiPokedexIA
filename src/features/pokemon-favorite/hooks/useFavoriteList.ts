import { useShallow } from "zustand/react/shallow";
import { useFavoritesStore } from "../store/store";
import { usePokemonListStore } from "../../pokemon-list/store/store";
import type { PokemonDetailResponse } from "../../../shared/api/types";

export function useFavoriteList(): {
  favoritePokemon: PokemonDetailResponse[];
  isHydrated: boolean;
} {
  const favorites = useFavoritesStore((state) => state.favorites);
  const isHydrated = useFavoritesStore((state) => state.isHydrated);
  const allPokemon = usePokemonListStore(useShallow((state) => state.pokemon));

  const favoritePokemon = allPokemon.filter((p) => favorites.includes(p.id));

  return { favoritePokemon, isHydrated };
}
