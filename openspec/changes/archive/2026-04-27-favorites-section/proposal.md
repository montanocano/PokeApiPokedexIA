## Why

The app currently has a single tab showing the full Pokémon list but no way for users to save or revisit their favourite Pokémon. Adding a Favorites tab gives users a dedicated place to find Pokémon they care about without scrolling the full list.

## What Changes

- Add a bottom navigation bar with two tabs: **List** (existing Pokédex screen) and **Favorites** (new screen).
- Add a new `favorites` route under `app/(tabs)/` for the Favorites screen.
- Create a `favorites-screen` feature folder (`features/favorites-screen/`) following the co-location structure used by `pokemon-details`.
- Reuse the existing `PokemonCard` and list layout components to display the user's saved Pokémon on the Favorites screen.
- Add UI tests covering the updated navigation and the Favorites screen.

## Capabilities

### New Capabilities

- `favorites-screen`: Dedicated tab screen that renders the list of favourited Pokémon using the existing list/card components.
- `bottom-tab-navigation`: Bottom tab bar with "List" and "Favorites" tabs wired to their respective routes.

### Modified Capabilities

- `home-screen`: Tab label updated to "List"; tab bar is now always visible (previously hidden).

## Impact

- `app/(tabs)/_layout.tsx` — add Favorites tab entry and tab bar icons.
- `app/(tabs)/favorites.tsx` — new screen file.
- `features/favorites-screen/` — new feature folder (hooks, store, Unit-test sub-folders).
- Existing `PokemonCard` and list components are reused without modification.
- No API or backend changes required.
