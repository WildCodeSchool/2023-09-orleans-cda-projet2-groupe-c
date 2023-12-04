import { Outlet } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';

import { sentences } from '../components/home/random-sentence';
import Logo from '../components/svg/Logo';

// Select a random sentence from the array "sentences"
const randomSentence: string =
  sentences[Math.floor(Math.random() * sentences.length)];

export default function Home() {
  const { isLoggedIn, isLoading } = useAuth();

  return isLoading ? (
    <p>{`Loading...`}</p>
  ) : (
    <main className='bg-background text-light-light h-screen w-screen overflow-hidden bg-cover bg-center bg-no-repeat p-5 text-center'>
      <section className='flex h-full flex-col items-center justify-between'>
        <header className='mt-32 flex flex-col items-center justify-center gap-4'>
          <Logo />
          <h1 className='font-title text-6xl'>{`Tindev`}</h1>
          {/* Display a random sentence */}
          <h2 className='font-base text-base'>{randomSentence}</h2>
        </header>

        {isLoggedIn ? 'connected' : 'not connected'}

        {/* Render the child routes */}
        <Outlet />
      </section>
    </main>
  );
}
