# CI Gate

**A change is not complete until all four CI jobs pass.** Verify locally before marking work done.

| Job           | Tool                   | Local command                 |
| ------------- | ---------------------- | ----------------------------- |
| **lint**      | ESLint via reviewdog   | `npm run lint`                |
| **typecheck** | TypeScript (`tsc`)     | `npx tsc --noEmit`            |
| **format**    | Prettier via reviewdog | `npx prettier --check .`      |
| **tests**     | Jest                   | `npm test -- --ci --coverage` |

Run all checks:

```bash
npm run lint
npx tsc --noEmit
npx prettier --check .
npm test -- --ci
```
