## 1. Dependencies

- [ ] 1.1 Install `axios` package (`npx expo install axios` or `npm install axios`)
- [ ] 1.2 Install `axios-mock-adapter` as a dev dependency for unit tests

## 2. TypeScript Types

- [ ] 2.1 Create `src/shared/api/types.ts`
- [ ] 2.2 Define `PokemonType` interface (`slot`, `type.name`, `type.url`)
- [ ] 2.3 Define `Pokemon` interface (`id`, `name`, `sprites`, `types`, `stats`)
- [ ] 2.4 Define `PokemonListResponse` interface (`count`, `next`, `previous`, `results`)
- [ ] 2.5 Define `PokemonDetailResponse` interface (extends or aliases `Pokemon`)
- [ ] 2.6 Implement type guard `isPokemonListResponse` to discriminate list vs. detail shapes

## 3. HTTP Client

- [ ] 3.1 Create `src/shared/api/client.ts`
- [ ] 3.2 Create an axios instance with `baseURL: 'https://pokeapi.co/api/v2/'`
- [ ] 3.3 Set default `timeout` to `10000` ms on the instance
- [ ] 3.4 Attach a response error interceptor that normalizes errors to `ApiError { status, message }`
- [ ] 3.5 Export the configured axios instance as the default export

## 4. Unit Tests

- [ ] 4.1 Create `src/shared/api/__tests__/client.test.ts`
- [ ] 4.2 Write test: instance `baseURL` is set correctly
- [ ] 4.3 Write test: instance `timeout` is 10 000 ms
- [ ] 4.4 Write test: 4xx response is normalized to `ApiError` with correct `status`
- [ ] 4.5 Write test: network error is normalized to `ApiError` with `status: 0`
- [ ] 4.6 Run tests and confirm all pass (`npm test` or `npx jest`)
