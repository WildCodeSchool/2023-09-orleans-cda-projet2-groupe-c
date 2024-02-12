import { Outlet, useLocation } from 'react-router-dom';

import NavBar from '@/components/NavBar';
import SidebarLayout from '@/components/SidebarLayout';
import Filter from '@/components/filter/Filter';
import RandomSentence from '@/components/home/RandomSentence';
import { useAuth } from '@/contexts/AuthContext';
import { usePreference } from '@/contexts/PreferenceContext';

import Loading from '../components/Loading';
import Logo from '../components/icons/LogoHomeIcon';

export default function Home() {
  const { isLoggedIn, isLoading } = useAuth();
  const { isVisibleFilter } = usePreference();

  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  if (isLoggedIn) {
    return (
      <main className='h-screen overflow-hidden'>
        <NavBar />

        {/* Display messages only in the home page when the width is superior to 1024px */}
        <div className='font-base relative flex h-[calc(100vh-56px)] w-full justify-between'>
          {location.pathname === '/' ? (
            <SidebarLayout isVisible={isVisibleFilter} isBorderLeft>
              {`Messages`}
            </SidebarLayout>
          ) : undefined}

          {/* Display messages in all page when the width is under to 1024px */}
          {window.innerWidth < 1024 ? (
            <SidebarLayout isVisible={isVisibleFilter} isBorderRight>
              <SidebarLayout isVisible={isVisibleFilter} isBorderLeft>
                {`Messages`}
              </SidebarLayout>
            </SidebarLayout>
          ) : undefined}

          <Outlet />

          {/* Display filter only in the home page when the width is superior to 1024px */}
          {location.pathname === '/' ? (
            <SidebarLayout isVisible={isVisibleFilter} isBorderRight>
              <Filter />
            </SidebarLayout>
          ) : undefined}

          {/* Display filter in all page when the width is under to 1024px */}
          {window.innerWidth < 1024 ? (
            <SidebarLayout isVisible={isVisibleFilter} isBorderRight>
              <Filter />
            </SidebarLayout>
          ) : undefined}
        </div>
      </main>
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
