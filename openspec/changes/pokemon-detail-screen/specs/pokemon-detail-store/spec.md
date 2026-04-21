## ADDED Requirements

### Requirement: Store exposes selected Pokémon detail state
The Zustand store SHALL expose a `selectedPokemon` field containing the fetched Pokémon detail object, or `null` when no Pokémon has been loaded.

<!-- AGREE: Use `PokemonDetailResponse | null` from `src/shared/api/types.ts`. That type needs `height`, `weight`, `abilities` added first (see design.md). -->

#### Scenario: Initial state has no selected Pokémon
- **WHEN** the store is first initialized
- **THEN** `selectedPokemon` is `null`, `isLoading` is `false`, and `error` is `null`

### Requirement: Fetch Pokémon detail action
The store SHALL expose a `fetchPokemonDetail(id: number)` action that fetches the Pokémon's detail data from the repository, sets `isLoading` to `true` during the request, and stores the result in `selectedPokemon` on success.

<!-- AGREE: Consistent with the list store pattern. Use the same error-handling: `e instanceof Error ? e.message : String(e)`. -->

#### Scenario: Successful fetch
- **WHEN** `fetchPokemonDetail(25)` is dispatched and the repository resolves successfully
- **THEN** `isLoading` becomes `false`, `selectedPokemon` is set to the fetched detail, and `error` is `null`

#### Scenario: Failed fetch
- **WHEN** `fetchPokemonDetail(25)` is dispatched and the repository throws an error
- **THEN** `isLoading` becomes `false`, `selectedPokemon` remains `null`, and `error` contains the error message

### Requirement: Loading state is set during fetch
The store SHALL set `isLoading` to `true` immediately when `fetchPokemonDetail` is called, before the repository request completes.

<!-- AGREE: Same pattern as the list store — `set(() => ({ isLoading: true }))` is the first statement. -->

#### Scenario: Loading flag is true during request
- **WHEN** `fetchPokemonDetail` is called and the repository has not yet responded
- **THEN** `isLoading` is `true`

### Requirement: Clear selected Pokémon action
The store SHALL expose a `clearSelectedPokemon()` action that resets `selectedPokemon` to `null`, `isLoading` to `false`, and `error` to `null`.

<!-- AGREE: Necessary to prevent stale data flashing when navigating to a different Pokémon. -->

#### Scenario: Clearing resets all detail state
- **WHEN** `clearSelectedPokemon()` is dispatched after a successful fetch
- **THEN** `selectedPokemon` is `null`, `isLoading` is `false`, and `error` is `null`

### Requirement: Detail hook encapsulates store access
The `usePokemonDetail` hook SHALL accept a `pokemonId` parameter, dispatch `fetchPokemonDetail` on mount, and return `{ pokemon, isLoading, error }` from the store. It SHALL also call `clearSelectedPokemon` on unmount.

<!-- AGREE: DI (repo as optional param) is a good testability improvement over the existing list hook. Include `pokemonId` in the `useEffect` dependency array so navigating between detail screens re-fetches. -->

#### Scenario: Hook fetches on mount and clears on unmount
- **WHEN** the component using `usePokemonDetail(25)` mounts
- **THEN** `fetchPokemonDetail(25)` is called automatically
- **WHEN** the component unmounts
- **THEN** `clearSelectedPokemon()` is called automatically
