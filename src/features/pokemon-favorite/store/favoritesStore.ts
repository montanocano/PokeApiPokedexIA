export interface FavoritesState {
  favorites: number[];
  isHydrated: boolean;
}

export interface FavoritesActions {
  addFavorite(id: number): void;
  removeFavorite(id: number): void;
  isFavorite(id: number): boolean;
  setHydrated(value: boolean): void;
}

export type FavoritesStore = FavoritesState & FavoritesActions;

export const initialState: FavoritesState = {
  favorites: [],
  isHydrated: false,
};

export function createFavoritesActions(
  set: (fn: (state: FavoritesStore) => Partial<FavoritesStore>) => void,
  get: () => FavoritesStore,
): FavoritesActions {
  return {
    addFavorite: (id: number) => {
      set((state) => {
        if (state.favorites.includes(id)) return {};
        return { favorites: [...state.favorites, id] };
      });
    },

    removeFavorite: (id: number) => {
      set((state) => ({
        favorites: state.favorites.filter((fav) => fav !== id),
      }));
    },

    isFavorite: (id: number) => {
      return get().favorites.includes(id);
    },

    setHydrated: (value: boolean) => {
      set(() => ({ isHydrated: value }));
    },
  };
}
