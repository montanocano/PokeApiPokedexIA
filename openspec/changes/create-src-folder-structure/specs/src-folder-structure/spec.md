## ADDED Requirements

### Requirement: src/features sub-folders exist

The repository SHALL contain the directories `src/features/pokemon-list`, `src/features/pokemon-detail`, and `src/features/pokemon-favorite`.

#### Scenario: Features directories are present after setup

- **WHEN** a developer clones the repository
- **THEN** the directories `src/features/pokemon-list`, `src/features/pokemon-detail`, and `src/features/pokemon-favorite` SHALL exist

### Requirement: src/shared sub-folders exist

The repository SHALL contain the directories `src/shared/api`, `src/shared/ui`, and `src/shared/utils`.

#### Scenario: Shared directories are present after setup

- **WHEN** a developer clones the repository
- **THEN** the directories `src/shared/api`, `src/shared/ui`, and `src/shared/utils` SHALL exist

### Requirement: All leaf directories are tracked by git

Each leaf directory under `src/` SHALL be tracked in the git repository so the structure is available on a fresh clone.

#### Scenario: Git tracks empty directories via .gitkeep

- **WHEN** the repository is cloned fresh
- **THEN** each leaf directory under `src/` SHALL contain a `.gitkeep` file ensuring git tracks it
