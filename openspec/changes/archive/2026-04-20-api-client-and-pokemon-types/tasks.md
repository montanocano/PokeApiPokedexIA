## 1. Dependencies

<!-- AGREE (1.1): `npx expo install axios` pins axios to the SDK-compatible version. -->
- [x] 1.1 Install `axios` package (`npx expo install axios` or `npm install axios`)
- [x] 1.2 Install `axios-mock-adapter` as a dev dependency for unit tests

## 2. TypeScript Types

<!-- AGREE (2.1-2.5): Correct path and the right fields scoped to the three planned features. -->
- [x] 2.1 Create `src/shared/api/types.ts`
- [x] 2.2 Define `PokemonType` interface (`slot`, `type.name`, `type.url`)
- [x] 2.3 Define `Pokemon` interface (`id`, `name`, `sprites`, `types`, `stats`)
- [x] 2.4 Define `PokemonListResponse` interface (`count`, `next`, `previous`, `results`)
- [x] 2.5 Define `PokemonDetailResponse` interface (extends or aliases `Pokemon`)
<!-- AGREE (2.6): List items are `{ name, url }` only; the guard is genuinely needed when utility code receives an unknown response. -->
- [x] 2.6 Implement type guard `isPokemonListResponse` to discriminate list vs. detail shapes

## 3. HTTP Client

<!-- AGREE (3.1-3.5): Clear and directly implementable. Trailing slash on baseURL is correctly included. -->
- [x] 3.1 Create `src/shared/api/client.ts`
- [x] 3.2 Create an axios instance with `baseURL: 'https://pokeapi.co/api/v2/'`
- [x] 3.3 Set default `timeout` to `10000` ms on the instance
- [x] 3.4 Attach a response error interceptor that normalizes errors to `ApiError { status, message }`
- [x] 3.5 Export the configured axios instance as the default export

## 4. Unit Tests

<!-- AGREE (4.1-4.5): The four scenarios (baseURL, timeout, 4xx, network error) are the right minimal set. -->
- [x] 4.1 Create `src/shared/api/__tests__/client.test.ts`
- [x] 4.2 Write test: instance `baseURL` is set correctly
- [x] 4.3 Write test: instance `timeout` is 10 000 ms
- [x] 4.4 Write test: 4xx response is normalized to `ApiError` with correct `status`
- [x] 4.5 Write test: network error is normalized to `ApiError` with `status: 0`
- [x] 4.6 Run tests and confirm all pass (`npm test` or `npx jest`)
