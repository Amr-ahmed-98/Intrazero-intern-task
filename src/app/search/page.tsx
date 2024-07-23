'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import Image from 'next/image';

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
interface ApiResponsePeople {
  results: Character[];
}

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

interface ApiResponsePlanet {
  results: Planet[];
}



const Search = () => {
  const [search, setSearch] = useState<string>('');
  const [searchType, setSearchType] = useState<'all' | 'films' | 'people' | 'planets'>('all');

  const { data: dataFilms } = useQuery({
    queryKey: ['filmss', search],
    queryFn: async () => {
      const response = await axios.get<ApiResponse>(
        `https://swapi.py4e.com/api/films/?search=${search}`
      );
      return response.data.results;
    },
    enabled: searchType === 'all' || searchType === 'films',
  });

  const { data: dataPeople } = useQuery({
    queryKey: ['peoplee', search],
    queryFn: async () => {
      const response = await axios.get<ApiResponsePeople>(
        `https://swapi.py4e.com/api/people/?search=${search}`
      );
      return response.data.results;
    },
    enabled: searchType === 'all' || searchType === 'people',
  });

  const { data: dataPlanets } = useQuery({
    queryKey: ['palanetss', search],
    queryFn: async () => {
      const response = await axios.get<ApiResponsePlanet>(
        `https://swapi.py4e.com/api/planets/?search=${search}`
      );
      return response.data.results;
    },
    enabled: searchType === 'all' || searchType === 'planets',
  });

  const handleSearch = (value: string, type: 'all' | 'films' | 'people' | 'planets') => {
    setSearch(value);
    setSearchType(type);
  };

  return (
    <>
      <title>Search</title>
      <div className='min-h-screen'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
            <label className='input input-bordered flex items-center gap-2 bg-[#BEC6A0] my-2'>
              <input
                type='text'
                className='grow text-[#FEF3E2] text-xl sm:text-2xl lg:text-3xl placeholder:text-[#FEF3E2]'
                placeholder='Search For All'
                value={searchType === 'all' ? search : ''}
                onChange={(e) => handleSearch(e.target.value, 'all')}
              />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
                fill='currentColor'
                className='h-4 w-4 opacity-70'
              >
                <path
                  fillRule='evenodd'
                  d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
                  clipRule='evenodd'
                />
              </svg>
            </label>
            <label className='input input-bordered flex items-center gap-2 bg-[#BEC6A0] my-2'>
              <input
                type='text'
                className='grow text-[#FEF3E2] text-xl sm:text-2xl lg:text-3xl placeholder:text-[#FEF3E2]'
                placeholder='Search For Films'
                value={searchType === 'films' ? search : ''}
                onChange={(e) => handleSearch(e.target.value, 'films')}
              />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
                fill='currentColor'
                className='h-4 w-4 opacity-70'
              >
                <path
                  fillRule='evenodd'
                  d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
                  clipRule='evenodd'
                />
              </svg>
            </label>
            <label className='input input-bordered flex items-center gap-2 bg-[#BEC6A0] my-2'>
              <input
                type='text'
                className='grow text-[#FEF3E2] text-xl sm:text-2xl lg:text-3xl placeholder:text-[#FEF3E2]'
                placeholder='Search For People'
                value={searchType === 'people' ? search : ''}
                onChange={(e) => handleSearch(e.target.value, 'people')}
              />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
                fill='currentColor'
                className='h-4 w-4 opacity-70'
              >
                <path
                  fillRule='evenodd'
                  d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
                  clipRule='evenodd'
                />
              </svg>
            </label>
            <label className='input input-bordered flex items-center gap-2 bg-[#BEC6A0] my-2'>
              <input
                type='text'
                className='grow text-[#FEF3E2] text-xl sm:text-2xl lg:text-3xl placeholder:text-[#FEF3E2]'
                placeholder='Search For Planets'
                value={searchType === 'planets' ? search : ''}
                onChange={(e) => handleSearch(e.target.value, 'planets')}
              />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
                fill='currentColor'
                className='h-4 w-4 opacity-70'
              >
                <path
                  fillRule='evenodd'
                  d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
                  clipRule='evenodd'
                />
              </svg>
            </label>
          </div>
          
          {(searchType === 'all' || searchType === 'films') && (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-5'>
              {dataFilms?.map((film, index) => (
                <div
                  key={index}
                  className='bg-[#708871] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300'
                >
                  <div className='relative h-48'>
                    <Image
                      src={`/images/img${index + 1}.jpg`}
                      alt={film.title}
                      layout='fill'
                      objectFit='cover'
                      className='transition-transform duration-300 hover:scale-105'
                    />
                  </div>
                  <div className='p-4 text-[#FEF3E2]'>
                    <h3 className='text-xl font-bold mb-2  truncate'>
                      {film.title}
                    </h3>
                    <p className='text-sm  mb-1'>
                      Director: {film.director}
                    </p>
                    <p className='text-sm '>
                      Episode ID: {film.episode_id}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {(searchType === 'all' || searchType === 'people') && (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-5'>
              {dataPeople?.map((person, index) => (
                <div
                  key={index}
                  className='bg-[#708871] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300'
                >
                  <div className='relative h-48'>
                    <Image
                      src={`/images/person${index + 1}.jpeg`}
                      alt={person.name}
                      layout='fill'
                      objectFit='cover'
                      className='transition-transform duration-300 hover:scale-105'
                    />
                  </div>
                  <div className='p-4 text-[#FEF3E2]'>
                    <h3 className='text-xl font-bold mb-2 truncate'>
                      {person.name}
                    </h3>
                    <p className='text-sm  mb-1'>
                      Gender: {person.gender}
                    </p>
                    <p className='text-sm '>
                      Birth Year: {person.birth_year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {(searchType === 'all' || searchType === 'planets') && (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-5'>
              {dataPlanets?.slice(0, -1)?.map((planet, index) => (
                <div
                  key={index}
                  className='bg-[#708871] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300'
                >
                  <div className='relative h-48'>
                    <Image
                      src={`/images/planet${index + 1}.jpeg`}
                      alt={planet.name}
                      layout='fill'
                      objectFit='cover'
                      className='transition-transform duration-300 hover:scale-105'
                    />
                  </div>
                  <div className='p-4 text-[#FEF3E2]'>
                    <h3 className='text-xl font-bold mb-2  truncate'>
                      {planet.name}
                    </h3>
                    <p className='text-sm  mb-1'>
                      Climate: {planet.climate}
                    </p>
                    <p className='text-sm '>
                      Population: {planet.population}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;