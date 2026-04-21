## ADDED Requirements

### Requirement: Detail screen base layout
The `DetailScreen` SHALL render a root `ScrollView` that contains, in order: a header section, a basic info section, and a base stats section. The screen SHALL use the Tamagui component system with no inline styles.

<!-- AGREE: `StyleSheet.create` is still acceptable for non-Tamagui elements like images, as seen in `PokemonCard`. -->

#### Scenario: Screen renders all sections
- **WHEN** the DetailScreen mounts with a resolved `selectedPokemon`
- **THEN** the header, basic info section, and stats section are all visible in the scroll view

### Requirement: Header displays Pokémon image with type-based background
The header SHALL render a large Pokémon official artwork image. The header background color SHALL be determined by the Pokémon's primary type using a predefined type-to-color map. An unknown type SHALL fall back to a neutral default color.

<!-- AGREE: `colors.pokemonTypeBackgrounds` in `src/shared/ui/tokens/colors.ts` already has all 18 types and is used by `PokemonCard`. Reuse it — no new map needed. -->

#### Scenario: Header renders with correct type color
- **WHEN** the Pokémon's primary type is "fire"
- **THEN** the header background matches the fire-type color token

#### Scenario: Header renders with fallback color for unknown type
- **WHEN** the Pokémon has an unrecognized type
- **THEN** the header background uses the default fallback color

### Requirement: Header displays name, Pokédex number, and type chips
The header SHALL display the Pokémon's name in large bold text, its Pokédex number formatted as `#001`, and one type chip per type using the existing `Chip`/`Tag` reusable component.

<!-- AGREE: `Chip` exists at `src/shared/ui/components/Chip/index.tsx`. The `formatId` helper already exists in `PokemonCard` — move it to `formatters.ts` (task 2.3) so both components share it. -->

#### Scenario: Header shows name, number, and types
- **WHEN** the Pokémon data is loaded
- **THEN** the name, Pokédex number (zero-padded to 3 digits), and all type chips are visible in the header

### Requirement: Basic info section shows height, weight, and abilities
The basic info section SHALL display the Pokémon's height (in meters), weight (in kilograms), and list of abilities, each rendered as a card with a representative icon. This section depends on task 0.1 (extending `Pokemon` with `height`, `weight`, and `abilities`). Height and weight unit conversion (÷10) SHALL be handled in `formatters.ts`, not inline in the component.

<!-- FIXED: Added explicit dependency on task 0.1 and the unit conversion requirement. The `Pokemon` type was missing `height`, `weight`, and `abilities` — without extending it first this section won't compile. -->

#### Scenario: Basic info section renders correctly
- **WHEN** the Pokémon data includes height, weight, and abilities
- **THEN** each datum is displayed in its own card with an icon label

### Requirement: Base stats section shows all six stats with progress bars
The base stats section SHALL display HP, Attack, Defense, Sp. Atk, Sp. Def, and Speed. Each stat SHALL be rendered as a labeled row with a progress bar. Progress bars SHALL be capped at 255. The section SHALL also display the sum of all six stats as a "Total" row.

<!-- AGREE: `stats: PokemonStat[]` is already typed. Put the stat-name-to-label map (e.g. `"special-attack"` → `"Sp. Atk"`) in `formatters.ts`. -->

#### Scenario: Stats section renders all six stats
- **WHEN** the Pokémon data is loaded
- **THEN** HP, Attack, Defense, Sp. Atk, Sp. Def, Speed, and Total rows are visible

#### Scenario: Progress bar width is proportional to stat value
- **WHEN** a stat value is 100
- **THEN** the progress bar fills approximately 39% of its container (100/255)

### Requirement: Stat bar color is determined by value threshold
Stat progress bars SHALL use a color based on the stat value: red for values below 50, yellow for values from 50 to 99 inclusive, and green for values of 100 or above.

<!-- AGREE: Use `colors.semantic.error/warning/success` from `colors.ts` — they already map to red/yellow/green. -->

#### Scenario: Low stat bar is red
- **WHEN** a stat value is 45
- **THEN** the progress bar color is red

#### Scenario: Mid stat bar is yellow
- **WHEN** a stat value is 65
- **THEN** the progress bar color is yellow

#### Scenario: High stat bar is green
- **WHEN** a stat value is 110
- **THEN** the progress bar color is green

### Requirement: Loading state shows a spinner
While `isLoading` is `true`, the DetailScreen SHALL render a centered loading spinner instead of the Pokémon sections.

<!-- AGREE: Reuse `LoadingSpinner` from `src/shared/ui/components/LoadingSpinner/index.tsx`. -->

#### Scenario: Spinner is shown during loading
- **WHEN** `isLoading` is `true`
- **THEN** a loading spinner is visible and the Pokémon sections are not rendered

### Requirement: Error state shows a message and retry button
When `error` is non-null, the DetailScreen SHALL render an error message and a retry button. Tapping retry SHALL call `fetchPokemonDetail` again with the same `pokemonId`.

<!-- AGREE: Reuse `ErrorMessage` from `src/shared/ui/components/ErrorMessage/index.tsx` and `Button` from `src/shared/ui/components/Button/index.tsx`. -->

#### Scenario: Error state renders message and retry
- **WHEN** `error` is set to a non-null value
- **THEN** an error message is displayed and a retry button is visible

#### Scenario: Retry button re-triggers the fetch
- **WHEN** the user taps the retry button
- **THEN** `fetchPokemonDetail` is called again with the current `pokemonId`
