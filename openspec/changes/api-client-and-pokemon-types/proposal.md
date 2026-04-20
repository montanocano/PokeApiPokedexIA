## Why

The project needs a reusable HTTP client layer and well-defined TypeScript types to interact with PokéAPI reliably. Without these foundations, every feature that consumes API data must implement its own fetch logic and operate on untyped responses, causing inconsistency and runtime errors.

## What Changes

- Create `src/api/client.ts`: an axios instance pre-configured with PokéAPI's baseURL, request/response interceptors for error handling, and a default timeout.
- Create `src/api/types.ts`: TypeScript interfaces covering the full shape of PokéAPI responses (`Pokemon`, `PokemonType`, `PokemonListResponse`, `PokemonDetailResponse`) plus type guards where needed.
- Add unit tests for the HTTP client configuration.

## Capabilities

### New Capabilities

- `http-client`: Reusable axios-based HTTP client configured for PokéAPI with baseURL, timeout, and error interceptors.
- `pokemon-types`: TypeScript type definitions for all PokéAPI response shapes consumed by the Pokedex app.

### Modified Capabilities

<!-- None -->

## Impact

- New files: `src/api/client.ts`, `src/api/types.ts`, and their corresponding test files.
- All future API service modules will import from these two files.
- No breaking changes — these are net-new additions.
- Dependency: `axios` must be available (assumed already in project).
