## 1. Feature Folder Setup

- [x] 1.1 Create `features/favorites-screen/hooks/useFavorites.ts` that reads the favourites list from the Zustand store
- [x] 1.2 Create `features/favorites-screen/store/` placeholder (will hold favorites slice once Favorites Persistence change is applied)
- [x] 1.3 Create `features/favorites-screen/Unit-test/useFavorites.test.ts` skeleton

## 2. Bottom Tab Navigation

- [x] 2.1 Update `app/(tabs)/_layout.tsx` to add a second `Tabs.Screen` for the Favorites tab
- [x] 2.2 Add `Ionicons` `list` icon to the "List" tab and `heart` icon to the "Favorites" tab
- [x] 2.3 Configure active/inactive tab colors using Tamagui tokens

## 3. Favorites Screen

- [x] 3.1 Create `app/(tabs)/favorites.tsx` screen file
- [x] 3.2 Render a `FlatList` of `PokemonCard` items sourced from `useFavorites`
- [x] 3.3 Add empty-state message/illustration when the favourites list is empty
- [x] 3.4 Wrap content in `SafeAreaView` (Tamagui equivalent)

## 4. Tests

- [x] 4.1 Write UI test for the bottom tab bar rendering both tabs
- [x] 4.2 Write UI test for the Favorites screen empty state
- [x] 4.3 Write UI test for the Favorites screen with at least one favourited Pokémon
