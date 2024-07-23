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
import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';

interface Film {
  title: string;
  episode_id: number;
  director: string;
  opening_crawl: string;
  release_date: string;
  characters: string[];
}

interface ApiResponse {
  results: Film[];
}

// Custom hook for localStorage
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

const FilmsSwapper = () => {
  const [favorites, setFavorites] = useLocalStorage<Film[]>('favorites', []);
  
  const { data, isLoading } = useQuery<Film[]>({
    queryKey: ['films'],
    queryFn: async () => {
      const response = await axios.get<ApiResponse>('https://swapi.dev/api/films/');
      return response.data.results;
    },
    refetchInterval: 60000,
    staleTime: 1000 * 60 * 5,
  });

  const handleFavoriteClick = useCallback((film: Film) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(f => f.episode_id === film.episode_id);
      if (isFavorite) {
        toast.success('Removed from favorites!', { id: `remove-${film.episode_id}` });
        return prevFavorites.filter(f => f.episode_id !== film.episode_id);
      } else {
        toast.success('Added to favorites!', { id: `add-${film.episode_id}` });
        return [...prevFavorites, film];
      }
    });
  }, [setFavorites]);

  const isFavorite = useCallback((episodeId: number) => 
    favorites.some(f => f.episode_id === episodeId),
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
        {data?.map((film, index) => (
          <SwiperSlide key={film.episode_id}>
            <div className='card relative bg-[#708871] text-white max-w-[300px] max-h-[450px] shadow-xl cursor-pointer group'>
              <figure className='px-4 pt-4'>
                <Image
                  src={`/images/img${index + 1}.jpg`}
                  alt={film.title}
                  width={200}
                  height={200}
                  className='rounded-xl'
                  placeholder='blur'
                  blurDataURL={`/images/img${index + 1}.jpg`}
                />
              </figure>
              <div className='card-body items-center text-center text-[#FEF3E2]'>
                <h2 className='card-title'>{film.title}</h2>
                <p className='text-sm overflow-y-auto h-24'>
                  {film.opening_crawl.split(' ').slice(0, 15).join(' ')}
                </p>
              </div>
              <div className="absolute z-50 top-[110%] left-0 right-0 bottom-0 bg-[#606676b2] flex justify-center items-center group-hover:top-0 group-hover:transition-all group-hover:ease-linear">
                <MdOutlineFavorite 
                  className={`${isFavorite(film.episode_id) ? 'text-red-600' : 'text-[#FEF3E2]'} text-[50px] hover:text-red-600`} 
                  onClick={() => handleFavoriteClick(film)}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FilmsSwapper;