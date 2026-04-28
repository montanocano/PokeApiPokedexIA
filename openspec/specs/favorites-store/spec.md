## Requirements

### Requirement: Favorites state slice
The system SHALL provide a Zustand store slice at `src/features/pokemon-favorite/store/favoritesStore.ts` that holds an array of favourited Pokémon IDs and exposes `addFavorite`, `removeFavorite`, and `isFavorite` actions.

#### Scenario: Add a favorite
- **WHEN** `addFavorite(id)` is called with a Pokémon ID not already in the list
- **THEN** the ID SHALL be appended to the favorites array

#### Scenario: Remove a favorite
- **WHEN** `removeFavorite(id)` is called with a Pokémon ID that is in the favorites list
- **THEN** the ID SHALL be removed from the favorites array

#### Scenario: Check favorite status
- **WHEN** `isFavorite(id)` is called with a Pokémon ID that is in the favorites list
- **THEN** it SHALL return `true`

#### Scenario: Check non-favorite status
- **WHEN** `isFavorite(id)` is called with a Pokémon ID that is NOT in the favorites list
- **THEN** it SHALL return `false`

### Requirement: AsyncStorage persistence
The system SHALL persist the favorites array to `AsyncStorage` using Zustand's `persist` middleware with the storage key `pokedex/favorites`.

#### Scenario: Favorites survive app restart
- **WHEN** the user adds a Pokémon to favorites and the app is restarted
- **THEN** the Pokémon SHALL still appear in the favorites list after hydration

### Requirement: Hydration flag
The system SHALL expose an `isHydrated` boolean on the store that is `false` before the persisted state is loaded and `true` after hydration completes.

#### Scenario: Hydration completes on startup
- **WHEN** the app launches and the persisted state is loaded from AsyncStorage
- **THEN** `isHydrated` SHALL become `true`

### Requirement: useFavorites hook
The system SHALL provide `src/features/pokemon-favorite/hooks/useFavorites.ts` that exposes `favorites`, `isHydrated`, `addFavorite`, `removeFavorite`, and `isFavorite` from the Zustand store.

#### Scenario: Hook returns current favorites
- **WHEN** `useFavorites()` is called inside a component
- **THEN** it SHALL return the current array of favourited Pokémon IDs and the store actions
