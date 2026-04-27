## ADDED Requirements

### Requirement: Repository interface for Pokemon list
The system SHALL define a `DefaultPokemonRepository` interface in `src/features/pokemon-list/repositories/DefaultPokemonRepository.ts` declaring `fetchPokemonList(offset: number, limit: number): Promise<PokemonListResponse>` and `fetchPokemonDetail(url: string): Promise<PokemonDetailResponse>`.

#### Scenario: Interface contract is typed
- **WHEN** a new repository implementation is created
- **THEN** TypeScript SHALL enforce that both methods are implemented with the correct signatures

### Requirement: Fetch paginated Pokemon list
The system SHALL provide `fetchPokemonList(offset: number, limit: number)` in `pokemonListRepositoryImpl.ts` that calls the HTTP client's `GET /pokemon` endpoint and returns a typed `PokemonListResponse`.

#### Scenario: Successful list fetch
- **WHEN** `fetchPokemonList(0, 20)` is called
- **THEN** the function SHALL return a `PokemonListResponse` with `count`, `next`, `previous`, and `results` populated

#### Scenario: API error during list fetch
- **WHEN** the HTTP client rejects with an `ApiError`
- **THEN** `fetchPokemonList` SHALL propagate the error to the caller without swallowing it

### Requirement: Fetch Pokemon detail by URL
<!-- FIXED: The original implementation passed the full absolute URL directly to `client.get()`, which bypassed the axios `baseURL` abstraction. Fixed by stripping `API_BASE_URL` from the full URL before calling the client, so the client always receives a relative path consistent with its configuration. -->
The system SHALL provide `fetchPokemonDetail(url: string)` in `pokemonListRepositoryImpl.ts` that strips the `API_BASE_URL` prefix from the incoming URL and calls the HTTP client with the resulting relative path, returning a typed `PokemonDetailResponse` containing `id`, `name`, `sprites`, `types`, and `stats`.

#### Scenario: Successful detail fetch
- **WHEN** `fetchPokemonDetail('https://pokeapi.co/api/v2/pokemon/1/')` is called
- **THEN** the function SHALL return a `PokemonDetailResponse` with `sprites.front_default`, `types`, and `stats` present

#### Scenario: Network error during detail fetch
- **WHEN** the HTTP client rejects with an `ApiError` whose `status` is `0`
- **THEN** `fetchPokemonDetail` SHALL propagate the `ApiError` to the caller

### Requirement: E2E test for PokeAPI endpoints
The system SHALL include at least one E2E test in `src/features/pokemon-list/Unit-test/`, marked with `@group e2e` to allow skipping in offline CI, that makes a real HTTP request to the PokéAPI and validates the response shape matches the expected TypeScript interfaces.

#### Scenario: E2E list endpoint validation
- **WHEN** the E2E test calls `fetchPokemonList(0, 5)` against the live PokéAPI
- **THEN** the response SHALL be assignable to `PokemonListResponse` and contain exactly 5 results
