import { Button } from '@/components/ui/button';
import type { AppState } from '@/lib/types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const pokemonImages = [
    { src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg', top: '10%', left: '5%' },
    { src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg', top: '20%', left: '75%' },
    { src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg', top: '30%', left: '10%' },
    { src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg', top: '50%', left: '80%' },
    { src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/39.svg', top: '65%', left: '15%' },
    { src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/133.svg', top: '75%', left: '70%' },
    { src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/150.svg', top: '85%', left: '35%' },
];

const Welcome = () => {
    const isLoggedIn = useSelector((e: AppState) => e.isLoggedIn);

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-yellow-100 to-white overflow-hidden">
            {/* Scattered Pokémon Images */}
            {pokemonImages.map((poke, i) => (
                <img
                    key={i}
                    src={poke.src}
                    alt={`pokemon-${i}`}
                    className="fixed z-0 w-28 h-28 object-contain sticker-style pointer-events-none opacity-40 md:opacity-100"
                    style={{
                        top: poke.top,
                        left: poke.left,
                    }}
                />
            ))}

            {/* Navigation Bar */}
            <nav className="relative z-10 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="flex items-center">
                            <img
                                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
                                alt="Pikachu"
                                className="h-10 w-10 mr-2"
                            />
                            <span className="text-xl font-bold text-primary">PokéDex</span>
                        </Link>
                        <div>
                            {isLoggedIn ? (
                                <Link to="/dashboard">
                                    <Button variant="default">Dashboard</Button>
                                </Link>
                            ) : (
                                <Link to="/login">
                                    <Button variant="default">Login</Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 flex flex-col h-screen md:h-full items-center justify-center text-center px-4 py-20">
                <h1 className="text-5xl font-bold text-primary mb-4">Easy Pokémon Discovery</h1>
                <p className="text-lg text-foreground max-w-xl mb-10">
                    Explore a universe of Pokémon with detailed stats, abilities, and much more!
                </p>
                <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md hover:shadow-xl transition-all duration-300 z-20">
                    <h2 className="text-2xl font-semibold mb-2">🔍 Pokémon Database</h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Dive into the PokéDex and start exploring.
                    </p>
                    <Link to="/dashboard">
                        <Button className="w-full">Start Exploring</Button>
                    </Link>
                </div>
            </section>

        </div>
    );
};

export default Welcome;
