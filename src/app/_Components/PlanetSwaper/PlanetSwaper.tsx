'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Loader from '../Loader/Loader';
import { MdOutlineFavorite } from "react-icons/md";
import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

interface Planet {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
}

interface ApiResponse {
  results: Planet[];
}

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}

const PlanetSwaper = () => {  
  const [favorites, setFavorites] = useLocalStorage<Planet[]>('favoritePlanets', []);

  const { data, isLoading } = useQuery<ApiResponse>({
    queryKey: ['planets'],
    queryFn: async () => {
      const response = await axios.get<ApiResponse>('https://swapi.dev/api/planets/');
      return response.data;
    },
    refetchInterval: 60000,
    staleTime: 1000 * 60 * 5,
  });

  const handleFavoriteClick = useCallback((planet: Planet) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(f => f.name === planet.name);
      if (isFavorite) {
        toast.success('Removed from favorites!', { id: `remove-${planet.name}` });
        return prevFavorites.filter(f => f.name !== planet.name);
      } else {
        toast.success('Added to favorites!', { id: `add-${planet.name}` });
        return [...prevFavorites, planet];
      }
    });
  }, [setFavorites]);

  const isFavorite = useCallback((name: string) => 
    favorites.some(f => f.name === name),
  [favorites]);

  if (isLoading) return <Loader />;

 
  return (
    <div className='p-4'>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          500: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        loop={true}
      >
        {data?.results.slice(0, -1).map((planet, index) => (
          <SwiperSlide key={planet.name}>
            <div className='card relative bg-[#708871] text-white w-full h-[400px] shadow-xl cursor-pointer group overflow-hidden flex flex-col'>
              <figure className='px-4 pt-4 flex-shrink-0'>
                <Image
                  src={`/images/planet${index + 1}.jpeg`}
                  alt={planet.name}
                  width={200}
                  height={200}
                  className='rounded-xl w-full h-[200px] object-cover'
                  placeholder='blur'
                  blurDataURL={`/images/planet${index + 1}.jpeg`}
                />
              </figure>
              <div className=' flex flex-col justify-between items-center text-center text-[#FEF3E2] p-4'>
                <h2 className=' text-xl font-bold py-3'>{planet.name}</h2>
                <div>
                  <p>Climate: {planet.climate}</p>
                  <p>Terrain: {planet.terrain}</p>
                  <p>Population: {planet.population}</p>
                </div>
              </div>
              <div className="absolute z-50 top-[110%] left-0 right-0 bottom-0 bg-[#606676b2] flex justify-center items-center group-hover:top-0 group-hover:transition-all group-hover:ease-linear">
                <MdOutlineFavorite 
                  className={`${isFavorite(planet.name) ? 'text-red-600' : 'text-[#FEF3E2]'} text-[50px] hover:text-red-600`} 
                  onClick={() => handleFavoriteClick(planet)}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PlanetSwaper;