## ADDED Requirements

<!-- AGREE: All five requirements are correctly scoped — only fields the planned features actually consume. -->

### Requirement: Pokemon interface
<!-- AGREE: Minimal surface (id, name, sprites, types, stats) avoids false completeness; unused fields like moves/abilities are rightly excluded. -->
The system SHALL define a `Pokemon` TypeScript interface covering all fields returned by the PokéAPI `/pokemon/:id` endpoint that are consumed by this app: `id`, `name`, `sprites`, `types`, and `stats`.

#### Scenario: Pokemon detail response is typed
- **WHEN** a service function receives a response from `/pokemon/:id`
- **THEN** the response MUST be assignable to the `Pokemon` interface without TypeScript errors

### Requirement: PokemonType interface
<!-- AGREE: `slot` carries primary/secondary ordering; the nested `type: { name, url }` matches the exact PokéAPI shape. -->
The system SHALL define a `PokemonType` interface representing an entry in the `types` array of a Pokemon response, including the `slot` number and a nested `type` object with `name` and `url`.

#### Scenario: Type array elements are typed
- **WHEN** code accesses `pokemon.types[0].type.name`
- **THEN** TypeScript SHALL resolve `name` as `string` without requiring a cast

### Requirement: PokemonListResponse interface
<!-- AGREE: Correct four-field envelope. `next` and `previous` should be typed as `string | null` — PokéAPI returns null on boundary pages; the implementation should reflect this. -->
The system SHALL define a `PokemonListResponse` interface matching the paginated list response from `/pokemon`, including `count`, `next`, `previous`, and `results` (array of `{ name: string; url: string }`).

#### Scenario: Paginated list response is typed
- **WHEN** a service function fetches `/pokemon?limit=20&offset=0`
- **THEN** the response MUST be assignable to `PokemonListResponse` without TypeScript errors

### Requirement: PokemonDetailResponse interface
<!-- AGREE: Explicit alias/extension documents intent and guarantees sprites/types/stats are always present without non-null assertions. -->
The system SHALL define a `PokemonDetailResponse` interface as an alias or extension of `Pokemon` that makes explicit which fields are guaranteed present when fetching a single Pokemon by ID.

#### Scenario: Detail response distinguishes from list item
- **WHEN** a component receives a `PokemonDetailResponse`
- **THEN** accessing `sprites`, `types`, and `stats` SHALL not require non-null assertions

### Requirement: Type guards for discriminated response shapes
<!-- AGREE: One guard (`isPokemonListResponse`) is enough. It must use the `value is T` predicate form so TypeScript narrows the type in control flow. -->
The system SHALL provide type guard functions where consuming code must branch between `PokemonListResponse` and `PokemonDetailResponse` at runtime.

#### Scenario: Type guard correctly narrows type
- **WHEN** a type guard function is called with an unknown API response object
- **THEN** returning `true` SHALL narrow the TypeScript type to the expected interface within the `if` block
