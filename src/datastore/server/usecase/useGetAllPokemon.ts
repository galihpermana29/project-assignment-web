import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PokemonDetails } from "../interface/PokeInterface";
import { PokeAPI } from "../repository/PokeRepository";

interface Pagination {
    limit: number;
    offset: number;
    total: number;
}

interface SelectedPokemon {
    isOpen: boolean;
    data: PokemonDetails | null;
}

export interface UsePokemonResult {
    pokemonList: PokemonDetails[];
    loading: boolean;
    error: string | null;
    setQueryPagination: Dispatch<SetStateAction<Pagination>>;
    queryPagination: Pagination;

    selectedPokemon: SelectedPokemon;
    setSelectedPokemon: Dispatch<SetStateAction<SelectedPokemon>>;
}

export const usePokemon = (customLimit?: number): UsePokemonResult => {
    /**
     * Get list of pokemon and selected modal pokemon statae
     */
    const [pokemonList, setPokemonList] = useState<PokemonDetails[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState<SelectedPokemon>({
        isOpen: false,
        data: null,
    });

    /**
     * Error handling while fetching
     */
    const [generalHandler, setGeneralHandler] = useState({
        loading: false,
        error: null,
    });

    /**
     * Pagination
     */

    const [queryPagination, setQueryPagination] = useState({
        limit: customLimit ? customLimit : 9,
        offset: 0,
        total: 0,
    });

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setGeneralHandler((dx) => ({ ...dx, loading: true }));

                const listData = await PokeAPI.getAllPokemon(
                    queryPagination.limit,
                    queryPagination.offset,
                );

                /**
                 * Map per detail pokemon to get detail information
                 */
                const pokemonDetails = await Promise.all(
                    listData.results.map(async (pokemon) => {
                        const details = await PokeAPI.getDetailPokemon(
                            "/pokemon/" + pokemon.url.split("/")[6],
                        );

                        return {
                            name: details.name,
                            image: details.sprites.other["official-artwork"]
                                .front_default,
                            url: pokemon.url,
                            types: details.types,
                            abilities: details.abilities,
                            weight: details.weight,
                            height: details.height,
                            id: details.id,
                        };
                    }),
                );

                setQueryPagination((dx) => ({ ...dx, total: listData.count }));
                setPokemonList(pokemonDetails);
            } catch (err) {
                setGeneralHandler((dx) => ({
                    ...dx,
                    error: (err as Error).message,
                }));
            } finally {
                setGeneralHandler((dx) => ({ ...dx, loading: false }));
            }
        };

        fetchPokemon();
    }, [queryPagination.limit, queryPagination.offset]);

    return {
        pokemonList,
        loading: generalHandler.loading,
        error: generalHandler.error,
        setQueryPagination,
        selectedPokemon,
        setSelectedPokemon,
        queryPagination,
    };
};
