import client from "../../../shared/api/client";
import type {
  PokemonDetailResponse,
  PokemonListResponse,
} from "../../../shared/api/types";
import type { DefaultPokemonRepository } from "./DefaultPokemonRepository";

export const pokemonListRepositoryImpl: DefaultPokemonRepository = {
  async fetchPokemonList(
    offset: number,
    limit: number,
  ): Promise<PokemonListResponse> {
    const response = await client.get<PokemonListResponse>("/pokemon", {
      params: { offset, limit },
    });
    return response.data;
  },

  async fetchPokemonDetail(url: string): Promise<PokemonDetailResponse> {
    const response = await client.get<PokemonDetailResponse>(url);
    return response.data;
  },
};
