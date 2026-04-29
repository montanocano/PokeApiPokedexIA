## Requirements

### Requirement: SearchBar renders a text input with a clear button
The SearchBar component SHALL render a Tamagui-styled text input extending `SearchInput`. When the input contains text, a clear button SHALL be visible. Tapping the clear button SHALL empty the input and reset the search query in the store.

#### Scenario: Input is empty on mount
- **WHEN** the SearchBar is rendered with no initial value
- **THEN** the text input is empty and no clear button is visible

#### Scenario: Clear button appears after typing
- **WHEN** the user types one or more characters into the input
- **THEN** a clear button becomes visible alongside the input

#### Scenario: Tapping clear resets input and store
- **WHEN** the user taps the clear button
- **THEN** the input is emptied and `setSearchQuery("")` is dispatched to the store

### Requirement: useSearchFilter hook dispatches store action with SEARCH_DEBOUNCE_MS debounce
The `useSearchFilter` hook SHALL debounce the `setSearchQuery` store action by `SEARCH_DEBOUNCE_MS` milliseconds (defined in `src/shared/config.ts`). The action SHALL only be dispatched after the user stops typing for that interval. The debounce interval SHALL be defined as a named constant — never as an inline numeric literal.

#### Scenario: Rapid typing does not dispatch on every keystroke
- **WHEN** the user types three characters within 100 ms each
- **THEN** `setSearchQuery` is called only once, `SEARCH_DEBOUNCE_MS` after the last keystroke

#### Scenario: Single character after pause dispatches immediately after debounce
- **WHEN** the user types one character and waits `SEARCH_DEBOUNCE_MS`
- **THEN** `setSearchQuery` is called once with the typed character

### Requirement: SearchBar is styled with Tamagui tokens
The SearchBar component SHALL use Tamagui design tokens for colours, spacing, and border radius. No inline `style={{ }}` objects SHALL be used in the wrapper layout. Native `TextInput` elements may use `StyleSheet.create` for properties that Tamagui's styled system does not control (e.g. `flex`, `padding`, `fontSize` on the raw input).

#### Scenario: Component renders without styling errors
- **WHEN** the SearchBar is rendered inside a Tamagui provider
- **THEN** no style warnings are thrown and the component uses theme tokens
