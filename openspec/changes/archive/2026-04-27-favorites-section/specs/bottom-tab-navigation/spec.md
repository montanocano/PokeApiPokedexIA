## ADDED Requirements

### Requirement: Two-tab bottom navigation bar
The system SHALL configure `app/(tabs)/_layout.tsx` to display a bottom tab bar with exactly two tabs: "List" and "Favorites".

#### Scenario: Both tabs are visible
- **WHEN** the app renders any screen inside the `(tabs)` group
- **THEN** the bottom bar SHALL show a "List" tab and a "Favorites" tab

### Requirement: Tab icons
The system SHALL display an icon on each tab using `Ionicons` from `@expo/vector-icons`: the `list` icon for the "List" tab and the `heart` icon for the "Favorites" tab.

#### Scenario: Correct icon shown per tab
- **WHEN** the bottom tab bar renders
- **THEN** the "List" tab SHALL show the `list` Ionicon and the "Favorites" tab SHALL show the `heart` Ionicon

### Requirement: Active tab highlight
The system SHALL visually differentiate the active tab from inactive tabs (e.g., via color change on the icon and label).

#### Scenario: Active tab is highlighted
- **WHEN** the user is on the "Favorites" screen
- **THEN** the "Favorites" tab icon and label SHALL be rendered in the active color and the "List" tab SHALL appear inactive
