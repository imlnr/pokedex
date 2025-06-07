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
        console.log(offset, limit)
        console.log(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        console.log(response.data)

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
        console.error('Error fetching pokemons:', error);
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

        const { height, weight, abilities, stats } = response.data;

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
            color: colorValue.data.color.name
        };

        res.json(pokemon);
    } catch (error) {
        console.error('Error fetching pokemon:', error);
        res.status(500).json({ error: 'Failed to fetch pokemon' });
    }
};

