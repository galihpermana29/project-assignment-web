import { renderHook, act } from "@testing-library/react-hooks";
import nock from "nock";
import { PokeAPI } from "../repository/PokeRepository";
import { usePokemon } from "./useGetAllPokemon";

jest.mock("../repository/PokeRepository", () => ({
    PokeAPI: {
        getAllPokemon: jest.fn(),
        getPokemonImageURL: jest.fn(),
    },
}));

describe("usePokemon Integration Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        nock.cleanAll();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should fetch and process pokemon data successfully", async () => {
        const mockPokemonList = {
            count: 2,
            results: [
                {
                    name: "bulbasaur",
                    url: "https://pokeapi.co/api/v2/pokemon/1",
                },
                {
                    name: "charmander",
                    url: "https://pokeapi.co/api/v2/pokemon/4",
                },
            ],
        };

        const mockPokemonDetails = {
            name: "bulbasaur",
            sprites: {
                other: {
                    "official-artwork": {
                        front_default: "https://example.com/bulbasaur.png",
                    },
                },
            },
            types: [{ type: { name: "grass" } }],
            abilities: [{ ability: { name: "overgrow" } }],
            weight: 69,
            height: 7,
            id: 1,
        };

        (PokeAPI.getAllPokemon as jest.Mock).mockResolvedValue(mockPokemonList);
        (PokeAPI.getPokemonImageURL as jest.Mock).mockResolvedValue(
            mockPokemonDetails,
        );

        const { result } = renderHook(() => usePokemon());

        // Initial state check
        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBeNull();
        expect(result.current.pokemonList).toEqual([]);

        // Wait for state updates
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        // Check final state
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
        expect(result.current.pokemonList).toHaveLength(2);
        expect(result.current.pokemonList[0]).toEqual({
            name: "bulbasaur",
            image: "https://example.com/bulbasaur.png",
            url: "https://pokeapi.co/api/v2/pokemon/1",
            types: [{ type: { name: "grass" } }],
            abilities: [{ ability: { name: "overgrow" } }],
            weight: 69,
            height: 7,
            id: 1,
        });
    });

    it("should handle pagination changes", async () => {
        const { result } = renderHook(() => usePokemon());

        // Wait for initial state update
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        // Change pagination
        await act(async () => {
            result.current.setQueryPagination({
                limit: 20,
                offset: 20,
                total: 0,
            });
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(PokeAPI.getAllPokemon).toHaveBeenCalledWith(20, 20);
    });

    it("should handle API errors", async () => {
        const error = new Error("API Error");
        (PokeAPI.getAllPokemon as jest.Mock).mockRejectedValue(error);

        const { result } = renderHook(() => usePokemon());

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe("API Error");
        expect(result.current.pokemonList).toEqual([]);
    });

    it("should handle selected pokemon state", async () => {
        const { result } = renderHook(() => usePokemon());

        const mockPokemon = {
            name: "bulbasaur",
            image: "test.png",
            url: "test-url",
            types: [],
            abilities: [],
            weight: 100,
            height: 10,
            id: 1,
        };

        await act(async () => {
            result.current.setSelectedPokemon({
                isOpen: true,
                data: mockPokemon,
            });
        });

        expect(result.current.selectedPokemon).toEqual({
            isOpen: true,
            data: mockPokemon,
        });
    });

    it("should update total count from API response", async () => {
        const mockPokemonList = {
            count: 1118,
            results: [],
        };

        (PokeAPI.getAllPokemon as jest.Mock).mockResolvedValue(mockPokemonList);

        const { result } = renderHook(() => usePokemon());

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.queryPagination.total).toBe(1118);
    });
});
