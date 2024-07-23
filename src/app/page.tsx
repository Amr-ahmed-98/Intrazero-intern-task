import { Toaster } from 'react-hot-toast';
import '../app/globals.css';
import FilmsSwaper from './_Components/FilmsSwaper/FilmsSwaper';
import PeopleSwaper from './_Components/PeopleSwaper/PeopleSwaper';
import PlanetSwaper from './_Components/PlanetSwaper/PlanetSwaper';



const Home = ()=> {
  return (
    <main className='min-h-screen '>
      <title>Star Wars App</title>
      <Toaster />
      <div className='container'>
        <div>
          <h2 className='text-[#606676] text-3xl font-bold p-10 border-[#606676] border-b-2 inline-block '>
            Swap for films
          </h2>
          <FilmsSwaper />
        </div>
        <div>
          <h2 className='text-[#606676] text-3xl font-bold p-10 border-[#606676] border-b-2 inline-block '>
            Swap for people
          </h2>
          <PeopleSwaper />
        </div>
        <div>
          <h2 className='text-[#606676] text-3xl font-bold p-10 border-[#606676] border-b-2 inline-block '>
            Swap for Planets
          </h2>
          <PlanetSwaper/>
        </div>
      </div>
    </main>
  );
}


export default Home;