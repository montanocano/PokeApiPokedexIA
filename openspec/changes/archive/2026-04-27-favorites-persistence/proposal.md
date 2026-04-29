## Why

Without persistent storage, any Pokémon a user marks as a favourite is lost when the app closes. Adding a Zustand-backed favorites store with `AsyncStorage` persistence ensures favourites survive app restarts and gives the Favorites screen real data to display.

## What Changes

- Add a `favorites` slice to the global Zustand store holding an array of favourited Pokémon IDs.
- Implement `addFavorite(id)` and `removeFavorite(id)` actions.
- Persist the favorites slice with `zustand/middleware`'s `persist` adapter backed by `AsyncStorage`.
- Hydrate (load) the persisted state on app startup automatically via the middleware.
- Create a `FavoriteButton` component (heart icon toggle) that any screen can attach to a `PokemonCard`.
- Place all new code inside `features/favorites-persistence/` following the `hooks/`, `repositories/`, `store/`, `Unit-test/`, `utils/` co-location structure.

## Capabilities

### New Capabilities

- `favorites-store`: Zustand slice for favorites state with add/remove actions and AsyncStorage persistence.
- `favorite-button`: UI component (heart icon toggle) that reads and writes the favorites store.

### Modified Capabilities

_(none — no existing spec-level behavior changes)_

## Impact

- `features/favorites-persistence/store/favoritesStore.ts` — new Zustand slice.
- `features/favorites-persistence/hooks/useFavorites.ts` — hook exposing favorites state and actions.
- `features/favorites-persistence/components/FavoriteButton.tsx` — new toggle component.
- `features/favorites-section/hooks/useFavorites.ts` — will import from the persistence store once this change is applied.
- Adds `@react-native-async-storage/async-storage` dependency (already bundled with Expo SDK 54).
- No API or backend changes.
