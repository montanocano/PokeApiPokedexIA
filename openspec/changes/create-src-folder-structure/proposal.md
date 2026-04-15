## Why

The project needs a scalable folder structure to organize code by feature and shared concerns. Establishing this structure early prevents code sprawl and makes it easier for contributors to locate and add code consistently.

## What Changes

- Create `src/` root directory as the main source folder
- Create `src/features/` with sub-folders: `pokemon-list`, `pokemon-detail`, `pokemon-favorite`
- Create `src/shared/` with sub-folders: `api`, `ui`, `utils`
- All folders are empty (no files added at this stage)

## Capabilities

### New Capabilities

- `src-folder-structure`: Establishes the top-level `src/` directory with `features/` and `shared/` sub-trees, providing a clear separation between feature modules and reusable shared code.

### Modified Capabilities

## Impact

- Adds new empty directories under `src/` — no existing code is moved or modified.
- No API, dependency, or runtime impact.
