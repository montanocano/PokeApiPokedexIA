## 1. Store Setup

- [x] 1.1 Create `src/features/pokemon-favorite/store/favoritesStore.ts` defining `FavoritesState`, `FavoritesActions`, and `FavoritesStore` types
- [x] 1.2 Implement `addFavorite(id)`, `removeFavorite(id)`, and `isFavorite(id)` actions in the store slice
- [x] 1.3 Wrap the store with Zustand `persist` middleware using `AsyncStorage` and storage key `pokedex/favorites`
- [x] 1.4 Expose `isHydrated` boolean via `onRehydrateStorage` callback
- [x] 1.5 Create `src/features/pokemon-favorite/store/store.ts` that instantiates the Zustand store with the slice

## 2. Hook

- [x] 2.1 Create `src/features/pokemon-favorite/hooks/useFavorites.ts` that selects `favorites`, `isHydrated`, `addFavorite`, `removeFavorite`, and `isFavorite` from the store

## 3. FavoriteButton Component

- [x] 3.1 Create `src/features/pokemon-favorite/components/FavoriteButton.tsx`
- [x] 3.2 Render filled `heart` Ionicon when `isFavorite(id)` is `true`, outlined `heart-outline` when `false`
- [x] 3.3 On press, call `addFavorite(id)` or `removeFavorite(id)` accordingly
- [x] 3.4 Set `accessibilityLabel` to `"Add to favorites"` or `"Remove from favorites"` based on current state

## 4. Tests

- [x] 4.1 Create `src/features/pokemon-favorite/Unit-test/favoritesStore.test.ts` — test add, remove, and isFavorite actions
- [x] 4.2 Create `src/features/pokemon-favorite/Unit-test/useFavorites.test.ts` — test hook selectors
- [x] 4.3 Create `src/features/pokemon-favorite/Unit-test/FavoriteButton.test.ts` — test toggle behavior and accessibility labels
- [x] 4.4 Mock `AsyncStorage` in all store tests using `@react-native-async-storage/async-storage/jest/async-storage-mock`
