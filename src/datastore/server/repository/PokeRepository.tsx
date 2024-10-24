import baseApi from "../../../utils/api";
import {
    PokemonAPIResponse,
    PokemonDetailOriginal,
} from "../interface/PokeInterface";

class PokeAPIClass {
    baseURL: string = "https://pokeapi.co/api/v2";

    async getAllPokemon(
        limit: number,
        offset: number,
    ): Promise<PokemonAPIResponse> {
        const response = await (
            await baseApi(this.baseURL)
        ).get<PokemonAPIResponse>(`/pokemon?limit=${limit}&offset=${offset}`);
        return response.data;
    }

    async getPokemonImageURL(url: string): Promise<PokemonDetailOriginal> {
        const response = await (
            await baseApi(this.baseURL)
        ).get<PokemonDetailOriginal>(url);

        return response.data;
    }
}

export const PokeAPI = new PokeAPIClass();
