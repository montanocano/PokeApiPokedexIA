import { create } from "zustand";
import {
  initialState,
  createPokemonListActions,
  type PokemonListStore,
} from "./pokemonListStore";

export const usePokemonListStore = create<PokemonListStore>((set, get) => {
  const setState = (
    fn: (state: PokemonListStore) => Partial<PokemonListStore>,
  ) => set(fn);

  return {
    ...initialState,
    ...createPokemonListActions(setState, get),
  };
});
