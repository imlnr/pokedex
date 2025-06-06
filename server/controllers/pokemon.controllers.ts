import axios from "axios";
import { Request, Response } from "express";

export const fetAllPokemon = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const offset = (Number(page) - 1) * Number(limit);

        // Fetch list of pokemons with offset and limit
        const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
        );

        const results = response.data.results;

        // Attach images to each pokemon
        const pokemons = results.map((pokemon: any, index: number) => {
            const id = offset + index + 1;
            return {
                name: pokemon.name,
                id,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            };
        });

        res.json({
            count: response.data.count,
            page: Number(page),
            limit: Number(limit),
            pokemons,
        });
    } catch (error) {
        console.error('Error fetching pokemons:', error);
        res.status(500).json({ error: 'Failed to fetch pokemons' });
    }
}
