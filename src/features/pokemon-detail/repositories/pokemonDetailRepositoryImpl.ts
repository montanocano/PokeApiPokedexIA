import client from "../../../shared/api/client";
import type { PokemonDetailResponse } from "../../../shared/api/types";
import type { DefaultPokemonDetailRepository } from "./DefaultPokemonDetailRepository";

export const pokemonDetailRepositoryImpl: DefaultPokemonDetailRepository = {
  async fetchPokemonDetail(id: number): Promise<PokemonDetailResponse> {
    const response = await client.get<PokemonDetailResponse>(`/pokemon/${id}`);
    return response.data;
  },
};
