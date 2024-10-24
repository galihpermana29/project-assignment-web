import { renderHook, act } from "@testing-library/react-hooks";
import useGetPokemonPerType from "./useGetPokemonPerType";
import { useRouter } from "next/router";
import {
    PokemonDetails,
    PokemonType,
    Ability,
} from "../interface/PokeInterface";

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

describe("useGetPokemonPerType", () => {
    const mockRouter = {
        query: { type: "1" },
        replace: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockImplementation(() => mockRouter);
    });

    const mockPokemonList: PokemonDetails[] = [
        {
            id: 1,
            name: "bulbasaur",
            types: [
                {
                    slot: 1,
                    type: {
                        name: "grass",
                        url: "https://pokeapi.co/api/v2/type/1",
                    },
                },
            ] as PokemonType[],
            image: "bulbasaur.png",
            url: "pokemon/1",
            abilities: [
                {
                    ability: {
                        name: "overgrow",
                        url: "https://pokeapi.co/api/v2/ability/65",
                    },
                    is_hidden: false,
                    slot: 1,
                },
            ] as Ability[],
            weight: 69,
            height: 7,
        },
        {
            id: 2,
            name: "charmander",
            types: [
                {
                    slot: 1,
                    type: {
                        name: "fire",
                        url: "https://pokeapi.co/api/v2/type/2",
                    },
                },
            ] as PokemonType[],
            image: "charmander.png",
            url: "pokemon/2",
            abilities: [
                {
                    ability: {
                        name: "blaze",
                        url: "https://pokeapi.co/api/v2/ability/66",
                    },
                    is_hidden: false,
                    slot: 1,
                },
            ] as Ability[],
            weight: 85,
            height: 6,
        },
    ];

    it("should initialize with correct default values", () => {
        const { result } = renderHook(() => useGetPokemonPerType([]));

        expect(result.current.listOfPokemonTypes).toEqual([]);
        expect(result.current.pokemonTableData).toEqual([]);
        expect(result.current.queryPagination).toEqual({
            limit: 10,
            offset: 0,
            total: 0,
        });
    });

    it("should generate list of types from pokemon list", () => {
        const { result } = renderHook(() =>
            useGetPokemonPerType(mockPokemonList),
        );

        expect(result.current.listOfPokemonTypes).toEqual([
            { type: "grass", id: "1" },
            { type: "fire", id: "2" },
        ]);
    });

    it("should redirect to first type if no type is selected", () => {
        mockRouter.query = {
            type: null,
        };

        renderHook(() => useGetPokemonPerType(mockPokemonList));

        expect(mockRouter.replace).toHaveBeenCalledWith("/pokemon/type?type=1");
    });

    it("should filter pokemon by selected type", () => {
        mockRouter.query = { type: "1" };

        const { result } = renderHook(() =>
            useGetPokemonPerType(mockPokemonList),
        );

        expect(result.current.pokemonTableData).toHaveLength(1);
        expect(result.current.pokemonTableData[0].name).toBe("bulbasaur");
        expect(result.current.pokemonTableData[0].types[0].type.name).toBe(
            "grass",
        );
    });

    it("should handle pagination correctly", () => {
        const largePokemonList = Array(15)
            .fill(mockPokemonList[0])
            .map((pokemon, index) => ({
                ...pokemon,
                id: index + 1,
                name: `pokemon-${index + 1}`,
            }));
        mockRouter.query = { type: "1" };

        const { result } = renderHook(() =>
            useGetPokemonPerType(largePokemonList),
        );

        expect(result.current.pokemonTableData).toHaveLength(10);

        act(() => {
            result.current.setQueryPagination({
                limit: 10,
                offset: 10,
                total: largePokemonList.length,
            });
        });

        expect(result.current.pokemonTableData).toHaveLength(5);
    });

    it("should handle pokemon with multiple types", () => {
        const dualTypePokemon: PokemonDetails[] = [
            {
                ...mockPokemonList[0],
                types: [
                    {
                        slot: 1,
                        type: {
                            name: "grass",
                            url: "https://pokeapi.co/api/v2/type/1",
                        },
                    },
                    {
                        slot: 2,
                        type: {
                            name: "poison",
                            url: "https://pokeapi.co/api/v2/type/3",
                        },
                    },
                ] as PokemonType[],
            },
        ];

        const { result } = renderHook(() =>
            useGetPokemonPerType(dualTypePokemon),
        );

        expect(result.current.listOfPokemonTypes).toHaveLength(2);
        expect(result.current.listOfPokemonTypes).toEqual(
            expect.arrayContaining([
                { type: "grass", id: "1" },
                { type: "poison", id: "3" },
            ]),
        );
    });

    it("should handle pokemon with null image", () => {
        const pokemonWithNullImage: PokemonDetails[] = [
            {
                ...mockPokemonList[0],
                image: null,
            },
        ];

        const { result } = renderHook(() =>
            useGetPokemonPerType(pokemonWithNullImage),
        );

        expect(result.current.pokemonTableData[0].image).toBeNull();
    });

    it("should update total count in pagination when filtering by type", () => {
        mockRouter.query = { type: "1" };
        const { result } = renderHook(() =>
            useGetPokemonPerType(mockPokemonList),
        );

        expect(result.current.queryPagination.total).toBe(1);
    });

    it("should handle type change through URL", () => {
        mockRouter.query = { type: "1" };
        const { result, rerender } = renderHook(() =>
            useGetPokemonPerType(mockPokemonList),
        );

        expect(result.current.pokemonTableData[0].name).toBe("bulbasaur");

        mockRouter.query = { type: "2" };
        rerender();

        expect(result.current.pokemonTableData[0].name).toBe("charmander");
    });
});
