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
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

interface Character {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
}

interface ApiResponse {
  results: Character[];
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

const PeopleSwaper = () => {
  const [favorites, setFavorites] = useLocalStorage<Character[]>('favoritePeople', []);

  const { data, isLoading } = useQuery<ApiResponse>({
    queryKey: ['people'],
    queryFn: async () => {
      const response = await axios.get<ApiResponse>('https://swapi.dev/api/people/');
      return response.data;
    },
    refetchInterval: 60000,
    staleTime: 1000 * 60 * 5,
    refetchIntervalInBackground: true,
  });

  const handleFavoriteClick = useCallback((character: Character) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(f => f.name === character.name);
      if (isFavorite) {
        toast.success('Removed from favorites!', { id: `remove-${character.name}` });
        return prevFavorites.filter(f => f.name !== character.name);
      } else {
        toast.success('Added to favorites!', { id: `add-${character.name}` });
        return [...prevFavorites, character];
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
        {data?.results.map((character, index) => (
          <SwiperSlide key={character.name}>
            <div className=' relative bg-[#708871] text-white max-w-[300px] max-h-[450px] shadow-xl cursor-pointer group rounded-md'>
              <div className='w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full'>
                <Image
                  src={`/images/person${index + 1}.jpeg`}
                  alt={character.name}
                  width={200}
                  height={200}
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='card-body items-center text-center text-[#FEF3E2]'>
                <h2 className='card-title'>{character.name}</h2>
                <p>Birth Year: {character.birth_year}</p>
                <p>Gender: {character.gender}</p>
              </div>
              <div className="absolute z-50 top-[110%] left-0 right-0 bottom-0 bg-[#606676b2] flex justify-center items-center group-hover:top-0 group-hover:transition-all group-hover:ease-linear">
                <MdOutlineFavorite 
                  className={`${isFavorite(character.name) ? 'text-red-600' : 'text-[#FEF3E2]'} text-[50px] hover:text-red-600`} 
                  onClick={() => handleFavoriteClick(character)}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PeopleSwaper;