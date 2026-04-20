## ADDED Requirements

### Requirement: Pokemon interface
The system SHALL define a `Pokemon` TypeScript interface covering all fields returned by the PokéAPI `/pokemon/:id` endpoint that are consumed by this app: `id`, `name`, `sprites`, `types`, and `stats`.

#### Scenario: Pokemon detail response is typed
- **WHEN** a service function receives a response from `/pokemon/:id`
- **THEN** the response MUST be assignable to the `Pokemon` interface without TypeScript errors

### Requirement: PokemonType interface
The system SHALL define a `PokemonType` interface representing an entry in the `types` array of a Pokemon response, including the `slot` number and a nested `type` object with `name` and `url`.

#### Scenario: Type array elements are typed
- **WHEN** code accesses `pokemon.types[0].type.name`
- **THEN** TypeScript SHALL resolve `name` as `string` without requiring a cast

### Requirement: PokemonListResponse interface
The system SHALL define a `PokemonListResponse` interface matching the paginated list response from `/pokemon`, including `count`, `next`, `previous`, and `results` (array of `{ name: string; url: string }`).

#### Scenario: Paginated list response is typed
- **WHEN** a service function fetches `/pokemon?limit=20&offset=0`
- **THEN** the response MUST be assignable to `PokemonListResponse` without TypeScript errors

### Requirement: PokemonDetailResponse interface
The system SHALL define a `PokemonDetailResponse` interface as an alias or extension of `Pokemon` that makes explicit which fields are guaranteed present when fetching a single Pokemon by ID.

#### Scenario: Detail response distinguishes from list item
- **WHEN** a component receives a `PokemonDetailResponse`
- **THEN** accessing `sprites`, `types`, and `stats` SHALL not require non-null assertions

### Requirement: Type guards for discriminated response shapes
The system SHALL provide type guard functions where consuming code must branch between `PokemonListResponse` and `PokemonDetailResponse` at runtime.

#### Scenario: Type guard correctly narrows type
- **WHEN** a type guard function is called with an unknown API response object
- **THEN** returning `true` SHALL narrow the TypeScript type to the expected interface within the `if` block
