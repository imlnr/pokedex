
import express from "express"
import { fetAllPokemon, getSinglePokemon } from "../controllers/pokemon.controllers";
import { verifyGoogleToken } from "../middlewares/auth.middleware";
const PokemonRouter = express.Router();
PokemonRouter.get('/all', fetAllPokemon);
PokemonRouter.get('/:id', getSinglePokemon);

export default PokemonRouter