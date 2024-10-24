import baseApi from "../../../utils/api";
import {
    IEvolutionsResponse,
    PokemonAPIResponse,
    PokemonDetailOriginal,
} from "../interface/PokeInterface";

class PokeAPIClass {
    baseURL: string = "https://pokeapi.co/api/v2";

    /**
     * get all pokemon
     * @param limit
     * @param offset
     * @returns
     */
    async getAllPokemon(
        limit: number,
        offset: number,
    ): Promise<PokemonAPIResponse> {
        const response = await (
            await baseApi(this.baseURL)
        ).get<PokemonAPIResponse>(`/pokemon?limit=${limit}&offset=${offset}`);
        return response.data;
    }

    /**
     * get detail per pokemon, such as images and stats
     * @param url
     * @returns
     */
    async getDetailPokemon(url: string): Promise<PokemonDetailOriginal> {
        const response = await (
            await baseApi(this.baseURL)
        ).get<PokemonDetailOriginal>(url);

        return response.data;
    }

    /**
     * get evolution data
     * @param url
     * @returns
     */
    async getEvolutionChain(url: string): Promise<IEvolutionsResponse> {
        const response = await (
            await baseApi(this.baseURL)
        ).get<IEvolutionsResponse>(url);

        return response.data;
    }
}

export const PokeAPI = new PokeAPIClass();
