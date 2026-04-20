## Context

The app currently has an HTTP client (axios, base URL, timeout, error interceptor) and Pokemon TypeScript types, but no repository layer, no state management, and no visible UI. This change wires everything together to deliver the first user-facing screen: an infinite-scroll Pokédex list.

The feature follows the established `src/features/pokemon-list/` scaffold:
```
src/features/pokemon-list/
├── hooks/
│   └── usePokemonList.ts
├── repositories/
│   ├── DefaultPokemonRepository.ts
│   └── pokemonListRepositoryImpl.ts
├── store/
│   ├── pokemonListStore.ts
│   └── store.ts
└── Unit-test/
    ├── pokemonListStore.test.ts
    └── pokemonListRepositoryImpl.e2e.test.ts
```

## Goals / Non-Goals

**Goals:**
- Repository layer that wraps the HTTP client and returns typed responses.
- Zustand store that owns all list state (items, pagination cursor, loading/error flags) and exposes three async actions.
- `usePokemonList` hook as the single interface the UI uses to access store state and actions.
- `PokemonCard` component as a pure, reusable presentational component composing existing `Card` and `Chip` shared components.
- Home screen that composes the hook and the card into a working `FlatList` with infinite scroll.
- E2E test covering the PokeAPI endpoint; unit tests for Zustand actions.

**Non-Goals:**
- Pokemon detail screen (separate card).
- Search / filter UI.
- Favourites persistence.
- Offline caching.

## Decisions

### 1 — Repository pattern for the data layer
Two files: `DefaultPokemonRepository.ts` (interface/contract) and `pokemonListRepositoryImpl.ts` (implementation calling the HTTP client). Functions: `fetchPokemonList(offset, limit)` and `fetchPokemonDetail(url)`.
**Why:** Matches the established scaffold. The interface allows swapping implementations (e.g., mock for tests) without touching the store.
**Alternative considered:** Plain service functions — simpler but doesn't follow the project's architectural pattern.

### 2 — Hook layer (`usePokemonList`) between store and UI
`usePokemonList.ts` re-exports the relevant slice of the Zustand store (`pokemon`, `isLoading`, `error`, `hasMore`, `loadList`, `loadMore`, `refreshList`) as a single hook.
**Why:** Decouples the home screen from the store implementation — the screen only imports the hook, not the store directly. Follows the `hooks/` pattern in the scaffold.

### 3 — Single Zustand slice split across two files
`pokemonListStore.ts` defines the state shape and actions. `store.ts` creates and exports the `usePokemonListStore` hook via `create()`.
**Why:** Mirrors the `store/pokemonListStore.ts` + `store/store.ts` structure shown in the scaffold.

### 4 — Tabs navigation via Expo Router
`app/(tabs)/_layout.tsx` introduces a `Tabs` navigator. The root `app/_layout.tsx` keeps `<Stack>` and the tabs group nests inside it — this is the standard Expo Router pattern. The Pokédex home is the first (and currently only) tab.
**Why:** The user requires tab-based navigation. Adding it here, alongside the first screen, avoids a separate restructuring PR later.

### 5 — FlatList with onEndReached for infinite scroll
`onEndReachedThreshold={0.3}` triggers `loadMore` when the user is 30% from the bottom. A boolean guard (`isLoading`) prevents concurrent fetches.
**Why:** Native `FlatList` is the standard pattern for this use case in React Native; `FlashList` is an optimisation that can be applied later.

### 6 — PokemonCard lives in shared/ui/components
`PokemonCard` is placed at `src/shared/ui/components/PokemonCard/index.tsx` alongside `Card`, `Chip`, `Button`, etc. It composes `Card` (shadow + press) and `Chip` (type badge with color). Type colors come from a static `TYPE_COLORS` map.
**Why:** All UI components live in `src/shared/ui/components/`; PokemonCard is a display component with no feature-specific business logic, so shared is the correct location.

### 7 — Promise.allSettled for fan-out detail requests
`PokemonListResponse` returns only `name` and `url`. The store fans out to fetch each Pokemon's detail. `Promise.allSettled` is used so one failed request doesn't discard an entire page.
**Why:** Tolerates individual 404s or transient failures, rendering partial results instead of failing the whole page.

## Risks / Trade-offs

- **Fan-out detail requests on each page load** — 20 parallel requests per page. Acceptable for PokéAPI (no auth, generous rate limits). Could be throttled later if needed.
- **No pagination cursor persistence** — refreshing the app resets to page 0. Acceptable for now; persistence is a future concern.
- **`TYPE_COLORS` map maintenance** — new Gen types would require a code change. Low risk for the scope of this app.
