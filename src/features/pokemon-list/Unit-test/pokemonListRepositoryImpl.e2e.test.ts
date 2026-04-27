/**
 * @group e2e
 *
 * Makes real HTTP requests to the live PokéAPI.
 * Run with: RUN_E2E=true npx jest pokemonListRepositoryImpl.e2e
 */
import { pokemonListRepositoryImpl } from "../repositories/pokemonListRepositoryImpl";
import { isPokemonListResponse } from "../../../shared/api/types";

const describeE2E = process.env.RUN_E2E === "true" ? describe : describe.skip;

describeE2E("pokemonListRepositoryImpl E2E", () => {
  it("fetchPokemonList returns a valid PokemonListResponse with 5 results", async () => {
    const result = await pokemonListRepositoryImpl.fetchPokemonList(0, 5);
    expect(isPokemonListResponse(result)).toBe(true);
    expect(result.results).toHaveLength(5);
    expect(result.count).toBeGreaterThan(0);
  });

  it("fetchPokemonDetail returns a valid PokemonDetailResponse", async () => {
    const list = await pokemonListRepositoryImpl.fetchPokemonList(0, 1);
    const detail = await pokemonListRepositoryImpl.fetchPokemonDetail(
      list.results[0].url,
    );
    expect(detail.id).toBeDefined();
    expect(detail.name).toBeDefined();
    expect(detail.sprites).toBeDefined();
    expect(Array.isArray(detail.types)).toBe(true);
  });
});
