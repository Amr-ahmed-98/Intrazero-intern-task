'use client';
import { useState, useEffect } from 'react';
import { MdOutlineFavorite } from "react-icons/md";

interface Film {
  title: string;
  director: string;
  episode_id: number;
 
}

interface Person {
  name: string;
  birth_year: string;
  gender: string;
  
}

interface Planet {
  name: string;
  climate: string;
  terrain: string;

}

const Favorite = () => {
  const [favoriteFilms, setFavoriteFilms] = useState<Film[]>([]);
  const [favoritePeople, setFavoritePeople] = useState<Person[]>([]);
  const [favoritePlanets, setFavoritePlanets] = useState<Planet[]>([]);

  useEffect(() => {
    const storedFavoriteFilms: Film[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    const storedFavoritePeople: Person[] = JSON.parse(localStorage.getItem('favoritePeople') || '[]');
    const storedFavoritePlanets: Planet[] = JSON.parse(localStorage.getItem('favoritePlanets') || '[]');

    setFavoriteFilms(storedFavoriteFilms);
    setFavoritePeople(storedFavoritePeople);
    setFavoritePlanets(storedFavoritePlanets);
  }, []);

  const renderFavorites = <T extends Film | Person | Planet>(favorites: T[], title: string) => (
    <div className="mb-10">
      <h2 className="text-[#606676] text-3xl font-bold p-10 border-[#606676] border-b-2 inline-block">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {favorites.map((item, index) => (
          <div key={index} className="bg-[#708871] p-4 rounded-lg text-white">
            <h3 className="text-xl font-bold mb-2">{('title' in item) ? item.title : item.name}</h3>
            {'director' in item && <p>Director: {item.director}</p>}
            {'climate' in item && <p>Climate: {item.climate}</p>}
            {'terrain' in item && <p>Terrain: {item.terrain}</p>}
            {'birth_year' in item && <p>Birth Year: {item.birth_year}</p>}
            {'gender' in item && <p>Gender: {item.gender}</p>}
            <MdOutlineFavorite className="text-red-600 text-2xl mt-2" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-4">
      <title>Favorites</title>
      <div className='container mx-auto'>
        {renderFavorites(favoriteFilms, "Your Favorite Films")}
        {renderFavorites(favoritePeople, "Your Favorite People")}
        {renderFavorites(favoritePlanets, "Your Favorite Planets")}
      </div>
    </div>
  );
};

export default Favorite;