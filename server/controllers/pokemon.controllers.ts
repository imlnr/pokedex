import axios from "axios";
import { Request, Response } from "express";

export const fetAllPokemon = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (Number(page) - 1) * Number(limit);

        // Fetch basic list of Pokémon
        const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
        );

        const results = response.data.results;

        // Attach images and sounds to each Pokémon
        const pokemons = await Promise.all(
            results.map(async (pokemon: any, index: number) => {
                const id = offset + index + 1;

                // Only fetch detailed data for sound/cry if offset is less than 1025
                let sounds = { latest: "", legacy: "" };
                if (offset < 1025) {
                    const details = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                    const cries = details.data.cries;
                    sounds = {
                        latest: cries?.latest || "",
                        legacy: cries?.legacy || "",
                    };
                }

                return {
                    name: pokemon.name,
                    url: pokemon.url,
                    id,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
                    sounds,
                };
            })
        );

        res.json({
            count: response.data.count,
            page: Number(page),
            limit: Number(limit),
            pokemons,
        });
    } catch (error) {
        // console.error('Error fetching pokemons:', error);
        res.status(500).json({ error: 'Failed to fetch pokemons' });
    }
};

export const getSinglePokemon = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ error: 'Pokemon ID is required' });
            return;
        }

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const colorValue = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

        const { height, weight, abilities, stats, moves, types } = response.data;

        const pokemon = {
            name: response.data.name,
            id: response.data.id,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
            height,
            weight,
            abilities: abilities.map((a: any) => a.ability.name),
            stats: {
                hp: stats.find((s: any) => s.stat.name === "hp")?.base_stat,
                attack: stats.find((s: any) => s.stat.name === "attack")?.base_stat,
                defense: stats.find((s: any) => s.stat.name === "defense")?.base_stat,
                special_attack: stats.find((s: any) => s.stat.name === "special-attack")?.base_stat,
                special_defense: stats.find((s: any) => s.stat.name === "special-defense")?.base_stat,
                speed: stats.find((s: any) => s.stat.name === "speed")?.base_stat,
            },
            moves: moves.map((e: any) => e?.move?.name),
            types: types.map((e: any) => e?.type?.name),
            color: colorValue.data.color.name
        };

        res.json(pokemon);
    } catch (error) {
        // console.error('Error fetching pokemon:', error);
        res.status(500).json({ error: 'Failed to fetch pokemon' });
    }
};

export const getAllPokemons = async (req: Request, res: Response) => {
    try {
        const { name } = req.query;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1002`);
        let data = response.data.results.map((pokemon: any, index: number) => ({
            ...pokemon,
            id: index + 1
        }));
        console.log("name", name)
        // If name query parameter exists, filter the results
        if (name && typeof name === 'string') {
            const searchTerm = name.toLowerCase();
            data = data.filter((pokemon: any) =>
                pokemon.name.toLowerCase().includes(searchTerm)
            );
        }
        const pokemons = await Promise.all(
            data.map(async (pokemon: any, index: number) => {

                // Only fetch detailed data for sound/cry if offset is less than 1025
                let sounds = { latest: "", legacy: "" };

                const details = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon?.id}`);
                const cries = details.data.cries;
                sounds = {
                    latest: cries?.latest || "",
                    legacy: cries?.legacy || "",
                };

                return {
                    name: pokemon.name,
                    url: pokemon.url,
                    id: pokemon?.id,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon?.id}.svg`,
                    sounds,
                };
            })
        );

        res.json(pokemons);
    } catch (error) {
        // console.error('Error fetching pokemons:', error);
        res.status(500).json({ error: 'Failed to fetch pokemons' });
    }
}