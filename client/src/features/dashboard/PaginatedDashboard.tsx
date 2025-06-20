import DynamicPagination from '@/components/DynamicPagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { AppState } from '@/lib/types';
import { getPokemonData } from '@/redux/AppReducer/action';
import { Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PokemonSoundButton from './Sound';
import PokemonPopup from './PokemonPopup';
import { GET_LOADING_FALSE, GET_LOADING_TRUE } from '@/redux/AppReducer/action-types';

const PaginatedDashboard = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
  const pokemons = useSelector((e: AppState) => e.pokemonData);
  const loading = useSelector((e: AppState) => e.pageLoading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: GET_LOADING_TRUE })
        const response = await dispatch(getPokemonData(page) as any);
        if (response) {
          const totalPages = Math.ceil(response.count / response.limit);
          setTotalPage(totalPages);
          setError(null);
        }
        dispatch({ type: GET_LOADING_FALSE })
      } catch (err) {
        setError('Failed to fetch Pokemon data');
        console.error('Error fetching Pokemon data:', err);
        dispatch({ type: GET_LOADING_FALSE })

      }
    };

    fetchData();
  }, [dispatch, page]);
  // useEffect(() => {

  // }, [])

  const handleCardClick = (pokemon: any, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left - window.innerWidth / 2 + rect.width / 2;
    const y = rect.top - window.innerHeight / 2 + rect.height / 2;
    setPopupPosition({ x, y });
    setSelectedPokemon(pokemon);
  };

  const handleClosePopup = () => {
    setSelectedPokemon(null);
    setPopupPosition(null);
  };

  const handleSoundButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  if (loading) {
    return (
      <div className='h-full'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-5'>
          {Array.from({ length: 10 }).map((_, index) => (
            <Card key={index} className='w-full'>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="w-full aspect-square" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='h-full'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-5'>
        {
          pokemons.map((pokemon) => (
            <Suspense key={pokemon.id}>
              <Card
                className='transition-transform duration-200 hover:shadow-lg cursor-pointer h-[300px] group'
                onClick={(e) => handleCardClick(pokemon, e)}
              >
                <CardHeader className='flex items-center justify-between'>
                  <CardTitle>{pokemon.name}</CardTitle>
                  <div onClick={handleSoundButtonClick}>
                    <PokemonSoundButton soundUrl={pokemon?.sounds?.latest} />
                  </div>
                </CardHeader>
                <CardContent className="h-[calc(100%-80px)]">
                  <div className="relative w-full h-full">
                    <img
                      loading="lazy"
                      src={pokemon.image}
                      alt={pokemon.name}
                      className="absolute inset-0 w-full h-full object-contain transition-all duration-300 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://placehold.co/400x400?text=Pokemon+Not+Found";
                        target.onerror = null; // Prevent infinite loop
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </Suspense>
          ))
        }
      </div>

      <DynamicPagination onPageChange={setPage} currentPage={page} totalPages={totalPage} />

      <PokemonPopup
        pokemon={selectedPokemon}
        isOpen={!!selectedPokemon}
        onClose={handleClosePopup}
        originPosition={popupPosition}
      />
    </div>
  )
}

export default PaginatedDashboard