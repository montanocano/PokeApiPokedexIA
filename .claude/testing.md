# Testing

## Status

No test framework is configured yet. The recommended setup for this stack is below.

## Recommended Stack

| Tool                              | Purpose                              |
| --------------------------------- | ------------------------------------ |
| `jest-expo`                       | Jest preset for Expo projects        |
| `@testing-library/react-native`   | Component rendering and interaction  |
| `@testing-library/jest-native`    | Custom matchers (`toBeVisible`, etc) |

## Installation

```bash
npm install --save-dev jest-expo @testing-library/react-native @testing-library/jest-native
```

Add to `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "jest": {
    "preset": "jest-expo",
    "setupFilesAfterFramework": ["@testing-library/jest-native/extend-expect"]
  }
}
```

## What to Test

- **Unit tests** — pure functions in `src/shared/lib/` and feature logic in `src/features/*/model/`
- **Component tests** — shared UI components in `src/shared/ui/components/`
- **Integration tests** — screens that fetch data or read from AsyncStorage

## File Placement

Co-locate test files next to the source they test:

```
src/features/pokemon-list/
  model/
    usePokemonList.ts
    usePokemonList.test.ts   ← unit test for the hook
  ui/
    PokemonCard.tsx
    PokemonCard.test.tsx     ← component test
```

## Running Tests

```bash
npm test              # Run all tests once
npm run test:watch    # Watch mode during development
```

Once configured, `npm test` will be added to the CI gate.

## Full Quality Check

Run all checks before marking any change as done:

```bash
npm run lint              # ESLint
npx tsc --noEmit          # TypeScript type check
npx prettier --check .    # Format check
npm test                  # Unit / component tests (once configured)
```

A change is not complete until all four commands pass without errors.
