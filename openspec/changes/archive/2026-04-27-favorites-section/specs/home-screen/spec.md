## MODIFIED Requirements

### Requirement: Tabs layout
The system SHALL provide `app/(tabs)/_layout.tsx` that configures Expo Router's `Tabs` navigator with two tabs: the "List" tab pointing to `app/(tabs)/index.tsx` and the "Favorites" tab pointing to `app/(tabs)/favorites.tsx`.

#### Scenario: Tab bar is visible on the home screen
- **WHEN** the app launches
- **THEN** the bottom tab bar SHALL be visible with the "List" tab active
