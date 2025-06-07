import { Button } from '@/components/ui/button';
import type { AppState } from '@/lib/types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Welcome = () => {
    const isLoggedIn = useSelector((e: AppState) => e.isLoggedIn);
    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-blue-100 to-white">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center">
                                <img
                                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
                                    alt="Pikachu"
                                    className="h-12 w-12 mr-2"
                                />
                                <span className="text-xl font-bold text-primary">PokéDex</span>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            {
                                isLoggedIn ? <Link to="/dashboard">
                                    <Button variant="default">
                                        Dashboard
                                    </Button>
                                </Link> :
                                    <Link to="/login">
                                        <Button variant="default">
                                            Login
                                        </Button>
                                    </Link>
                            }
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center animate-fade-in-up">
                    <h1 className="text-5xl font-bold mb-6 text-gray-800">
                        Welcome to the World of Pokémon
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto">
                        Discover and learn about your favorite Pokémon.
                        Explore our comprehensive database to learn about their abilities, stats, and more!
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <Link
                            to="/dashboard"
                            className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                        >
                            <div className="text-4xl mb-4">🔍</div>
                            <h3 className="font-semibold text-lg mb-2">Pokémon Database</h3>
                            <p className="text-sm text-gray-600">Browse through our complete collection of Pokémon</p>
                        </Link>
                        <Link
                            to="/dashboard"
                            className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                        >
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="font-semibold text-lg mb-2">Pokémon Stats & Abilities</h3>
                            <p className="text-sm text-gray-600">Learn about their strengths, weaknesses, and special abilities</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
