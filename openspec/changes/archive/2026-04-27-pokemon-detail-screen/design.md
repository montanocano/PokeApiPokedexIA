## Context

The app uses Expo Router v6 for file-based navigation, Zustand for global state, and a repository pattern (DefaultRepository + Impl) to decouple data fetching from UI. The home screen and list store already follow this pattern under `features/pokemon-list/`. The `pokemon-detail` feature folder was scaffolded in the structure but contains no implementation yet. The PokéAPI client is already set up and typed.

<!-- FIXED: Corrected "pokemon-details" to "pokemon-detail" (singular) to match the actual scaffolded directory `src/features/pokemon-detail/`. -->

## Goals / Non-Goals

**Goals:**
- Wire Expo Router routes so tapping a Pokémon card on HomeScreen navigates to DetailScreen with the pokemonId
- Implement a Zustand slice that fetches Pokémon details, stores them, and exposes loading/error state
- Build a DetailScreen with four visual sections: header (image + type background), basic info (height, weight, abilities), base stats (progress bars), and loading/error feedback
- Follow the existing repository + hook + store pattern so the new code is consistent with the list feature

<!-- AGREE: Goals are well-scoped and consistent with the existing list feature pattern. -->

**Non-Goals:**
- Favorites / bookmarking (separate change)
- Move animations or shared-element transitions
- Offline caching or persistence beyond the current Zustand session
- Pagination or related-Pokémon suggestions

<!-- AGREE: Non-goals are clearly bounded. Excluding transitions avoids extra animation library setup. -->

## Decisions

### 1. Expo Router dynamic route `app/detail/[id].tsx`
Using a dynamic segment `[id]` lets the router extract `pokemonId` automatically from the URL. This matches how the existing Expo Router docs recommend passing scalar params and avoids custom state-based navigation which would pollute the store.

<!-- AGREE: `app/_layout.tsx` already uses a `<Stack>` with `headerShown: false`, so the new route is picked up automatically. No layout changes needed. -->

### 2. Single Zustand slice for detail state
The list feature already has its own slice. We add a parallel `pokemonDetailStore` slice with `selectedPokemon`, `isLoading`, and `error` fields. Actions: `fetchPokemonDetail(id)` and `clearSelectedPokemon()`. Keeping slices separate prevents list/detail state from coupling.

<!-- AGREE: The existing `store.ts` creates a standalone `usePokemonListStore` — the detail store should follow the same standalone pattern, not merge into a combined store. -->

### 3. Repository pattern: `DefaultPokemonDetailRepository` + `pokemonDetailRepositoryImpl`
Consistent with `pokemon-list`. The default (interface) lives next to the impl. The interface exposes `fetchPokemonDetail(id: number)`. The hook (`usePokemonDetail`) accepts the repo as a dependency-injected param (defaulting to the impl) so unit tests can pass a mock without touching the module graph.

<!-- FIXED: Updated the description to use `fetchPokemonDetail(id: number)` instead of `getPokemonDetail`. The `get` prefix was inconsistent with the existing repos which all use the `fetch` prefix. -->

### 4. Type-based header background color
Map each Pokémon type to a Tamagui token color (using the existing type-color map if present, or a local constant). The background is a solid color block, not a gradient, to keep the implementation simple and compatible with Tamagui's `Stack` primitives without extra libraries.

<!-- AGREE: `colors.pokemonTypeBackgrounds` already exists in `src/shared/ui/tokens/colors.ts` with all 18 types. Reuse it directly — no new local constant needed. -->

### 5. Stat bar color thresholds
- Red: stat < 50
- Yellow: 50 ≤ stat < 100
- Green: stat ≥ 100
Values are capped at 255 (max stat in the games) for bar percentage calculation.

<!-- AGREE: Use `colors.semantic.error/warning/success` tokens from `colors.ts` — they already map to red/yellow/green. No hardcoded hex values needed. -->

## Risks / Trade-offs

- **PokéAPI rate limiting** → Mitigation: Detail calls are triggered by user navigation, not batch-fetched, so rate limits are unlikely to be hit in normal usage.
- **No error boundary at route level** → Mitigation: The loading/error state is managed inside the screen component with a retry button; a full error boundary can be added later.
- **Type-color map completeness** → Mitigation: A default fallback color is used for any unknown type so the UI never crashes.
- **Incomplete `Pokemon` type** → Mitigation: Extend `Pokemon` in `src/shared/api/types.ts` with `height`, `weight`, and `abilities` before implementing the basic info section (tracked as task 0.1).

<!-- FIXED: Added missing risk — `Pokemon` in `src/shared/api/types.ts` lacked `height`, `weight`, and `abilities`, which is a compile-time blocker under strict mode. -->
