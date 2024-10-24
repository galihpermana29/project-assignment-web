import { useEffect, useState } from "react";
import { PokemonDetails } from "../interface/PokeInterface";
import { useRouter } from "next/router";

interface ListOfPokemonTypes {
    type: string;
    id: string;
}

/**
 * Hooks to get data per type
 * @param pokemonList Holds all pokemon data
 * @returns
 */

const useGetPokemonPerType = (pokemonList: PokemonDetails[]) => {
    const [listOfPokemonTypes, setListOfPokemonTypes] = useState<
        ListOfPokemonTypes[]
    >([]);

    const [pokemonTableData, setPokemonTableData] = useState<PokemonDetails[]>(
        [],
    );

    const [activeType, setActiveType] = useState<string>("");
    const [queryPagination, setQueryPagination] = useState({
        limit: 10,
        offset: 0,
        total: 0,
    });

    const router = useRouter();

    const { type: urlType } = router.query;

    /**
     * To get list of types
     * @returns
     */
    const getListOfTypes = () => {
        const listOfTypes = [];

        pokemonList.forEach((pokemon) => {
            pokemon.types.forEach((type) => {
                if (!listOfTypes.find((dx) => dx.type === type.type.name)) {
                    listOfTypes.push({
                        type: type.type.name,
                        id: type.type.url.split("/")[6],
                    });
                }
            });
        });

        return listOfTypes;
    };

    /**
     * To filter data based on type
     */
    const filterDataPerType = () => {
        const pokemonBasedOnType = pokemonList.filter((pokemon) =>
            pokemon.types.find(
                (dx) =>
                    dx.type.url.split("/")[6] ===
                    (urlType as unknown as string),
            ),
        );

        setActiveType(listOfPokemonTypes.find((dx) => dx.id === urlType)?.type);

        setQueryPagination((dx) => ({
            ...dx,
            total: pokemonBasedOnType.length,
        }));

        setPokemonTableData(
            pokemonBasedOnType.slice(
                queryPagination.offset,
                queryPagination.offset + queryPagination.limit,
            ),
        );
    };

    useEffect(() => {
        if (pokemonList.length > 0) {
            const types = getListOfTypes();
            setListOfPokemonTypes(types);

            if (!urlType || urlType === "") {
                router.replace("/pokemon/type?type=" + types[0].id);
            }
        }
    }, [pokemonList]);

    useEffect(() => {
        if (pokemonList.length > 0) {
            filterDataPerType();
        }
    }, [queryPagination.offset, pokemonList, urlType]);

    return {
        activeType: urlType,
        listOfPokemonTypes,
        pokemonTableData,
        queryPagination,
        setQueryPagination,
        typeName: activeType,
        setActiveType,
    };
};

export default useGetPokemonPerType;
