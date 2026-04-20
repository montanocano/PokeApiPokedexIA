## Requirements

### Requirement: Tabs layout
The system SHALL provide `app/(tabs)/_layout.tsx` that configures Expo Router's `Tabs` navigator with at least one tab: the Pokédex home tab pointing to `app/(tabs)/index.tsx`.

#### Scenario: Tab bar is visible on the home screen
- **WHEN** the app launches
- **THEN** the bottom tab bar SHALL be visible with the Pokédex tab active

### Requirement: Home screen file and route
The system SHALL provide the home screen at `app/(tabs)/index.tsx` as the default tab entry point of the app.

#### Scenario: Home screen is the initial route
- **WHEN** the app launches
- **THEN** the home screen SHALL be the first screen displayed inside the tabs navigator

### Requirement: SafeAreaView wrapping
The system SHALL wrap the home screen content in a `SafeAreaView` (or Tamagui equivalent) so content does not overlap device notches or status bars.

#### Scenario: Content is within safe area
- **WHEN** the home screen renders on a device with a notch
- **THEN** the header and list SHALL not overlap the notch or home indicator

### Requirement: "Pokédex" header
The system SHALL render a visible header at the top of the home screen with the text "Pokédex" using a Tamagui `Text` component styled as a title.

#### Scenario: Header is visible on load
- **WHEN** the home screen first renders
- **THEN** a text element reading "Pokédex" SHALL be visible at the top of the screen

### Requirement: Pokemon list rendered with FlatList
The system SHALL render the Pokemon list using a `FlatList` where each item renders a `PokemonCard` component. The list SHALL call `loadList()` on mount via `usePokemonList`.

#### Scenario: List loads on mount
- **WHEN** the home screen mounts for the first time
- **THEN** `loadList()` SHALL be called and the first 20 Pokemon SHALL be rendered as `PokemonCard` items

#### Scenario: Empty state while loading
- **WHEN** `isLoading` is `true` and `pokemon` is empty
- **THEN** a loading indicator SHALL be displayed instead of the list

### Requirement: Infinite scroll via onEndReached
The system SHALL configure `FlatList`'s `onEndReached` to call `loadMore()` and set `onEndReachedThreshold` to `0.3`.

#### Scenario: More Pokemon load on scroll
- **WHEN** the user scrolls to 30% from the bottom of the list
- **THEN** `loadMore()` SHALL be called and the next 20 Pokemon SHALL be appended to the list

### Requirement: Footer loading spinner
The system SHALL render a loading spinner in the `FlatList`'s `ListFooterComponent` while `isLoading` is `true` and the list already has items.

#### Scenario: Spinner appears during load more
- **WHEN** `loadMore()` is in flight and `pokemon.length > 0`
- **THEN** a spinner SHALL be visible at the bottom of the list

#### Scenario: No footer spinner on initial load
- **WHEN** `isLoading` is `true` and `pokemon` is empty (initial load)
- **THEN** no footer spinner SHALL render (a full-screen loader is used instead)

### Requirement: Pull-to-refresh
The system SHALL configure the `FlatList`'s `refreshControl` prop to call `refreshList()` when the user pulls down.

#### Scenario: Pull-to-refresh resets the list
- **WHEN** the user pulls down on the list
- **THEN** `refreshList()` SHALL be called and the list SHALL be replaced with a fresh first page
