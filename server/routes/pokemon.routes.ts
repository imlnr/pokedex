
import express from "express"
import { fetAllPokemon, getAllPokemons, getSinglePokemon } from "../controllers/pokemon.controllers";
import { verifyGoogleToken } from "../middlewares/auth.middleware";
const PokemonRouter = express.Router();
PokemonRouter.get('/all/paginated', fetAllPokemon);
PokemonRouter.get('/:id', getSinglePokemon);
PokemonRouter.get('/search/all', getAllPokemons);

export default PokemonRouter