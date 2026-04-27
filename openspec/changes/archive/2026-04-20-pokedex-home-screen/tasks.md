## 0. Dependencies

- [x] 0.1 Install `zustand` (`npm install zustand`)

## 1. Pokemon Repository Layer

- [x] 1.1 Create `src/features/pokemon-list/repositories/DefaultPokemonRepository.ts` defining the repository interface with `fetchPokemonList` and `fetchPokemonDetail` method signatures
- [x] 1.2 Create `src/features/pokemon-list/repositories/pokemonListRepositoryImpl.ts` implementing `fetchPokemonList(offset, limit)` calling `client.get('/pokemon')`
- [x] 1.3 Add `fetchPokemonDetail(url)` to `pokemonListRepositoryImpl.ts` returning a typed `PokemonDetailResponse`
- [x] 1.4 Write E2E test in `src/features/pokemon-list/Unit-test/pokemonListRepositoryImpl.e2e.test.ts` validating the live PokeAPI list endpoint (mark with `@group e2e` to allow skipping in offline CI)

## 2. Pokemon List Store

- [x] 2.1 Create `src/features/pokemon-list/store/pokemonListStore.ts` defining state shape (`pokemon`, `offset`, `hasMore`, `isLoading`, `error`) and action implementations (`loadList`, `loadMore`, `refreshList`)
- [x] 2.2 Implement `loadList()`: reset state, fetch page 0, fan-out detail calls with `Promise.allSettled`, store fulfilled results
- [x] 2.3 Implement `loadMore()`: guard against concurrent fetches and `hasMore === false`, append to `pokemon`, increment `offset`
- [x] 2.4 Implement `refreshList()`: reset offset and pokemon array, re-fetch first page
- [x] 2.5 Create `src/features/pokemon-list/store/store.ts` that creates and exports `usePokemonListStore` via Zustand `create()`
- [x] 2.6 Create `src/features/pokemon-list/hooks/usePokemonList.ts` wrapping `usePokemonListStore` and re-exporting state and actions as a single hook
- [x] 2.7 Write unit tests in `src/features/pokemon-list/Unit-test/pokemonListStore.test.ts` mocking the repository layer for load, loadMore, refresh, and error paths

## 3. Pokemon Card Component

- [x] 3.1 Create `src/shared/ui/components/PokemonCard/index.tsx` accepting a `PokemonDetailResponse` prop and export it from `src/shared/ui/components/index.ts`
- [x] 3.2 Render `sprites.front_default` as an `Image`; add null fallback placeholder
- [x] 3.3 Render capitalized `name` using a Tamagui `Text` component
- [x] 3.4 Render zero-padded Pokédex number formatted as `#001`
- [x] 3.5 Create `TYPE_COLORS` constant map (fire, water, grass, electric, psychic, etc.) and render type badges using the existing `Chip` component with the matching color
- [x] 3.6 Wrap card using the existing `Card` component from `src/shared/ui/components/Card/` for shadow and press/hover opacity effect

## 4. Home Screen

- [x] 4.1 Create `app/(tabs)/_layout.tsx` with Expo Router `Tabs` navigator and a single Pokédex tab
- [x] 4.2 Create `app/(tabs)/index.tsx` with basic component scaffold (replaces `app/index.tsx` as the entry screen)
- [x] 4.3 Wrap content in `SafeAreaView` (or Tamagui `SafeAreaView`)
- [x] 4.4 Add "Pokédex" title header using Tamagui `Text` styled as a screen title
- [x] 4.5 Wire `usePokemonList` hook and call `loadList()` on mount via `useEffect`
- [x] 4.6 Render `FlatList` with `PokemonCard` items; show full-screen loading indicator when `isLoading && pokemon.length === 0`
- [x] 4.7 Configure `onEndReached` to call `loadMore()` and set `onEndReachedThreshold={0.3}`
- [x] 4.8 Add `ListFooterComponent` that renders a spinner when `isLoading && pokemon.length > 0`
- [x] 4.9 Add `refreshControl` prop wired to `refreshList()` with native refresh indicator
