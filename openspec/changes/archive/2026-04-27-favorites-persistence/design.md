## Context

The project uses Zustand for global state management, following a slice pattern visible in `src/features/pokemon-detail/store/`. A `pokemon-favorite` feature folder already exists at `src/features/pokemon-favorite/` (currently empty with a `.gitkeep`). `@react-native-async-storage/async-storage` ships with Expo SDK 54 and requires no additional installation.

## Goals / Non-Goals

**Goals:**
- Add a `favorites` Zustand store slice with `addFavorite` / `removeFavorite` / `isFavorite` actions.
- Persist the slice automatically via the Zustand `persist` middleware backed by `AsyncStorage`.
- Hydrate state on app startup with zero manual calls.
- Create a `FavoriteButton` component (heart icon) that any screen can embed next to a `PokemonCard`.
- Follow the `pokemon-detail` co-location pattern: `store/`, `hooks/`, `repositories/`, `Unit-test/`, `utils/`.

**Non-Goals:**
- Syncing favourites to a remote server or user account.
- Migrating existing persisted data (no prior format exists).
- Changing the visual design of `PokemonCard` itself.

## Decisions

### 1. Use Zustand `persist` middleware with `AsyncStorage`
Zustand's built-in `persist` middleware serialises state to a storage backend automatically. Pairing it with `AsyncStorage` (already available in Expo) gives us persistence with minimal boilerplate.

*Alternative considered*: manually saving to `AsyncStorage` in each action — rejected because it duplicates serialisation logic and is error-prone.

### 2. Store only Pokémon IDs (not full objects)
The favorites slice stores `Set<number>` (serialised as an array) of Pokémon IDs. Full Pokémon objects are re-fetched from the list store when needed.

*Alternative considered*: storing full `PokemonListItem` objects — rejected to avoid stale cached data and storage bloat.

### 3. Place code in existing `src/features/pokemon-favorite/`
The folder was pre-created in the repo, signalling intent. We populate it following the same `store/`, `hooks/`, `Unit-test/` sub-folder structure used by `pokemon-detail`.

### 4. `FavoriteButton` as a standalone component under `pokemon-favorite/components/`
This keeps the toggle UI co-located with the persistence feature and reusable from any screen (home, detail, favorites).

*Alternative considered*: embedding the button inside `PokemonCard` — rejected because it creates coupling between the card component and the favorites feature.

## Risks / Trade-offs

- **AsyncStorage is async, but Zustand `persist` hydration is async** → The app must handle a brief window on startup where `favorites` is an empty array before hydration completes. The `useFavorites` hook SHALL expose a `isHydrated` flag so screens can defer rendering until ready.
- **Storage key collisions** → Use a namespaced key (`pokedex/favorites`) to avoid clashes with other persisted stores added later.

## Migration Plan

1. Populate `src/features/pokemon-favorite/store/` with the favorites slice and Zustand store.
2. Create `src/features/pokemon-favorite/hooks/useFavorites.ts`.
3. Create `src/features/pokemon-favorite/components/FavoriteButton.tsx`.
4. Wire the `FavoriteButton` into the Favorites screen and/or `PokemonCard` as needed.
5. Write unit tests under `src/features/pokemon-favorite/Unit-test/`.
6. No rollback steps — the store is additive; removing the slice is a one-line change.

## Open Questions

- Should `isFavorite` be exposed as a selector or computed inside `useFavorites`? (Assume selector inside the hook for now.)
