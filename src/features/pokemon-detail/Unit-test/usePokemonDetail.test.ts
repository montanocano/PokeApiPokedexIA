/**
 * Tests for usePokemonDetail hook.
 *
 * These tests validate the hook's integration with the Zustand store by calling
 * the store's fetchPokemonDetail action directly with a mock repo — the same
 * DI path the hook uses — then asserting on store state.
 *
 * Full lifecycle tests (mount/unmount effects) can be added using
 * @testing-library/react-native (already installed as a dev dependency).
 */
import { usePokemonDetailStore } from "../store/store";
import type { PokemonDetailResponse } from "../../../shared/api/types";
import type { DefaultPokemonDetailRepository } from "../repositories/DefaultPokemonDetailRepository";

const makeDetail = (id: number): PokemonDetailResponse => ({
  id,
  name: `pokemon-${id}`,
  sprites: {
    front_default: `https://example.com/${id}.png`,
    front_shiny: null,
  },
  types: [{ slot: 1, type: { name: "water", url: "" } }],
  stats: [],
  height: 10,
  weight: 85,
  abilities: [
    { ability: { name: "torrent", url: "" }, is_hidden: false, slot: 1 },
  ],
});

const makeRepo = (
  detail: PokemonDetailResponse,
): DefaultPokemonDetailRepository => ({
  fetchPokemonDetail: jest.fn().mockResolvedValue(detail),
});

const makeFailingRepo = (message: string): DefaultPokemonDetailRepository => ({
  fetchPokemonDetail: jest.fn().mockRejectedValue(new Error(message)),
});

beforeEach(() => {
  usePokemonDetailStore.setState({
    selectedPokemon: null,
    isLoading: false,
    error: null,
  });
  jest.clearAllMocks();
});

describe("usePokemonDetail store integration (DI path)", () => {
  it("fetchPokemonDetail populates selectedPokemon on success", async () => {
    const detail = makeDetail(7);
    const repo = makeRepo(detail);

    await usePokemonDetailStore.getState().fetchPokemonDetail(7, repo);

    expect(usePokemonDetailStore.getState().selectedPokemon).toMatchObject({
      id: 7,
      name: "pokemon-7",
    });
    expect(repo.fetchPokemonDetail).toHaveBeenCalledWith(7);
  });

  it("fetchPokemonDetail sets error on failure", async () => {
    const repo = makeFailingRepo("not found");

    await usePokemonDetailStore.getState().fetchPokemonDetail(7, repo);

    expect(usePokemonDetailStore.getState().error).toBe("not found");
    expect(usePokemonDetailStore.getState().selectedPokemon).toBeNull();
  });

  it("clearSelectedPokemon resets state (simulates unmount cleanup)", () => {
    usePokemonDetailStore.setState({
      selectedPokemon: makeDetail(7),
      error: null,
      isLoading: false,
    });

    usePokemonDetailStore.getState().clearSelectedPokemon();

    expect(usePokemonDetailStore.getState().selectedPokemon).toBeNull();
    expect(usePokemonDetailStore.getState().isLoading).toBe(false);
    expect(usePokemonDetailStore.getState().error).toBeNull();
  });

  it("re-fetching with a new id calls fetchPokemonDetail with the new id", async () => {
    const repo = makeRepo(makeDetail(25));

    await usePokemonDetailStore.getState().fetchPokemonDetail(25, repo);

    expect(repo.fetchPokemonDetail).toHaveBeenCalledWith(25);
    expect(usePokemonDetailStore.getState().selectedPokemon?.id).toBe(25);
  });
});
