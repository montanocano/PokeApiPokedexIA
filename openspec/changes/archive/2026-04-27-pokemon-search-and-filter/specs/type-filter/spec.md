## ADDED Requirements

### Requirement: TypeFilter renders a horizontally scrollable chip row
The TypeFilter component SHALL render all 18 canonical Pokémon types as chips inside a horizontal ScrollView using the existing `Chip` component from `src/shared/ui/components/Chip/`. The chip row SHALL not wrap to multiple lines.

#### Scenario: All type chips are visible via horizontal scroll
- **WHEN** the TypeFilter is rendered
- **THEN** all 18 type chips are present in the scroll view and the user can scroll horizontally to see them all

#### Scenario: Chip row does not wrap
- **WHEN** the screen width is narrower than the total chip row width
- **THEN** the chips remain on a single row and the user must scroll horizontally to see all of them

### Requirement: Each chip is coloured according to its Pokémon type
Each type chip SHALL display a background colour corresponding to that type, sourced from the `TYPE_COLORS` constant defined in `src/shared/ui/tokens/colors.ts`.

#### Scenario: Fire chip has the correct colour
- **WHEN** the TypeFilter is rendered
- **THEN** the Fire chip background matches the value defined in `TYPE_COLORS.fire`

<!-- Fixed: setTypeFilter(string | null) replaced by toggleTypeFilter(string); multi-chip selection is now supported — tapping a chip adds or removes it from activeTypeFilters. -->
### Requirement: Tapping a chip toggles it in or out of the active type filter set
Tapping an unselected chip SHALL add it to the active type filters and dispatch `toggleTypeFilter(type)` to the store. Tapping an already-selected chip SHALL remove it from the active type filters and dispatch `toggleTypeFilter(type)` again. Multiple chips can be active simultaneously; the list shows only Pokémon that have all active types.

#### Scenario: Selecting a new type chip activates it
- **WHEN** the user taps the Water chip while no filter is active
- **THEN** the Water chip is visually highlighted and `toggleTypeFilter("water")` is dispatched

#### Scenario: Tapping the active chip deselects it
- **WHEN** the user taps the Water chip while it is already active
- **THEN** the Water chip returns to its default style and `toggleTypeFilter("water")` is dispatched, removing it from the active set

#### Scenario: Two chips can be active at the same time
- **WHEN** the user taps the Fire chip and then the Flying chip
- **THEN** both chips are visually highlighted and the list shows only Pokémon with both types

### Requirement: Selected chips show visual selection feedback
Active chips SHALL be visually distinct from inactive chips (e.g., a border, scale change, or opacity difference) so the user can tell which filters are applied. Multiple chips can be highlighted simultaneously.

#### Scenario: Active chip is visually distinct
- **WHEN** a type chip is in the active filter set
- **THEN** it renders with a visual indicator (border or elevated appearance) that is absent on inactive chips
