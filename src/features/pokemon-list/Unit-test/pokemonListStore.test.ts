import { usePokemonListStore } from "../store/store";
import { pokemonListRepositoryImpl } from "../repositories/pokemonListRepositoryImpl";
import type {
  PokemonDetailResponse,
  PokemonListResponse,
} from "../../../shared/api/types";

jest.mock("../repositories/pokemonListRepositoryImpl", () => ({
  pokemonListRepositoryImpl: {
    fetchPokemonList: jest.fn(),
    fetchPokemonDetail: jest.fn(),
  },
}));

const mockFetchList = pokemonListRepositoryImpl.fetchPokemonList as jest.Mock;
const mockFetchDetail =
  pokemonListRepositoryImpl.fetchPokemonDetail as jest.Mock;

const makeList = (next: string | null = "next"): PokemonListResponse => ({
  count: 100,
  next,
  previous: null,
  results: [
    { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
    { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
  ],
});

const makeDetail = (id: number): PokemonDetailResponse => ({
  id,
  name: `pokemon-${id}`,
  sprites: {
    front_default: `https://example.com/${id}.png`,
    front_shiny: null,
  },
  types: [{ slot: 1, type: { name: "grass", url: "" } }],
  stats: [],
  height: 7,
  weight: 69,
  abilities: [],
});

beforeEach(() => {
  usePokemonListStore.setState({
    pokemon: [],
    offset: 0,
    hasMore: true,
    isLoading: false,
    isRefreshing: false,
    error: null,
  });
  jest.clearAllMocks();
});

describe("loadList", () => {
  it("resets state, fetches page 0 and stores results", async () => {
    mockFetchList.mockResolvedValue(makeList());
    mockFetchDetail
      .mockResolvedValueOnce(makeDetail(1))
      .mockResolvedValueOnce(makeDetail(2));

    await usePokemonListStore.getState().loadList();

    const { pokemon, offset, hasMore, isLoading, error } =
      usePokemonListStore.getState();
    expect(pokemon).toHaveLength(2);
    expect(offset).toBe(30);
    expect(hasMore).toBe(true);
    expect(isLoading).toBe(false);
    expect(error).toBeNull();
  });

  it("sets hasMore to false when next is null", async () => {
    mockFetchList.mockResolvedValue(makeList(null));
    mockFetchDetail.mockResolvedValue(makeDetail(1));

    await usePokemonListStore.getState().loadList();

    expect(usePokemonListStore.getState().hasMore).toBe(false);
  });

  it("sets error and clears isLoading on failure", async () => {
    mockFetchList.mockRejectedValue(new Error("network error"));

    await usePokemonListStore.getState().loadList();

    const { error, isLoading } = usePokemonListStore.getState();
    expect(error).toBe("network error");
    expect(isLoading).toBe(false);
  });

  it("extracts message from ApiError object on failure", async () => {
    mockFetchList.mockRejectedValue({ status: 500, message: "server error" });

    await usePokemonListStore.getState().loadList();

    const { error, isLoading } = usePokemonListStore.getState();
    expect(error).toBe("server error");
    expect(isLoading).toBe(false);
  });
});

describe("loadMore", () => {
  it("appends next page to existing pokemon", async () => {
    usePokemonListStore.setState({
      pokemon: [makeDetail(1)],
      offset: 30,
      hasMore: true,
    });
    mockFetchList.mockResolvedValue(makeList());
    mockFetchDetail
      .mockResolvedValueOnce(makeDetail(2))
      .mockResolvedValueOnce(makeDetail(3));

    await usePokemonListStore.getState().loadMore();

    const { pokemon, offset } = usePokemonListStore.getState();
    expect(pokemon).toHaveLength(3);
    expect(offset).toBe(60);
  });

  it("does nothing when isLoading is true", async () => {
    usePokemonListStore.setState({ isLoading: true });
    await usePokemonListStore.getState().loadMore();
    expect(mockFetchList).not.toHaveBeenCalled();
  });

  it("does nothing when hasMore is false", async () => {
    usePokemonListStore.setState({ hasMore: false });
    await usePokemonListStore.getState().loadMore();
    expect(mockFetchList).not.toHaveBeenCalled();
  });
});

describe("refreshList", () => {
  it("replaces existing pokemon with refreshed results from page 0", async () => {
    usePokemonListStore.setState({ pokemon: [makeDetail(99)], offset: 40 });
    mockFetchList.mockResolvedValue(makeList());
    mockFetchDetail
      .mockResolvedValueOnce(makeDetail(1))
      .mockResolvedValueOnce(makeDetail(2));

    await usePokemonListStore.getState().refreshList();

    const { pokemon, offset } = usePokemonListStore.getState();
    expect(pokemon).toHaveLength(2);
    expect(offset).toBe(30);
  });

  it("uses isRefreshing not isLoading so loadMore guard is unaffected", async () => {
    mockFetchList.mockResolvedValue(makeList());
    mockFetchDetail
      .mockResolvedValueOnce(makeDetail(1))
      .mockResolvedValueOnce(makeDetail(2));

    await usePokemonListStore.getState().refreshList();

    const { isLoading, isRefreshing } = usePokemonListStore.getState();
    expect(isLoading).toBe(false);
    expect(isRefreshing).toBe(false);
  });
});
