import express from "express"
import cors from "cors";
import PokemonRouter from "./routes/pokemon.routes";
import userRouter from "./routes/user.routes";
const app = express();
const PORT = process.env.PORT || 4500;
app.use(cors())
app.use(express.json());

app.use("/pokemon", PokemonRouter)
app.use("/user", userRouter)


app.get("/", (req, res) => {
    res.send("Hello from Node + TypeScript AsdfPI!");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});