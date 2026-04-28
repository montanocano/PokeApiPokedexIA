## ADDED Requirements

### Requirement: Detail route exists as a dynamic Expo Router segment
The app SHALL expose a route at `app/detail/[id].tsx` that renders the `DetailScreen` component, where `id` is the numeric Pokémon ID passed as a string URL segment.

<!-- AGREE: `useLocalSearchParams()` gives `{ id: "25" }` — parse with `Number(id)` before passing to the store. -->

#### Scenario: Navigating to the detail route renders DetailScreen
- **WHEN** the router navigates to `/detail/25`
- **THEN** the `DetailScreen` component mounts with `pokemonId` equal to `"25"`

### Requirement: Home route navigates to detail with pokemonId
The HomeScreen SHALL navigate to `/detail/[id]` when a Pokémon card is tapped, passing the Pokémon's numeric ID as the route segment.

<!-- AGREE: `PokemonCard` already exposes `onPress`, so pass `router.push(`/detail/${pokemon.id}`)` — no card changes needed. -->

#### Scenario: Tapping a Pokémon card from HomeScreen
- **WHEN** the user taps a Pokémon card on the HomeScreen
- **THEN** the router navigates to `/detail/<pokemonId>` with the correct id

### Requirement: Detail screen has a custom header with a back button
The DetailScreen SHALL configure a custom Expo Router header that includes a back button allowing the user to return to HomeScreen.

<!-- AGREE: Use `<Stack.Screen options={{ headerLeft: ... }} />` inside the route component. The Stack navigator renders the back button automatically. -->

#### Scenario: Back button returns to HomeScreen
- **WHEN** the user taps the back button on the DetailScreen header
- **THEN** the router pops to the previous screen (HomeScreen)

### Requirement: Custom header hides the default title
The DetailScreen header SHALL not display the route segment string as a title; the title area is left empty or overridden by the screen's own header component.

<!-- AGREE: Since `_layout.tsx` sets `headerShown: false` globally, clarify whether the detail route re-enables it with `title: ""` or uses a fully in-content custom header. Either works, but the spec should pick one. -->

#### Scenario: Header does not show raw route segment
- **WHEN** the DetailScreen is rendered
- **THEN** the navigation bar does not display the text `"[id]"` or the raw pokemonId as a title
