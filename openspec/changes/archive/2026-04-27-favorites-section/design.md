## Context

The app uses Expo Router v6 with a `(tabs)` group. Currently `app/(tabs)/_layout.tsx` renders a single `Tabs.Screen` for the home Pokémon list. The existing `PokemonCard` and list components live under `features/pokemon-list/` and are already reusable. Tamagui v2 is the UI library; icons come from `@expo/vector-icons`.

## Goals / Non-Goals

**Goals:**
- Add a bottom tab bar with "List" and "Favorites" tabs.
- Create a `favorites` route (`app/(tabs)/favorites.tsx`) that shows the favourited Pokémon.
- Reuse `PokemonCard` and list layout without duplication.
- Cover the new navigation and screen with UI tests.

**Non-Goals:**
- Persisting favourites to storage (handled by the separate *Favorites Persistence* change).
- Changing the visual design of `PokemonCard`.
- Adding search or filter functionality on the Favorites screen.

## Decisions

### 1. Route placement — `app/(tabs)/favorites.tsx`
Expo Router maps file paths to routes, so adding `favorites.tsx` inside the `(tabs)` group automatically registers it as a tab. This keeps routing declarative and avoids manual navigator config.

*Alternative considered*: a separate stack navigator for Favorites — rejected because it would break the flat tab structure the app already uses.

### 2. Reuse list component via a `FavoritesScreen` wrapper
The Favorites screen imports the same `PokemonList` (or equivalent) component used on the home screen and passes it a filtered dataset from the Zustand store. No new list component is created.

*Alternative considered*: copy the list JSX into `favorites.tsx` — rejected due to duplication risk.

### 3. Feature folder follows `pokemon-details` structure
New code lives at `features/favorites-screen/` with `hooks/`, `store/`, and `Unit-test/` sub-folders. This matches the established co-location pattern visible in `pokemon-details`.

### 4. Tab icons
Use `Ionicons` (already available via `@expo/vector-icons`) — `list` icon for the List tab, `heart` icon for the Favorites tab. This avoids adding a new dependency.

## Risks / Trade-offs

- **Favorites data not yet persisted** → The Favorites screen will be empty until the *Favorites Persistence* change is merged. This is intentional; the two changes are designed to be applied in sequence.
- **Icon library version drift** → `@expo/vector-icons` is bundled with Expo SDK 54; no version risk.

## Migration Plan

1. Update `app/(tabs)/_layout.tsx` to add the Favorites tab entry.
2. Create `app/(tabs)/favorites.tsx`.
3. Create `features/favorites-screen/` with hooks and store slice.
4. Write/update UI tests.
5. No rollback complexity — changes are additive and file-based.

## Open Questions

- Should the Favorites tab show an empty-state illustration when no Pokémon are saved? (Assume yes — standard UX; exact asset TBD.)
