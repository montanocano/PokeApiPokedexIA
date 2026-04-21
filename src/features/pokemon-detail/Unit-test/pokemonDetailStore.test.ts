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
  types: [{ slot: 1, type: { name: "fire", url: "" } }],
  stats: [
    { base_stat: 45, effort: 0, stat: { name: "hp", url: "" } },
    { base_stat: 49, effort: 0, stat: { name: "attack", url: "" } },
  ],
  height: 7,
  weight: 69,
  abilities: [
    { ability: { name: "blaze", url: "" }, is_hidden: false, slot: 1 },
  ],
});

const mockRepo: DefaultPokemonDetailRepository = {
  fetchPokemonDetail: jest.fn(),
};

const mockFetch = mockRepo.fetchPokemonDetail as jest.Mock;

beforeEach(() => {
  usePokemonDetailStore.setState({
    selectedPokemon: null,
    isLoading: false,
    error: null,
  });
  jest.clearAllMocks();
});

describe("fetchPokemonDetail", () => {
  it("sets isLoading to true at the start then false on success", async () => {
    mockFetch.mockResolvedValue(makeDetail(4));

    const fetchPromise = usePokemonDetailStore
      .getState()
      .fetchPokemonDetail(4, mockRepo);

    expect(usePokemonDetailStore.getState().isLoading).toBe(true);

    await fetchPromise;

    expect(usePokemonDetailStore.getState().isLoading).toBe(false);
  });

  it("stores fetched pokemon and clears error on success", async () => {
    mockFetch.mockResolvedValue(makeDetail(4));

    await usePokemonDetailStore.getState().fetchPokemonDetail(4, mockRepo);

    const { selectedPokemon, isLoading, error } =
      usePokemonDetailStore.getState();
    expect(selectedPokemon).toMatchObject({ id: 4, name: "pokemon-4" });
    expect(isLoading).toBe(false);
    expect(error).toBeNull();
  });

  it("sets error and clears isLoading on failure", async () => {
    mockFetch.mockRejectedValue(new Error("network error"));

    await usePokemonDetailStore.getState().fetchPokemonDetail(4, mockRepo);

    const { selectedPokemon, isLoading, error } =
      usePokemonDetailStore.getState();
    expect(error).toBe("network error");
    expect(isLoading).toBe(false);
    expect(selectedPokemon).toBeNull();
  });

  it("stringifies non-Error rejections", async () => {
    mockFetch.mockRejectedValue("timeout");

    await usePokemonDetailStore.getState().fetchPokemonDetail(4, mockRepo);

    expect(usePokemonDetailStore.getState().error).toBe("timeout");
  });
});

describe("clearSelectedPokemon", () => {
  it("resets all state to initial values", async () => {
    mockFetch.mockResolvedValue(makeDetail(4));
    await usePokemonDetailStore.getState().fetchPokemonDetail(4, mockRepo);

    usePokemonDetailStore.getState().clearSelectedPokemon();

    const { selectedPokemon, isLoading, error } =
      usePokemonDetailStore.getState();
    expect(selectedPokemon).toBeNull();
    expect(isLoading).toBe(false);
    expect(error).toBeNull();
  });

  it("clears error state", () => {
    usePokemonDetailStore.setState({ error: "some error" });

    usePokemonDetailStore.getState().clearSelectedPokemon();

    expect(usePokemonDetailStore.getState().error).toBeNull();
  });
});
