## 1. Store — Filter & Search Actions

<!-- Fixed: activeTypeFilter: string | null changed to activeTypeFilters: string[] to support multi-type selection. -->
- [x] 1.1 Add `searchQuery: string` and `activeTypeFilters: string[]` state fields to the pokemon-list Zustand store
- [x] 1.2 Implement `setSearchQuery(query: string)` action in the store
<!-- Fixed: setTypeFilter(type: string | null) replaced by toggleTypeFilter(type: string) — adds the type if absent, removes it if present. -->
- [x] 1.3 Implement `toggleTypeFilter(type: string)` action in the store
<!-- Fixed: clearFilters now resets activeTypeFilters to [] instead of null. -->
- [x] 1.4 Implement `clearFilters()` action that resets `searchQuery` to `""` and `activeTypeFilters` to `[]` in one update
<!-- Fixed: selectFilteredPokemon passes activeTypeFilters (string[]) to filterPokemon, which uses every() for AND logic. -->
- [x] 1.5 Implement `selectFilteredPokemon` selector with combined filter logic (all active types via AND first, then name substring); delegate to `filterPokemon` util
<!-- Fixed: filterPokemon signature updated from (list, query, type: string | null) to (list, query, types: string[]) to support multi-type AND filtering. -->
- [x] 1.6 Create `src/features/pokemon-list/search-filter/utils/filterPokemon.ts` exporting the pure `filterPokemon(list, query, types: string[])` function used by the selector

## 2. Type Colors Constant

- [x] 2.1 Add `TYPE_COLORS` record (18 canonical Pokémon types → hex colour strings) to `src/shared/ui/tokens/colors.ts`
- [x] 2.2 Add `SEARCH_DEBOUNCE_MS = 300` as a named constant to `src/shared/config.ts`

## 3. TypeFilter Component

- [x] 3.1 Create `src/shared/ui/components/TypeFilter/index.tsx` with a horizontal ScrollView rendering all 18 type chips using the existing `Chip` component
- [x] 3.2 Apply `TYPE_COLORS` from `src/shared/ui/tokens/colors.ts` as chip background colours using Tamagui tokens
<!-- Fixed: setTypeFilter replaced by toggleTypeFilter; selected prop now checks activeTypeFilters.includes(type) to support multi-selection. -->
- [x] 3.3 Connect to store: read `activeTypeFilters`, dispatch `toggleTypeFilter(type)` on chip tap
- [x] 3.4 Add visual selection feedback for active chips (border or elevated style); multiple chips can be highlighted simultaneously

## 4. SearchBar Component

- [x] 4.1 Extend `src/shared/ui/components/SearchInput/index.tsx` with a `showClearButton` prop, or create `src/shared/ui/components/SearchBar/index.tsx` wrapping `SearchInput` if the extension would complicate the base component
- [x] 4.2 Show a clear button when input is non-empty; tapping it dispatches `setSearchQuery("")` and clears local input
- [x] 4.3 Create `src/features/pokemon-list/search-filter/hooks/useSearchFilter.ts` implementing the `SEARCH_DEBOUNCE_MS` debounce via `useRef` + `setTimeout` and dispatching `setSearchQuery`
- [x] 4.4 Wire `useSearchFilter` into the SearchBar component — component calls the hook, hook owns the debounce and dispatch

## 5. Home Screen Integration

- [x] 5.1 Import and place `SearchBar` above the Pokémon list in `app/(tabs)/index.tsx`
- [x] 5.2 Import and place `TypeFilter` between `SearchBar` and the list
<!-- Fixed: useShallow(selectFilteredPokemon) used instead of plain selectFilteredPokemon to prevent infinite re-renders caused by the selector always returning a new array reference. -->
- [x] 5.3 Update the list component to consume `useShallow(selectFilteredPokemon)` instead of the raw list

## 6. Tests

<!-- Fixed: toggleTypeFilter replaces setTypeFilter in test descriptions. -->
- [x] 6.1 Write unit tests for `setSearchQuery`, `toggleTypeFilter`, and `clearFilters` store actions in `src/features/pokemon-list/search-filter/unit-test/searchFilterStore.test.ts`
- [x] 6.2 Write unit tests for `selectFilteredPokemon` covering: no filters, name-only, single-type, two-type AND combination, and combined type+name scenarios
- [x] 6.3 Write unit tests for `useSearchFilter` hook in `src/features/pokemon-list/search-filter/unit-test/useSearchFilter.test.ts` verifying debounce dispatch behaviour
- [x] 6.4 Run the full test suite and ensure all existing and new tests pass
