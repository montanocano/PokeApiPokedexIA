import type { PokemonDetailResponse } from "../../../shared/api/types";

export interface DefaultPokemonDetailRepository {
  fetchPokemonDetail(id: number): Promise<PokemonDetailResponse>;
}
