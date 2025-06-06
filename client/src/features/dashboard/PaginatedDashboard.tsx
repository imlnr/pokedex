import DynamicPagination from '@/components/DynamicPagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { AppState } from '@/lib/types';
import { getPokemonData } from '@/redux/AppReducer/action';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const PaginatedDashboard = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const pokemons = useSelector((e: AppState) => e.pokemonData);
  const loading = useSelector((e: AppState) => e.isLoading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getPokemonData(page) as any);
        if (response) {
          const totalPages = Math.ceil(response.count / response.limit);
          setTotalPage(totalPages);
          // setData(response);
          setError(null);
        }
      } catch (err) {
        setError('Failed to fetch Pokemon data');
        console.error('Error fetching Pokemon data:', err);
      }
    };

    fetchData();
  }, [dispatch, page]);

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
            <Card key={pokemon.id} className='transition-transform duration-200 hover:shadow-lg'>
              <CardHeader>
                <CardTitle>{pokemon.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img loading="lazy" src={pokemon.image} alt={pokemon.name} className="w-full h-auto" />
              </CardContent>
            </Card>
          ))
        }
      </div>
      <DynamicPagination onPageChange={setPage} currentPage={page} totalPages={totalPage} />
    </div>
  )
}

export default PaginatedDashboard