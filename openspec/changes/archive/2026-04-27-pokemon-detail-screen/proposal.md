## Why

The Pokédex app currently has a home screen listing Pokémon but no detail screen, leaving users unable to explore individual Pokémon stats, abilities, or visual identity. This change delivers the full Pokémon detail experience required to make the app useful.

## What Changes

- Add Expo Router routes connecting `HomeScreen` → `DetailScreen` with `pokemonId` as a parameter
- Create a Zustand store slice for fetching and clearing the selected Pokémon's details, including loading and error state
- Build the `DetailScreen` composed of:
  - A header with a large Pokémon image, type-based solid color background, name, Pokédex number, and type chips
  - A basic info section displaying height, weight, and abilities as cards with representative icons
  - A base stats section with HP, Attack, Defense, Sp. Atk, Sp. Def, and Speed rendered as labeled progress bars (color-coded by value) plus a total
  - Loading spinner and error message with retry button for all async states

<!-- FIXED: Changed "gradient background" to "solid color background" to match design.md Decision 4. -->

## Capabilities

### New Capabilities

- `pokemon-detail-navigation`: Expo Router route configuration connecting HomeScreen to DetailScreen, custom header options, and pokemonId param passing
- `pokemon-detail-store`: Zustand actions — fetch Pokémon details, clear selected Pokémon, loading/error state management
- `pokemon-detail-screen`: Full DetailScreen UI — layout, header with image and type background, basic info section, base stats section, loading and error states

### Modified Capabilities

- `shared/api/types.ts` — extend `Pokemon` interface with `height`, `weight`, and `abilities` fields required by the basic info section

<!-- FIXED: Added the missing modified capability for `shared/api/types.ts`. Without extending the type, the basic info section won't compile under strict mode. -->

## Impact

- `app/` — new `detail/[id].tsx` route file
- `src/features/pokemon-detail/` — new hooks, store slice, repository, utils, and UI components following the existing feature folder convention
- `src/features/pokemon-detail/store/` — new standalone Zustand detail store
- No breaking changes to existing HomeScreen or list store
