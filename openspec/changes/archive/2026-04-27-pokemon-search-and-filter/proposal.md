## Why

The Pokédex home screen currently displays a full flat list of Pokémon with no way to narrow down results. Users need search-by-name and filter-by-type capabilities so they can quickly find the Pokémon they are looking for without scrolling through hundreds of entries.

## What Changes

- **New**: `SearchBar` component on the home screen — extends `src/shared/ui/components/SearchInput` with 300 ms debounce (via `useSearchFilter` hook) and a clear button, styled with Tamagui.
- **New**: `TypeFilter` component on the home screen — horizontal scrollable chip row showing all Pokémon types using the existing `Chip` component, each chip coloured according to its type; tapping a chip toggles it in or out of the active filter set (multiple chips can be selected simultaneously). Lives in `src/shared/ui/components/TypeFilter/`.
<!-- Fixed: setTypeFilter replaced by toggleTypeFilter; activeTypeFilters is now string[] supporting multi-type AND filtering. -->
- **New**: Zustand store actions in the pokemon-list store for searching by name (`setSearchQuery`), toggling a type filter (`toggleTypeFilter`), clearing all filters (`clearFilters`), and a derived selector that returns the filtered Pokémon list.
- **New**: Combined filter logic that applies all active type filters (AND) and the search query simultaneously, so the two features compose correctly.
- **New**: `useSearchFilter` hook in `src/features/pokemon-list/search-filter/hooks/` encapsulating the 300 ms debounce and store dispatch logic.
- **New**: `filterPokemon` utility in `src/features/pokemon-list/search-filter/utils/` containing the pure filter function used by the selector.

## Capabilities

### New Capabilities

- `search-bar`: Reusable SearchBar component (extending SearchInput) with debounce and clear functionality, connected to the global store via `useSearchFilter`. Lives in `src/shared/ui/components/SearchBar/`.
- `type-filter`: TypeFilter component rendering a horizontal chip row with type-specific colours and multi-selection feedback, connected to the global store. Lives in `src/shared/ui/components/TypeFilter/`.
- `filter-search-actions`: Zustand actions and selector for search-by-name, multi-type toggle filter, clear-filters, and combined AND filtering logic.

### Modified Capabilities

None.

## Impact

- `src/shared/ui/components/` — new `SearchBar/` and `TypeFilter/` components added.
- `src/features/pokemon-list/search-filter/` — new `hooks/useSearchFilter.ts`, `utils/filterPokemon.ts`, and `unit-test/` added.
- `features/pokemon-list/store/` — new actions and selector added to the existing pokemon-list Zustand store.
- `app/(tabs)/index.tsx` — home screen updated to include `SearchBar` and `TypeFilter` above the list.
- No new external dependencies; Tamagui tokens used for styling.
