## ADDED Requirements

### Requirement: Favorites screen file and route
The system SHALL provide the Favorites screen at `app/(tabs)/favorites.tsx` as a tab entry point that displays the user's saved Pokémon.

#### Scenario: Favorites screen is accessible via tab
- **WHEN** the user taps the "Favorites" tab
- **THEN** the Favorites screen SHALL be displayed

### Requirement: Favorites list renders saved Pokémon
The system SHALL render the list of favourited Pokémon on the Favorites screen using the existing `PokemonCard` component inside a `FlatList`.

#### Scenario: Saved Pokémon appear on Favorites screen
- **WHEN** the user has favourited one or more Pokémon and navigates to the Favorites tab
- **THEN** each favourited Pokémon SHALL appear as a `PokemonCard` in the list

### Requirement: Empty state when no favourites exist
The system SHALL display an empty-state message when the user has no saved Pokémon.

#### Scenario: Empty state shown with no favourites
- **WHEN** the user opens the Favorites screen and the favourites list is empty
- **THEN** a message or illustration SHALL inform the user that no Pokémon have been saved

### Requirement: Feature folder structure
The system SHALL place Favorites screen logic under `features/favorites-screen/` with `hooks/`, `store/`, and `Unit-test/` sub-folders following the co-location pattern used by `pokemon-details`.

#### Scenario: Favorites hook exists
- **WHEN** the Favorites screen mounts
- **THEN** a `useFavorites` hook from `features/favorites-screen/hooks/` SHALL provide the list of favourited Pokémon
