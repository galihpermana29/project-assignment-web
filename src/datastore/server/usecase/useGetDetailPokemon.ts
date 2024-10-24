import { useEffect, useState } from "react";
import { PokeAPI } from "../repository/PokeRepository";
import {
    Chain,
    PokemonDetailOriginal,
    PokemonDetails,
} from "../interface/PokeInterface";

const useGetDetailPokemon = (id: string) => {
    const [data, setData] = useState(null);
    const [evolutionList, setEvolutionList] = useState<PokemonDetails[]>([]);
    const [sprites, setSprites] = useState([]);
    /**
     * Error handling while fetching
     */
    const [generalHandler, setGeneralHandler] = useState({
        loading: false,
        error: null,
    });

    /**
     * Map sprites per pokemon
     * @param response
     * @returns
     */
    const mapSprites = (response: PokemonDetailOriginal) => {
        const sprites = [];
        Object.keys(response.sprites).forEach((val) => {
            if (val === "other") {
                Object.keys(response.sprites[val]).forEach((val2) => {
                    Object.keys(response.sprites[val][val2]).forEach((val3) => {
                        if (response.sprites[val][val2][val3]) {
                            sprites.push(response.sprites[val][val2][val3]);
                        }
                    });
                });
            } else if (val.startsWith("back") || val.startsWith("front")) {
                if (response.sprites[val]) {
                    sprites.push(response.sprites[val]);
                }
            }
        });
        return sprites;
    };

    /**
     * Map pokemon evolution chain
     * @param chain
     * @returns
     */
    const mapEvolutionChain = (chain: Chain) => {
        const evolutions = [];

        const extractEvolutions = (chain) => {
            evolutions.push({
                name: chain.species.name,
                id: chain.species.url,
            });

            if (chain.evolves_to.length > 0) {
                chain.evolves_to.forEach((evo) => {
                    extractEvolutions(evo);
                });
            }
        };

        extractEvolutions(chain);

        return evolutions;
    };

    useEffect(() => {
        /**
         * Get detail pokemon data
         */
        const getDetailData = async () => {
            try {
                setGeneralHandler((dx) => ({ ...dx, loading: true }));
                const response = await PokeAPI.getDetailPokemon(
                    `/pokemon/${id}`,
                );
                const mappedSprites = mapSprites(response);
                setSprites(mappedSprites);
                setData(response);
            } catch (error) {
                setGeneralHandler((dx) => ({
                    ...dx,
                    error: (error as Error).message,
                }));
            } finally {
                setGeneralHandler((dx) => ({ ...dx, loading: false }));
            }
        };

        getDetailData();
    }, [id]);

    useEffect(() => {
        /**
         * get detail pokemon evolution chain
         */
        const getEvolutionChain = async () => {
            try {
                setGeneralHandler((dx) => ({ ...dx, loading: true }));
                const response = await PokeAPI.getEvolutionChain(
                    `/evolution-chain/${id}`,
                );
                const listOfChain = mapEvolutionChain(response.chain);

                const pokemonDetails = await Promise.all(
                    listOfChain.map(async (pokemon) => {
                        const details = await PokeAPI.getDetailPokemon(
                            "/pokemon/" + pokemon.id.split("/")[6],
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
                setEvolutionList(pokemonDetails);
            } catch (error) {
                setGeneralHandler((dx) => ({
                    ...dx,
                    error: (error as Error).message,
                }));
            } finally {
                setGeneralHandler((dx) => ({ ...dx, loading: false }));
            }
        };

        getEvolutionChain();
    }, [id]);

    return {
        data,
        loading: generalHandler.loading,
        error: generalHandler.error,
        sprites,
        evolutionList,
    };
};

export default useGetDetailPokemon;
