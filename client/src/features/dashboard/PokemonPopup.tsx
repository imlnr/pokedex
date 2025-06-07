import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { AppState } from "@/lib/types";
import { getSinglePokemon } from "@/redux/AppReducer/action";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getColorClass } from "./dashboardUtils";
import { Skeleton } from "@/components/ui/skeleton";
import { useSwipeable } from "react-swipeable";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// import { Pokemon } from "@/lib/types";

interface PokemonPopupProps {
    pokemon: any | null;
    isOpen: boolean;
    onClose: () => void;
    originPosition: { x: number; y: number } | null;
}

const PokemonPopupSkeleton = () => {
    return (
        <div className="p-6 relative z-10 overflow-y-auto max-h-[90vh]">
            <div className="space-y-6">
                {/* Header Section Skeleton */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-center md:text-left">
                        <Skeleton className="h-8 w-48 mb-2 bg-gray-200/20" />
                        <div className="flex gap-2 mt-2 justify-center md:justify-start">
                            <Skeleton className="h-6 w-20 rounded-full bg-gray-200/20" />
                            <Skeleton className="h-6 w-20 rounded-full bg-gray-200/20" />
                        </div>
                    </div>
                    <Skeleton className="w-48 h-48 rounded-lg bg-gray-200/20" />
                </div>

                {/* Stats Section Skeleton */}
                <Card className="bg-transparent">
                    <CardHeader>
                        <Skeleton className="h-6 w-32 bg-gray-200/20" />
                    </CardHeader>
                    <CardContent className="bg-transparent">
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between">
                                        <Skeleton className="h-4 w-24 bg-gray-200/20" />
                                        <Skeleton className="h-4 w-8 bg-gray-200/20" />
                                    </div>
                                    <Skeleton className="h-6 w-full bg-gray-200/20" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Details Section Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-48" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-16" />
                                </div>
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-16" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-32" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex justify-between">
                                        <Skeleton className="h-4 w-32" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Description Section Skeleton */}
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-20 w-full" />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

const PokemonPopup = ({ pokemon, isOpen, onClose, originPosition }: PokemonPopupProps) => {
    const { isLoading, singlePokemon } = useSelector((e: AppState) => e);
    const dispatch = useDispatch();
    const [currentPokemonId, setCurrentPokemonId] = useState<number | null>(null);
    const [showHint, setShowHint] = useState(true);

    // Add swipe handlers
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            if (currentPokemonId && currentPokemonId < 1302) {
                setCurrentPokemonId(currentPokemonId + 1);
            }
        },
        onSwipedRight: () => {
            if (currentPokemonId && currentPokemonId > 1) {
                setCurrentPokemonId(currentPokemonId - 1);
            }
        },
        preventScrollOnSwipe: true,
        trackMouse: false
    });

    useEffect(() => {
        if (pokemon?.id) {
            setCurrentPokemonId(pokemon.id);
        }
    }, [pokemon?.id]);

    useEffect(() => {
        if (currentPokemonId && isOpen) {
            const fetchData = async () => {
                await dispatch(getSinglePokemon(currentPokemonId) as any);
            }
            fetchData();
        }
    }, [currentPokemonId, isOpen, dispatch]);

    // Add keyboard navigation effect
    useEffect(() => {
        const handleKeyDown = async (event: KeyboardEvent) => {
            if (!isOpen || !currentPokemonId) return;

            if (event.key === 'ArrowRight' && currentPokemonId < 1302) {
                setCurrentPokemonId(currentPokemonId + 1);
            } else if (event.key === 'ArrowLeft' && currentPokemonId > 1) {
                setCurrentPokemonId(currentPokemonId - 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, currentPokemonId]);

    useEffect(() => {
        if (isOpen) {
            setShowHint(true);
            const timer = setTimeout(() => setShowHint(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen) return null;
    // if (isLoading) return <div>Loading....</div>;

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

                        {/* Navigation Hint */}
                        <AnimatePresence>
                            {showHint && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 z-30"
                                >
                                    <div className="hidden sm:flex items-center gap-1">
                                        <ArrowLeft className="w-4 h-4" />
                                        <span>Arrow Keys</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                    <div className="flex sm:hidden items-center gap-1">
                                        <Smartphone className="w-4 h-4" />
                                        <span>Swipe Left/Right</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Watermark hashtag */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-[150px] sm:text-[200px] md:text-[250px] lg:text-[300px] font-bold text-gray-200/20 select-none">
                                #{currentPokemonId?.toString().padStart(3, '0')}
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
                            {...swipeHandlers}
                        >
                            {isLoading ? (
                                <PokemonPopupSkeleton />
                            ) : (
                                <div className="space-y-6">
                                    {/* Header Section */}
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                        <div className="text-center md:text-left">
                                            <h2 className="text-3xl font-bold capitalize">{singlePokemon.name}</h2>
                                            <div className="flex gap-2 mt-2 justify-center md:justify-start">
                                                {singlePokemon.types?.map((type: string) => (
                                                    <Badge key={type} className="px-3 py-1 rounded-full text-sm capitalize">
                                                        {type}
                                                    </Badge>
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
                                    {
                                        singlePokemon?.moves && (
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>Moves</CardTitle>
                                                </CardHeader>
                                                <CardContent className="flex flex-wrap justify-start gap-1">
                                                    {singlePokemon?.moves?.slice(0, 10).map((move: string, index: number) => (
                                                        <p key={move} className="text-muted-foreground text-sm">
                                                            {move}{index < 9 ? ',' : ''}
                                                        </p>
                                                    ))}
                                                    {singlePokemon?.moves?.length > 10 && (
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger>
                                                                    <p className="text-muted-foreground text-sm cursor-pointer">...</p>
                                                                </TooltipTrigger>
                                                                <TooltipContent className="max-w-[300px] p-2">
                                                                    <div className="flex flex-wrap gap-1">
                                                                        {singlePokemon?.moves?.slice(10).map((move: string, index: number) => (
                                                                            <p key={move} className="text-muted-foreground text-sm">
                                                                                {move}{index < singlePokemon.moves.length - 11 ? ',' : ''}
                                                                            </p>
                                                                        ))}
                                                                    </div>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        )
                                    }
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
                            )}
                        </motion.div>
                    </DialogContent>
                </Dialog>
            )}
        </AnimatePresence>
    );
};

export default PokemonPopup; 