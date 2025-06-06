
import express from "express"
import { fetAllPokemon } from "../controllers/pokemon.controllers";
import { verifyGoogleToken } from "../middlewares/auth.middleware";
const PokemonRouter = express.Router();
PokemonRouter.get('/all', verifyGoogleToken, fetAllPokemon);

export default PokemonRouter