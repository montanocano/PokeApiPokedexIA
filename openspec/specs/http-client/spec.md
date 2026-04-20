## ADDED Requirements

<!-- AGREE: All four requirements are well-formed with clear WHEN/THEN scenarios. -->

### Requirement: Axios instance with PokéAPI base URL
<!-- AGREE: Trailing slash on the baseURL is critical — without it axios joins paths incorrectly-->
The system SHALL export a pre-configured axios instance with `baseURL` set to `https://pokeapi.co/api/v2/`.

#### Scenario: Request uses base URL automatically
- **WHEN** a feature module calls `client.get('/pokemon')` without specifying a full URL
- **THEN** the request SHALL be sent to `https://pokeapi.co/api/v2/pokemon`

### Requirement: Default request timeout
<!-- AGREE: 10 000 ms is appropriate for a public API on mobile. -->
The system SHALL configure the axios instance with a default timeout of 10 000 ms.

#### Scenario: Request exceeds timeout
- **WHEN** a request to PokéAPI takes longer than 10 000 ms to respond
- **THEN** axios SHALL abort the request and reject the promise with a timeout error

### Requirement: Response error interceptor
<!-- AGREE: Two-branch design (response present vs. absent) is the correct split. `status: 0` is an unambiguous sentinel for network failures. -->
The system SHALL attach a response interceptor that normalizes failed responses into a consistent `ApiError` shape before rejecting.

#### Scenario: Server returns 4xx or 5xx
- **WHEN** PokéAPI responds with an HTTP error status (4xx or 5xx)
- **THEN** the interceptor SHALL reject the promise with an `ApiError` containing `status` and `message` fields

#### Scenario: Network failure (no response)
- **WHEN** the request fails due to a network error and no HTTP response is received
- **THEN** the interceptor SHALL reject the promise with an `ApiError` whose `status` is `0` and `message` describes the network failure

### Requirement: Unit tests for client configuration
The system SHALL include unit tests that verify baseURL, timeout, and interceptor behavior without making real network requests.

#### Scenario: Client configuration is testable in isolation
- **WHEN** unit tests run in CI
- **THEN** tests SHALL mock the network layer (e.g., via `axios-mock-adapter`) and assert on the configured instance properties and interceptor logic
