# CI Gate

**A change is not complete until all CI jobs pass.** Verify locally before marking work done.

| Job           | Tool                   | Local command            |
| ------------- | ---------------------- | ------------------------ |
| **lint**      | ESLint via reviewdog   | `npm run lint`           |
| **typecheck** | TypeScript (`tsc`)     | `npx tsc --noEmit`       |
| **format**    | Prettier via reviewdog | `npx prettier --check .` |

Run all checks:

```bash
npm run lint
npx tsc --noEmit
npx prettier --check .
```
