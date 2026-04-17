# Coding Conventions

- **TypeScript strict mode** — all files must type-check with `tsc --noEmit`. Do not use `any` unless justified with an inline comment.
- **Tamagui design tokens for all styling** — use tokens from `tamagui.config.ts` (colors, spacing, typography). Do not use raw CSS values.
- **No inline styles** — style via Tamagui styled components or the `styled()` utility. Never use inline `style={{}}` props; they bypass the design system and break theming.
- **Component co-location** — reusable components live under `src/shared/ui/`. Feature-specific components live inside `src/features/<name>/`.
- **Expo Router conventions** — screens go in `app/`. Do not place screen files in `src/`.
