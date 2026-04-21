import client from "../../../shared/api/client";
import { API_BASE_URL } from "../../../shared/config";
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
    const relativePath = url.startsWith(API_BASE_URL)
      ? url.slice(API_BASE_URL.length)
      : url;
    const response = await client.get<PokemonDetailResponse>(relativePath);
    return response.data;
  },
};
