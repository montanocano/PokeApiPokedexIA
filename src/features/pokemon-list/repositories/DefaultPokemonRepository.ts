import type {
  PokemonDetailResponse,
  PokemonListResponse,
} from "../../../shared/api/types";

export interface DefaultPokemonRepository {
  fetchPokemonList(
    offset: number,
    limit: number,
  ): Promise<PokemonListResponse>;
  fetchPokemonDetail(url: string): Promise<PokemonDetailResponse>;
}
