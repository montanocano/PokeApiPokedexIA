## Requirements

### Requirement: FavoriteButton component
The system SHALL provide `src/shared/ui/components/FavoriteButton/index.tsx`, a pressable heart icon that toggles the favourite status of a given Pokémon ID.

#### Scenario: Button shows filled heart for a favourited Pokémon
- **WHEN** `FavoriteButton` is rendered with a Pokémon ID that is in the favorites list
- **THEN** a filled heart icon SHALL be displayed

#### Scenario: Button shows outlined heart for a non-favourited Pokémon
- **WHEN** `FavoriteButton` is rendered with a Pokémon ID that is NOT in the favorites list
- **THEN** an outlined heart icon SHALL be displayed

### Requirement: Toggle on press
The system SHALL call `addFavorite(id)` when the button is pressed for a non-favourited Pokémon and `removeFavorite(id)` when pressed for an already-favourited Pokémon.

#### Scenario: Pressing adds a favorite
- **WHEN** the user presses `FavoriteButton` for a Pokémon that is not yet favourited
- **THEN** `addFavorite(id)` SHALL be called and the button SHALL switch to the filled heart icon

#### Scenario: Pressing removes a favorite
- **WHEN** the user presses `FavoriteButton` for a Pokémon that is already favourited
- **THEN** `removeFavorite(id)` SHALL be called and the button SHALL switch to the outlined heart icon

### Requirement: Accessibility label
The `FavoriteButton` SHALL have an `accessibilityLabel` of `"Add to favorites"` when the Pokémon is not yet favourited and `"Remove from favorites"` when it is.

#### Scenario: Correct accessibility label when not favourited
- **WHEN** the Pokémon is not in the favorites list
- **THEN** the button's `accessibilityLabel` SHALL be `"Add to favorites"`

#### Scenario: Correct accessibility label when favourited
- **WHEN** the Pokémon is in the favorites list
- **THEN** the button's `accessibilityLabel` SHALL be `"Remove from favorites"`
