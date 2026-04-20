## Context

The project is a React Native / Expo Pokedex app. Currently there is no `src/` directory; all app code lives at the root. This change adds the empty folder skeleton before any feature code is written.

## Goals / Non-Goals

**Goals:**

- Create `src/features/pokemon-list`, `src/features/pokemon-detail`, `src/features/pokemon-favorite`
- Create `src/shared/api`, `src/shared/ui`, `src/shared/utils`
- All folders remain empty (placeholder `.gitkeep` files may be added so git tracks them)

**Non-Goals:**

- Moving or refactoring any existing code
- Adding index files, barrel exports, or configuration
- Defining internal structure within each sub-folder

## Decisions

**Use `.gitkeep` files to track empty directories**
Git does not track empty directories. Adding a zero-byte `.gitkeep` in each leaf folder ensures the structure is committed and visible to all contributors. Alternative: skip committing empty dirs and rely on documentation — rejected because it requires manual re-creation on fresh clones.

**`features/` vs `modules/` naming**
`features/` is the widely-used convention in React/React Native feature-slice architecture. Clear semantic meaning (a self-contained product feature), consistent with industry patterns.

**`shared/` sub-folder split: `api`, `ui`, `utils`**

- `api`: PokeAPI client and data-fetching helpers
- `ui`: Reusable presentational components
- `utils`: Pure helper functions (formatting, type guards, etc.)

## Risks / Trade-offs

- Empty folder structure has zero runtime risk.
- [Risk] Future contributors may place files in wrong folder → Mitigation: document conventions in README or CLAUDE.md once structure is stable.
