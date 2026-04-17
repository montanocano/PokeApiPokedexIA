# Folder Structure

```
/
├── app/                  # Expo Router screens and layouts (file-based routing)
│   ├── _layout.tsx       # Root layout
│   └── index.tsx         # Entry screen
├── src/
│   ├── features/         # Feature slices
│   │   ├── pokemon-list/         # hooks/, repositories/, search-filter/, store/, Unit-test/
│   │   ├── pokemon-detail/       # hooks/, repositories/, utils/, store/, Unit-test/
│   │   └── pokemon-favorite/     # hooks/, store/, Unit-test/
│   ├── shared/
│   │   ├── api/          # PokéAPI client and data-fetching utilities
│   │   ├── ui/           # Reusable Tamagui components
│   │   └── utils/        # Shared helpers
├── assets/
│   └── images/           # Static images and icons
├── tamagui.config.ts     # Tamagui theme and token configuration
└── .github/
    └── workflows/
        └── ci.yml        # CI pipeline (lint, typecheck, format, tests)
```

## File Placement Rules

- **New screens** → `app/` (Expo Router file-based routing; do not place screens in `src/`)
- **Shared reusable components** → `src/shared/ui/`
- **Feature-specific components** → `src/features/<name>/`
- **PokéAPI client / data-fetching** → `src/shared/api/`
- **Shared helpers / utilities** → `src/shared/utils/`
- **Static images and icons** → `assets/images/`
