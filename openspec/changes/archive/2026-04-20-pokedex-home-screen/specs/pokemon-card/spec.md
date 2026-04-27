## ADDED Requirements

### Requirement: PokemonCard displays sprite image
<!-- AGREE: Null fallback is required — `sprites.front_default` is `string | null` per the types spec. -->
The system SHALL render the Pokemon's front default sprite (`sprites.front_default`) as an `Image` with a defined width and height using Tamagui layout tokens.

#### Scenario: Sprite renders for a valid Pokemon
- **WHEN** `PokemonCard` receives a `PokemonDetailResponse` with a non-null `sprites.front_default`
- **THEN** an `Image` element SHALL be rendered with the sprite URL as its `source`

#### Scenario: Fallback when sprite is null
- **WHEN** `sprites.front_default` is `null`
- **THEN** a placeholder image or empty view SHALL render in place of the sprite without crashing

### Requirement: PokemonCard displays capitalized name
<!-- AGREE: Simple capitalization of the API's lowercase name is the correct presentation. -->
The system SHALL render the Pokemon's name with the first letter capitalised (e.g., "Bulbasaur" not "bulbasaur") using a Tamagui `Text` component.

#### Scenario: Name is capitalized
- **WHEN** PokéAPI returns `name: "bulbasaur"`
- **THEN** the card SHALL display "Bulbasaur"

### Requirement: PokemonCard displays Pokédex number
<!-- AGREE: `#001` formatting is the standard Pokédex convention. -->
The system SHALL render the Pokemon's `id` formatted as a zero-padded three-digit string prefixed with `#` (e.g., `#001`, `#025`, `#150`).

#### Scenario: Number is formatted correctly
- **WHEN** a Pokemon has `id: 1`
- **THEN** the card SHALL display `#001`

#### Scenario: Three-digit ids are not padded further
- **WHEN** a Pokemon has `id: 150`
- **THEN** the card SHALL display `#150`

### Requirement: PokemonCard displays type badges with colors
<!-- AGREE: Static `TYPE_COLORS` map is the right approach at this scale — types are fixed in the PokéAPI v2 stable dataset. -->
<!-- FIXED (type color and background maps): The original `TYPE_COLORS` and `TYPE_BACKGROUNDS` maps duplicated hex values inline in the component. Fixed by moving all hex values to `src/shared/ui/tokens/colors.ts` (as `pokemonTypes` and `pokemonTypeBackgrounds`) and registering them as Tamagui tokens in `tamagui.config.ts`. The component now builds both maps by spreading the centralized token values, eliminating the duplication. -->
The system SHALL render each of the Pokemon's types as a badge by passing the color from a `TYPE_COLORS` map (sourced from `colors.pokemonTypes` in the centralized token file) to the existing `Chip` component (`src/shared/ui/components/Chip/`). `PokemonCard` itself SHALL be located at `src/shared/ui/components/PokemonCard/index.tsx` and exported from `src/shared/ui/components/index.ts`.

#### Scenario: Type badges render with correct color
- **WHEN** a Pokemon has `types: [{ type: { name: 'fire' } }]`
- **THEN** a badge with a fire-type background color SHALL be rendered

#### Scenario: Dual-type Pokemon renders two badges
- **WHEN** a Pokemon has two entries in `types`
- **THEN** two separate badges SHALL be rendered, one per type

### Requirement: PokemonCard has shadow and press interaction
<!-- AGREE: Visual press feedback is essential for a list of interactive cards. -->
<!-- FIXED (Image inline style): The sprite `Image` previously used an inline style object `style={{ width: 110, height: 110 }}`, violating the no-inline-styles convention. Fixed by moving dimensions to a `StyleSheet.create` entry and referencing it as `style={styles.sprite}`. -->
The system SHALL wrap content in the existing `Card` component (`src/shared/ui/components/Card/`) which provides shadow tokens and press/hover opacity feedback. The sprite `Image` dimensions SHALL be defined via `StyleSheet.create`, not inline style objects.

#### Scenario: Card is pressable
- **WHEN** the user presses the `PokemonCard`
- **THEN** the card SHALL show a visual pressed state (opacity or scale change) without navigating (navigation is out of scope for this card)
