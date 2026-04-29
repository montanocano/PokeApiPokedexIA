import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initialState,
  createFavoritesActions,
  type FavoritesStore,
} from "./favoritesStore";

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      ...createFavoritesActions(
        set as (fn: (state: FavoritesStore) => Partial<FavoritesStore>) => void,
        get,
      ),
    }),
    {
      name: "pokedex/favorites",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ favorites: state.favorites }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true);
        }
      },
    },
  ),
);
