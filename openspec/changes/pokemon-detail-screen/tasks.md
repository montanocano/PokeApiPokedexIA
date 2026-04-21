## 0. Prerequisites

<!-- FIXED: Added this section — task 0.1 must be completed before 5.3, since `Pokemon` in `src/shared/api/types.ts` was missing `height`, `weight`, and `abilities`. -->

- [x] 0.1 Extend the `Pokemon` interface in `src/shared/api/types.ts` to include `height: number`, `weight: number`, and `abilities: Array<{ ability: { name: string; url: string }; is_hidden: boolean; slot: number }>` — matching the PokéAPI response shape

## 1. Navigation & Routing

- [x] 1.1 Create `app/detail/[id].tsx` dynamic route file that renders `DetailScreen`

<!-- AGREE: The Stack in `app/_layout.tsx` picks this up automatically. -->

- [x] 1.2 Configure custom header options in the route (hide default title, add back button)

<!-- AGREE: Clarify whether to re-enable the Stack header with `title: ""` or keep `headerShown: false` and use a fully in-content header. Currently ambiguous. -->

- [x] 1.3 Update HomeScreen Pokémon card `onPress` to navigate to `/detail/<pokemonId>`

<!-- AGREE: `PokemonCard` already has `onPress`. Pass `router.push(`/detail/${pokemon.id}`)` from the HomeScreen. -->

## 2. Repository Layer

- [x] 2.1 Define `DefaultPokemonDetailRepository` interface with `fetchPokemonDetail(id: number)` method

<!-- FIXED: Renamed `getPokemonDetail` to `fetchPokemonDetail` to match the `fetch` prefix used by all existing repositories in the codebase. -->

- [x] 2.2 Implement `pokemonDetailRepositoryImpl` calling the existing HTTP client to fetch Pokémon detail from PokéAPI

<!-- AGREE: Use `client.get<PokemonDetailResponse>(`/pokemon/${id}`)` — simpler than the list impl since no URL slicing is needed. -->

- [x] 2.3 Add a `formatters.ts` utility under `src/features/pokemon-detail/utils/` for formatting Pokédex number, height, and weight

<!-- AGREE: Extract the existing `formatId` from `PokemonCard` here to avoid duplication. -->

## 3. Store & Actions

- [x] 3.1 Create `pokemonDetailStore.ts` Zustand slice with `selectedPokemon`, `isLoading`, and `error` fields

<!-- AGREE: Mirror `pokemonListStore.ts` — export `PokemonDetailState`, `PokemonDetailActions`, `PokemonDetailStore`, `initialState`, and `createPokemonDetailActions`. -->

- [x] 3.2 Implement `fetchPokemonDetail(id)` action — set loading, call repository, set result or error

<!-- AGREE: Use the same error-handling as the list store: `e instanceof Error ? e.message : String(e)`. -->

- [x] 3.3 Implement `clearSelectedPokemon()` action — reset all detail state to initial values

<!-- AGREE: `set(() => ({ ...initialState }))` is sufficient. -->

- [x] 3.4 Create a standalone `usePokemonDetailStore` in `src/features/pokemon-detail/store/store.ts`

<!-- FIXED: Changed "Register the detail slice in store.ts" — there is no combined store. The existing pattern creates a standalone store per feature (see `usePokemonListStore`). -->

## 4. Hook

- [x] 4.1 Create `usePokemonDetail.ts` hook that accepts `pokemonId`, calls `fetchPokemonDetail` on mount, and returns `{ pokemon, isLoading, error }`

<!-- AGREE: Use individual field selectors like `usePokemonList.ts` to avoid unnecessary re-renders. -->

- [x] 4.2 Add cleanup in hook's `useEffect` to call `clearSelectedPokemon` on unmount

<!-- AGREE: Include `pokemonId` in the dependency array so navigating between two detail screens triggers a new fetch. -->

## 5. Detail Screen UI

- [x] 5.1 Create `DetailScreen` component file with a root `ScrollView` and placeholder section slots

<!-- AGREE: Place at `src/features/pokemon-detail/screens/DetailScreen.tsx`. -->

- [x] 5.2 Build `PokemonDetailHeader` component: type-based background color, large artwork image, name in large bold text, zero-padded Pokédex number, type chips using the existing `Chip`/`Tag` component

<!-- AGREE: Reuse `colors.pokemonTypeBackgrounds`, `colors.pokemonTypes`, and `formatId` from task 2.3. -->

- [x] 5.3 Build `PokemonBasicInfoSection` component: height (m), weight (kg), and abilities displayed as cards with representative icons. Depends on task 0.1. Use `Card` from `src/shared/ui/components/Card/index.tsx` and put unit conversion logic in `formatters.ts`.

<!-- FIXED: Added explicit dependency on task 0.1 and moved height/weight conversion (÷10) responsibility to `formatters.ts` instead of inline in the component. -->

- [x] 5.4 Build `PokemonStatsSection` component: six stat rows (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed) each with label, value, and progress bar; Total row at the bottom

<!-- AGREE: Put the stat-name-to-label map in `formatters.ts`. -->

- [x] 5.5 Implement stat bar color logic: red < 50, yellow 50–99, green ≥ 100

<!-- AGREE: Use `colors.semantic.error/warning/success` — no hardcoded hex values. -->

- [x] 5.6 Add loading state to `DetailScreen`: render centered spinner when `isLoading` is `true`

<!-- AGREE: Reuse `LoadingSpinner` from `src/shared/ui/components/LoadingSpinner/index.tsx`. -->

- [x] 5.7 Add error state to `DetailScreen`: render error message and retry button when `error` is non-null; retry button calls `fetchPokemonDetail` again

<!-- AGREE: Reuse `ErrorMessage` and `Button` from `src/shared/ui/components/`. -->

## 6. Tests

- [x] 6.1 Write unit tests for `usePokemonDetail` hook (fetch on mount, clear on unmount, loading/error states)

<!-- AGREE: Pass a mock repo via the DI param. -->

- [x] 6.2 Write unit tests for the Zustand detail store actions (`fetchPokemonDetail`, `clearSelectedPokemon`)

<!-- AGREE: Follow the pattern in `src/features/pokemon-list/Unit-test/pokemonListStore.test.ts`. -->

- [x] 6.3 Write UI tests for `DetailScreen` verifying header, info section, stats section, loading state, and error state render correctly

<!-- AGREE: Check `src/features/pokemon-list/Unit-test/` for the testing library and patterns in use. -->
