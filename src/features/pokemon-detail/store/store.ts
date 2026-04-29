import { create } from "zustand";
import {
  initialState,
  createPokemonDetailActions,
  type PokemonDetailStore,
} from "./pokemonDetailStore";

export const usePokemonDetailStore = create<PokemonDetailStore>((set) => ({
  ...initialState,
  ...createPokemonDetailActions(
    set as (
      fn: (state: PokemonDetailStore) => Partial<PokemonDetailStore>,
    ) => void,
  ),
}));
