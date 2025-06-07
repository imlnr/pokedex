import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { AppState } from "@/lib/types";
import { getSinglePokemon } from "@/redux/AppReducer/action";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getColorClass } from "./dashboardUtils";
// import { Pokemon } from "@/lib/types";

interface PokemonPopupProps {
    pokemon: any | null;
    isOpen: boolean;
    onClose: () => void;
    originPosition: { x: number; y: number } | null;
}

const PokemonPopup = ({ pokemon, isOpen, onClose, originPosition }: PokemonPopupProps) => {
    const { isLoading, singlePokemon } = useSelector((e: AppState) => e);
    const dispatch = useDispatch();

    useEffect(() => {
        if (pokemon?.id && isOpen) {
            const fetchData = async () => {
                await dispatch(getSinglePokemon(pokemon.id) as any);
            }
            fetchData();
        }
    }, [pokemon?.id, isOpen, dispatch]);

    if (!isOpen) return null;
    if (isLoading) return <div>Loading....</div>;

    const maxStatValue = 255; // Maximum possible stat value in Pokemon

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog open={isOpen} onOpenChange={onClose}>
                    <DialogContent className={`sm:max-w-[600px] md:max-w-[700px] lg:max-w-[70vw] p-0 overflow-hidden ${getColorClass(singlePokemon.color)} border-none`}>
                        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-20">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </DialogClose>

                        {/* Watermark hashtag */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-[300px] font-bold text-gray-200/20 select-none">
                                #{pokemon.id.toString().padStart(3, '0')}
                            </span>
                        </div>

                        <motion.div
                            initial={originPosition ? {
                                scale: 0.5,
                                x: originPosition.x,
                                y: originPosition.y,
                                opacity: 0
                            } : {
                                scale: 0.5,
                                opacity: 0
                            }}
                            animate={{
                                scale: 1,
                                x: 0,
                                y: 0,
                                opacity: 1
                            }}
                            exit={{
                                scale: 0.5,
                                opacity: 0
                            }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 300
                            }}
                            className="p-6 relative z-10 overflow-y-auto max-h-[90vh]"
                        >
                            <div className="space-y-6">
                                {/* Header Section */}
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div className="text-center md:text-left">
                                        <h2 className="text-3xl font-bold capitalize">{singlePokemon.name}</h2>
                                        <div className="flex gap-2 mt-2 justify-center md:justify-start">
                                            {singlePokemon.types?.map((type: string) => (
                                                <span key={type} className="px-3 py-1 rounded-full text-sm bg-gray-100 capitalize">
                                                    {type}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="relative w-48 h-48">
                                        <img
                                            src={singlePokemon.image}
                                            alt={singlePokemon.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </div>

                                {/* Stats Section */}
                                <Card className="bg-transparent ">
                                    <CardHeader>
                                        <CardTitle>Base Stats</CardTitle>
                                    </CardHeader>
                                    <CardContent className="bg-transparent">
                                        <div className="space-y-4">
                                            {Object.entries(singlePokemon.stats || {}).map(([statName, value]) => (
                                                <div key={statName} className="space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="capitalize font-medium">{statName.replace('_', ' ')}</span>
                                                        <span className="text-muted-foreground">{value as number}</span>
                                                    </div>
                                                    <Progress
                                                        value={(value as number) / maxStatValue * 100}
                                                        className="h-6"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Details Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Physical Characteristics</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Height</span>
                                                    <span className="font-medium">{singlePokemon.height} m</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Weight</span>
                                                    <span className="font-medium">{singlePokemon.weight} kg</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Abilities</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                {singlePokemon.abilities?.map((ability: string) => (
                                                    <div key={ability} className="flex justify-between">
                                                        <span className="text-muted-foreground capitalize">{ability}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {singlePokemon.description && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Description</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground">{singlePokemon.description}</p>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </motion.div>
                    </DialogContent>
                </Dialog>
            )}
        </AnimatePresence>
    );
};

export default PokemonPopup; 