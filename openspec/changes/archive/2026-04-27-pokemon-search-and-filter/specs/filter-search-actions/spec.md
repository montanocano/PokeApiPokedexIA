## ADDED Requirements

### Requirement: Store exposes setSearchQuery action
The pokemon-list Zustand store SHALL expose a `setSearchQuery(query: string)` action that stores the current search string.

#### Scenario: Search query is saved in store
- **WHEN** `setSearchQuery("bulba")` is called
- **THEN** the store's `searchQuery` state equals `"bulba"`

<!-- Fixed: setTypeFilter(string | null) replaced by toggleTypeFilter(string); activeTypeFilter: string | null replaced by activeTypeFilters: string[] to support multi-type selection. -->
### Requirement: Store exposes toggleTypeFilter action
The pokemon-list Zustand store SHALL expose a `toggleTypeFilter(type: string)` action that adds the type to `activeTypeFilters` if not present, or removes it if already present.

#### Scenario: Type filter is added to the set
- **WHEN** `toggleTypeFilter("fire")` is called with no active filters
- **THEN** the store's `activeTypeFilters` state equals `["fire"]`

#### Scenario: A second type is accumulated
- **WHEN** `toggleTypeFilter("fire")` is called and then `toggleTypeFilter("flying")` is called
- **THEN** the store's `activeTypeFilters` state equals `["fire", "flying"]`

#### Scenario: Type filter is removed when toggled again
- **WHEN** `toggleTypeFilter("fire")` is called twice
- **THEN** the store's `activeTypeFilters` state equals `[]`

### Requirement: Store exposes clearFilters action
<!-- Fixed: clearFilters now resets activeTypeFilters to [] instead of null, matching the string[] type. -->
The pokemon-list Zustand store SHALL expose a `clearFilters()` action that resets both `searchQuery` to `""` and `activeTypeFilters` to `[]` in a single update.

#### Scenario: Both filters are reset together
- **WHEN** `clearFilters()` is called after setting a query and type filters
- **THEN** `searchQuery` equals `""` and `activeTypeFilters` equals `[]`

### Requirement: selectFilteredPokemon selector returns combined-filtered list
<!-- Fixed: Selector now passes activeTypeFilters (string[]) to filterPokemon, which uses every() — a Pokémon must have ALL selected types. -->
The `selectFilteredPokemon` selector SHALL return the Pokémon list filtered by `activeTypeFilters` first (a Pokémon must match **all** active types via AND logic), then by `searchQuery` (case-insensitive name match). If neither filter is active it SHALL return the full list. The selector SHALL delegate the pure filter logic to `filterPokemon(list, query, types)` in `src/features/pokemon-list/search-filter/utils/filterPokemon.ts`.

#### Scenario: No active filters returns full list
- **WHEN** `searchQuery` is `""` and `activeTypeFilters` is `[]`
- **THEN** `selectFilteredPokemon` returns all Pokémon in the store

#### Scenario: Name search filters by name substring
- **WHEN** `searchQuery` is `"char"` and `activeTypeFilters` is `[]`
- **THEN** `selectFilteredPokemon` returns only Pokémon whose names contain `"char"` (case-insensitive)

#### Scenario: Single type filter filters by type
- **WHEN** `activeTypeFilters` is `["fire"]` and `searchQuery` is `""`
- **THEN** `selectFilteredPokemon` returns only Pokémon that have the `fire` type

#### Scenario: Two type filters return only Pokémon with both types
- **WHEN** `activeTypeFilters` is `["fire", "flying"]` and `searchQuery` is `""`
- **THEN** `selectFilteredPokemon` returns only Pokémon that have both `fire` and `flying` types

#### Scenario: Combined filters apply all criteria
- **WHEN** `activeTypeFilters` is `["fire"]` and `searchQuery` is `"char"`
- **THEN** `selectFilteredPokemon` returns only Pokémon that have the `fire` type AND whose name contains `"char"`

### Requirement: Store actions are covered by unit tests
The `setSearchQuery`, `toggleTypeFilter`, `clearFilters` actions and the `selectFilteredPokemon` selector SHALL each have at least one unit test in `src/features/pokemon-list/search-filter/unit-test/searchFilterStore.test.ts` verifying the expected state transition or return value.

#### Scenario: Updated store tests pass
- **WHEN** the test suite for the pokemon-list store is run
- **THEN** all tests for the new actions and selector pass without errors
