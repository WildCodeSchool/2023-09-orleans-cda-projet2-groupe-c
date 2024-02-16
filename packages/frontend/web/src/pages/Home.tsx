import { Outlet } from 'react-router-dom';

import NavBar from '@/components/NavBar';
import RandomSentence from '@/components/home/RandomSentence';
import ConversationsList from '@/components/message/ConversationsList';
import { useAuth } from '@/contexts/AuthContext';
import ConversationContext from '@/contexts/ConversationContext';
import MatchingContext from '@/contexts/MatchingContext';

import Loading from '../components/Loading';
import Logo from '../components/icons/LogoHomeIcon';

export default function Home() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (isLoggedIn) {
    return (
      <ConversationContext>
        <MatchingContext>
          <main className='h-screen overflow-hidden'>
            <NavBar />
            <div className='font-base relative flex h-[calc(100vh-56px)] w-full justify-between'>
              <ConversationsList />
              <Outlet />
            </div>
          </main>
        </MatchingContext>
      </ConversationContext>
    );
  }

  return (
    <main className='bg-background text-light h-screen w-screen overflow-hidden bg-cover bg-center bg-no-repeat p-5 text-center'>
      <section className='flex h-full flex-col items-center justify-between'>
        <header className='mt-32 flex flex-col items-center justify-center gap-4'>
          <Logo color='fill-light' />
          <h1 className='font-title text-6xl'>{`Tindev`}</h1>
          {/* Display a random sentence */}
          <RandomSentence />
        </header>

        {/* Render the child routes */}
        <Outlet />
      </section>
    </main>
  );
}
