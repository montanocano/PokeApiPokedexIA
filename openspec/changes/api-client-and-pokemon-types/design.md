## Context

This is an Expo / React Native project (TypeScript). Currently there is no HTTP client or type layer — `src/shared/api/` exists as a placeholder (`.gitkeep`). All future feature modules (pokemon-list, pokemon-detail, pokemon-favorite) will depend on a centralized API client and shared type definitions.

PokéAPI is a public REST API (`https://pokeapi.co/api/v2/`). No authentication is needed.

`axios` is **not** currently installed. The standard Expo community recommendation is `axios` over the bare `fetch` API because it offers cleaner interceptor support and automatic JSON parsing.

## Goals / Non-Goals

**Goals:**
- Install `axios` and create `src/shared/api/client.ts` with a pre-configured axios instance.
- Define `src/shared/api/types.ts` with all TypeScript interfaces needed to consume PokéAPI endpoints used by this Pokedex app.
- Provide unit tests for the client configuration.

**Non-Goals:**
- Building any feature-level service (e.g., `getPokemonList`) — that belongs in feature modules.
- Supporting authentication or private API endpoints.
- Caching or offline support at this layer.

## Decisions

### 1. Use `axios` over native `fetch`
**Decision**: Install `axios` as the HTTP client.  
**Rationale**: `fetch` lacks built-in request/response interceptors and requires manual JSON parsing. `axios` provides both out of the box, making error-handling interceptors straightforward.  
**Alternative considered**: `fetch` with a thin wrapper — rejected because interceptor patterns are harder to implement and test cleanly.

### 2. Place files in `src/shared/api/`
**Decision**: `src/shared/api/client.ts` and `src/shared/api/types.ts`.  
**Rationale**: The scaffold already created this directory as the shared API layer. Aligns with the existing feature-based folder structure.

### 3. Timeout value: 10 seconds
**Decision**: Default axios timeout of `10000` ms.  
**Rationale**: PokéAPI is a public API with variable latency. 10s is generous enough for slow connections but prevents requests from hanging indefinitely.  
**Alternative considered**: 5s — too tight for slower mobile connections.

### 4. Error interceptor: normalize to a standard error shape
**Decision**: The response error interceptor extracts `error.response.data` when available and rejects with a consistent `ApiError` object.  
**Rationale**: Feature modules should not need to inspect raw axios error internals. A normalized error object keeps error-handling code simple and testable.

### 5. Type guards: implement only for discriminated scenarios
**Decision**: Add type guards only where the same endpoint can return meaningfully different shapes (e.g., paginated list vs. detail). Skip trivial guards.  
**Rationale**: Over-engineering type guards for every interface adds noise. Only add them when a consuming component must branch on type.

## Risks / Trade-offs

- **axios bundle size** → Mitigation: negligible for a React Native app; Expo's Metro bundler tree-shakes unused exports.
- **PokéAPI shape changes** → Mitigation: interfaces are defined against the stable v2 API; breaking changes there are rare and would require a manual update.
- **Interceptor side effects in tests** → Mitigation: export the raw axios instance so tests can override interceptors or use `axios-mock-adapter`.
