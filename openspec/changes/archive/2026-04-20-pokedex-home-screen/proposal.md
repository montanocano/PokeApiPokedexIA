## Why

The app has no visible UI yet — users cannot browse Pokémon. This change delivers the complete Pokédex home screen: a scrollable, infinitely-paginated list of Pokémon cards driven by the PokeAPI, with global state managed by Zustand and tab-based navigation.

## What Changes

- New repository layer (`repositories/`) with `DefaultPokemonRepository.ts` (interface) and `pokemonListRepositoryImpl.ts` (implementation) to fetch the Pokémon list and detail data from the PokeAPI, including error handling.
- New Zustand store (`store/pokemonListStore.ts` + `store/store.ts`) with actions: load list, load more Pokémon, refresh list, and loading/error state management.
- New hook `hooks/usePokemonList.ts` that connects the store to the UI, exposing state and actions to the home screen.
- New `PokemonCard` component at `src/shared/ui/components/PokemonCard/` displaying sprite image, capitalized name, Pokédex number, type badges with colors, and shadow/press effects — composing the existing `Card` and `Chip` shared components.
- New tabs layout (`app/(tabs)/_layout.tsx`) introducing tab-based navigation.
- New Home Screen (`app/(tabs)/index.tsx`) with SafeAreaView, a "Pokédex" header, and a `FlatList` wired to infinite scroll via `onEndReached`.
- Infinite pagination: more Pokémon are fetched automatically as the user nears the bottom of the list, with a footer loading spinner and duplicate-call prevention.

## Capabilities

### New Capabilities

- `pokemon-list-service`: PokeAPI repository layer — fetch paginated Pokémon list, fetch Pokémon detail by URL, and centralised error handling.
- `pokemon-list-store`: Zustand store actions and state for the Pokémon list (load, load-more, refresh, loading/error flags) plus a `usePokemonList` hook.
- `pokemon-card`: Reusable `PokemonCard` UI component with sprite, name, number, type badges, and interaction effects.
- `home-screen`: Tabs layout and home screen with header, SafeAreaView, and infinite-scroll `FlatList`.

### Modified Capabilities

- `pokemon-types`: The existing types spec will be referenced by the repository and card components; no requirement changes needed.

## Impact

- **New files**:
  - `src/features/pokemon-list/repositories/DefaultPokemonRepository.ts`
  - `src/features/pokemon-list/repositories/pokemonListRepositoryImpl.ts`
  - `src/features/pokemon-list/store/pokemonListStore.ts`
  - `src/features/pokemon-list/store/store.ts`
  - `src/features/pokemon-list/hooks/usePokemonList.ts`
  - `src/features/pokemon-list/Unit-test/pokemonListStore.test.ts`
  - `src/features/pokemon-list/Unit-test/pokemonListRepositoryImpl.e2e.test.ts`
  - `src/shared/ui/components/PokemonCard/index.tsx`
  - `app/(tabs)/_layout.tsx`
  - `app/(tabs)/index.tsx`
- **Dependencies**: Existing `http-client` spec consumed by the repository layer. Zustand must be installed (`npm install zustand`).
- **Testing**: E2E test to validate PokeAPI endpoint; unit tests for Zustand store actions.
