## Context

The home screen currently renders a flat list of all Pokémon fetched from PokeAPI. There is no search input or type filter, so users must scroll through the full list. The feature scope from the Trello backlog includes three cards: a Search Component, a Type Filter component, and the underlying Zustand store actions that power both.

The project uses Zustand for global state, Tamagui for UI primitives, and Expo Router for navigation. The existing `pokemon-list` feature folder already contains a Zustand store and a list component.

## Goals / Non-Goals

**Goals:**
- Add a `SearchBar` component (extending `SearchInput`) with `SEARCH_DEBOUNCE_MS` debounce and a clear button.
- Add a `TypeFilter` component with a horizontally scrollable chip row, type-specific colours, and multi-type toggle selection.
<!-- Fixed: setTypeFilter replaced by toggleTypeFilter; activeTypeFilters is now string[] to support multi-type selection, which was promoted from Non-Goal to Goal. -->
- Extend the pokemon-list Zustand store with `setSearchQuery`, `toggleTypeFilter`, `clearFilters` actions, and a `selectFilteredPokemon` selector.
- Compose both filters so name search and type filter apply simultaneously.
- Multi-type selection — multiple type chips can be active at once; a Pokémon must match **all** selected types (AND logic).
- Wire the new components into the home screen above the list.

**Non-Goals:**
- Server-side filtering or pagination — filtering is client-side only against the already-fetched list.
- Persisting filter/search state across app restarts.
- Modifying the Pokemon Detail screen.

## Decisions

### 1 — Filtering in the Zustand store, not in the component

<!-- Fixed: activeTypeFilter renamed to activeTypeFilters (string[]) to support multi-type selection. -->
Keeping `searchQuery` and `activeTypeFilters` as store slices means any component can read the derived list or clear the filters without prop-drilling. The `selectFilteredPokemon` selector runs the combined filter logic in one place.

**Alternatives considered**: Local component state — rejected because `SearchBar` and `TypeFilter` are siblings, so lifting state would require hoisting to the screen level anyway; a store slice is no more complex and is already the project pattern.

### 2 — 300 ms debounce inside `useSearchFilter` hook via `useRef` + `setTimeout`

The Trello card specifies 300 ms debounce. The debounce logic lives in `src/features/pokemon-list/search-filter/hooks/useSearchFilter.ts`, keeping the `SearchBar` component stateless about timing. The hook dispatches `setSearchQuery` only after the user pauses typing. The interval is defined as `SEARCH_DEBOUNCE_MS = 300` in `src/shared/config.ts` and imported — no inline literal.

### 3 — Type colours defined in shared tokens

Pokémon type → colour mappings are stable and small. `TYPE_COLORS` is added to `src/shared/ui/tokens/colors.ts` so any screen (home, detail, favourites) can import it. `TypeFilter` reads from that shared token file for chip background colours, keeping the component stateless about colour decisions.

### 4 — Combined filter logic in the selector

<!-- Fixed: selectFilteredPokemon now passes activeTypeFilters (string[]) to filterPokemon, which uses every() so a Pokémon must have ALL selected types. -->
`selectFilteredPokemon` first filters by active types (if any are selected, a Pokémon must match all of them via AND logic), then filters the result by search query (case-insensitive name match). Order matters: type filter reduces the set, then name search further narrows it. The pure filter function is extracted into `src/features/pokemon-list/search-filter/utils/filterPokemon.ts` and called by the selector, so the logic is unit-testable without a store.

## Risks / Trade-offs

<!-- Fixed: useMemo inside the selector does not work in a Zustand context — the selector runs outside React. The correct pattern is useShallow from zustand/react/shallow, which prevents infinite re-renders caused by the selector returning a new array reference on every call. -->
- **Large list performance** → Filtering runs on every keystroke (after debounce). For the full ~1000 Pokémon list this is a synchronous array filter which is fast enough in JS; `useShallow` in the Zustand hook prevents unnecessary re-renders caused by the selector always returning a new array reference.
- **Type list must be fetched or hardcoded** → Hardcoding the 18 canonical types avoids an extra API call and is acceptable since types are stable across generations covered by the app.
- **Debounce loses the last keystroke if user types fast** → Standard debounce trade-off; 300 ms is the value specified in the Trello card and is a common UX standard.
