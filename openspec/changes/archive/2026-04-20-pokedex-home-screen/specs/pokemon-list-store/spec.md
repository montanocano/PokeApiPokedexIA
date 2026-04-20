## ADDED Requirements

### Requirement: Pokemon list store state shape
The system SHALL define the store state in `src/features/pokemon-list/store/pokemonListStore.ts` with fields: `pokemon` (array of `PokemonDetailResponse`), `offset` (number), `hasMore` (boolean), `isLoading` (boolean), and `error` (string or null). The Zustand store instance SHALL be created and exported from `store/store.ts` as `usePokemonListStore`.

#### Scenario: Initial store state
- **WHEN** the store is accessed before any action is dispatched
- **THEN** `pokemon` SHALL be an empty array, `offset` SHALL be `0`, `hasMore` SHALL be `true`, `isLoading` SHALL be `false`, and `error` SHALL be `null`

### Requirement: usePokemonList hook
The system SHALL provide `src/features/pokemon-list/hooks/usePokemonList.ts` that wraps `usePokemonListStore` and exposes `pokemon`, `isLoading`, `error`, `hasMore`, `loadList`, `loadMore`, and `refreshList` as a single hook. The home screen SHALL import only this hook, not the store directly.

#### Scenario: Hook exposes store state and actions
- **WHEN** a component calls `usePokemonList()`
- **THEN** it SHALL receive all necessary state fields and action functions without importing the store directly

### Requirement: Load list action
The system SHALL expose a `loadList()` action that resets the store state and fetches the first page of Pokemon (offset 0, limit 30), fanning out detail requests via `Promise.allSettled`, and storing only the fulfilled results.

#### Scenario: Successful initial load
- **WHEN** `loadList()` is called on a fresh or refreshed store
- **THEN** `isLoading` SHALL be `true` during the fetch, and upon completion `pokemon` SHALL contain up to 20 items and `offset` SHALL be `30`

#### Scenario: Load list sets hasMore correctly
- **WHEN** the PokéAPI `next` field is non-null after the first page
- **THEN** `hasMore` SHALL be `true`; if `next` is null, `hasMore` SHALL be `false`

#### Scenario: Load list handles API error
- **WHEN** the service call rejects
- **THEN** `isLoading` SHALL be `false` and `error` SHALL contain the error message string

### Requirement: Load more action
The system SHALL expose a `loadMore()` action that appends the next page of Pokemon to the existing list using the current `offset`, and increments `offset` by the page size.

#### Scenario: Successful load more
- **WHEN** `loadMore()` is called and `hasMore` is `true` and `isLoading` is `false`
- **THEN** the new Pokemon SHALL be appended to `pokemon` and `offset` SHALL increase by 30

#### Scenario: Prevent concurrent fetches
- **WHEN** `loadMore()` is called while `isLoading` is `true`
- **THEN** the action SHALL return early without making a new network request

#### Scenario: No-op when no more pages
- **WHEN** `loadMore()` is called and `hasMore` is `false`
- **THEN** the action SHALL return early without making a network request

### Requirement: Refresh list action
The system SHALL expose a `refreshList()` action that resets `offset` to `0`, clears `pokemon`, and re-fetches the first page.

#### Scenario: Successful refresh
- **WHEN** `refreshList()` is called after the list has items
- **THEN** `pokemon` SHALL be replaced with a fresh first page and `offset` SHALL be `30`

### Requirement: Unit tests for store actions
The system SHALL include unit tests in `src/features/pokemon-list/Unit-test/` that mock the repository layer and assert on state transitions including loading, success, and error paths for `loadList`, `loadMore`, and `refreshList`.

#### Scenario: State transitions are testable in isolation
- **WHEN** unit tests mock `fetchPokemonList` and `fetchPokemonDetail`
- **THEN** tests SHALL assert `isLoading` transitions and final `pokemon` array length without real network calls
