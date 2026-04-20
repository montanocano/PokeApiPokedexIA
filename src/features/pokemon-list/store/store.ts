import { create } from "zustand";
import {
  initialState,
  createPokemonListActions,
  type PokemonListStore,
} from "./pokemonListStore";

export const usePokemonListStore = create<PokemonListStore>((set, get) => ({
  ...initialState,
  ...createPokemonListActions(
    set as (fn: (state: PokemonListStore) => Partial<PokemonListStore>) => void,
    get,
  ),
}));
