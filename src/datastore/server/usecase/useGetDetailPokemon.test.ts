import { renderHook } from "@testing-library/react-hooks";
import { PokeAPI } from "../repository/PokeRepository";
import useGetDetailPokemon from "./useGetDetailPokemon";
import { act } from "react-test-renderer";

jest.mock("../repository/PokeRepository", () => ({
    PokeAPI: {
        getDetailPokemon: jest.fn(),
        getEvolutionChain: jest.fn(),
    },
}));

describe("useGetDetailPokemon", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockPokemonDetail = {
        name: "bulbasaur",
        sprites: {
            front_default: "front.png",
            back_default: "back.png",
            other: {
                "official-artwork": {
                    front_default: "official.png",
                },
            },
        },
        types: [{ type: { name: "grass" } }],
        abilities: [{ ability: { name: "overgrow" } }],
        weight: 69,
        height: 7,
        id: 1,
    };

    const mockEvolutionChain = {
        chain: {
            species: {
                name: "bulbasaur",
                url: "https://pokeapi.co/api/v2/pokemon-species/1",
            },
            evolves_to: [
                {
                    species: {
                        name: "ivysaur",
                        url: "https://pokeapi.co/api/v2/pokemon-species/2",
                    },
                    evolves_to: [],
                },
            ],
        },
    };

    const mockEvolutionPokemonDetail = {
        name: "bulbasaur",
        sprites: {
            other: {
                "official-artwork": {
                    front_default: "official.png",
                },
            },
        },
        types: [{ type: { name: "grass" } }],
        abilities: [{ ability: { name: "overgrow" } }],
        weight: 69,
        height: 7,
        id: 1,
    };

    it("should fetch and process pokemon detail data successfully", async () => {
        (PokeAPI.getDetailPokemon as jest.Mock).mockImplementation(
            async (url) => {
                if (url === "/pokemon/1") {
                    return mockPokemonDetail;
                }
                return mockEvolutionPokemonDetail;
            },
        );

        (PokeAPI.getEvolutionChain as jest.Mock).mockResolvedValue(
            mockEvolutionChain,
        );

        const { result } = renderHook(() => useGetDetailPokemon("1"));

        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBeNull();
        expect(result.current.data).toBeNull();

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
        expect(result.current.data).toEqual(mockPokemonDetail);
        expect(result.current.sprites).toContain("front.png");
        expect(result.current.sprites).toContain("back.png");
        expect(result.current.sprites).toContain("official.png");
        expect(result.current.evolutionList).toHaveLength(2);
    });

    it("should handle errors in fetching pokemon details", async () => {
        const error = new Error("Failed to fetch pokemon details");
        (PokeAPI.getDetailPokemon as jest.Mock).mockRejectedValue(error);
        (PokeAPI.getEvolutionChain as jest.Mock).mockResolvedValue(
            mockEvolutionChain,
        );

        const { result } = renderHook(() => useGetDetailPokemon("1"));

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe("Failed to fetch pokemon details");
        expect(result.current.data).toBeNull();
    });

    it("should handle errors in fetching evolution chain", async () => {
        (PokeAPI.getDetailPokemon as jest.Mock).mockResolvedValue(
            mockPokemonDetail,
        );
        const error = new Error("Failed to fetch evolution chain");
        (PokeAPI.getEvolutionChain as jest.Mock).mockRejectedValue(error);

        const { result } = renderHook(() => useGetDetailPokemon("1"));

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe("Failed to fetch evolution chain");
        expect(result.current.evolutionList).toEqual([]);
    });

    it("should update when id changes", async () => {
        (PokeAPI.getDetailPokemon as jest.Mock).mockImplementation(
            async (url) => {
                if (url.includes("/pokemon/1") || url.includes("/pokemon/2")) {
                    return mockPokemonDetail;
                }
                return mockEvolutionPokemonDetail;
            },
        );
        (PokeAPI.getEvolutionChain as jest.Mock).mockResolvedValue(
            mockEvolutionChain,
        );

        const { result, rerender } = renderHook(
            (props) => useGetDetailPokemon(props.id),
            { initialProps: { id: "1" } },
        );

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
        });

        expect(PokeAPI.getDetailPokemon).toHaveBeenCalledWith("/pokemon/1");
        expect(PokeAPI.getEvolutionChain).toHaveBeenCalledWith(
            "/evolution-chain/1",
        );

        jest.clearAllMocks();

        await act(async () => {
            rerender({ id: "2" });
            await new Promise((resolve) => setTimeout(resolve, 100));
        });

        expect(PokeAPI.getDetailPokemon).toHaveBeenCalledWith("/pokemon/2");
        expect(PokeAPI.getEvolutionChain).toHaveBeenCalledWith(
            "/evolution-chain/2",
        );
    });
});
