import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import type { UserBody } from '@app/shared';

import NavBar from '@/components/NavBar';
import SidebarLayout from '@/components/SidebarLayout';
import Filter from '@/components/filter/Filter';
import RandomSentence from '@/components/home/RandomSentence';
import MatchingCard from '@/components/matching/MatchingCard';
import ConversationsList from '@/components/message/ConversationsList';
import { useAuth } from '@/contexts/AuthContext';
import { useConversation } from '@/contexts/ConversationContext';
import { useMatching } from '@/contexts/MatchingContext';
import { usePreference } from '@/contexts/PreferenceContext';

import Logo from '../components/icons/LogoHomeIcon';

export default function Home() {
  // State to store user profile
  const [userProfile, setUserProfile] = useState<UserBody>();

  const { isLoggedIn, isActivated, isLoading, userId } = useAuth();

  const { isVisibleFilter } = usePreference();
  const { isVisibleConversation, conversationId } = useConversation();
  const { isMatching } = useMatching();
  console.log('isMatching', isMatching);

  const location = useLocation();
  const isHome = location.pathname === '/';
  const isConversation =
    location.pathname === `/users/${userId}/conversations/${conversationId}`;

  // Check if the user profile is complete
  const hasCompleteProfile = userProfile;

  const hasChampProfile =
    hasCompleteProfile &&
    (Boolean(userProfile.name) ||
      Boolean(userProfile.birthdate) ||
      Boolean(userProfile.gender) ||
      Boolean(userProfile.city) ||
      userProfile.languages.length > 0 ||
      userProfile.technologies.length > 0 ||
      userProfile.hobbies.length > 0);

  // Fetch user profile
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchUserProfile = async () => {
      const res = await fetch(`/api/users/profile`, {
        signal,
      });

      const data = await res.json();

      setUserProfile(data[0]);
    };

    void fetchUserProfile();

    return () => {
      controller.abort();
    };
  }, [userId]);

  // If the user is logged in and the account is not actived, redirect to the validation page
  if (!isLoading && isLoggedIn && !Boolean(isActivated)) {
    return <Navigate to='/registration/validation' />;
  }

  // If the user is logged in and the account is actived but the user profile is not filled, redirect to the profile page
  if (
    isLoggedIn &&
    Boolean(isActivated) &&
    Boolean(hasCompleteProfile) &&
    !Boolean(hasChampProfile)
  ) {
    return <Navigate to='/registration/profile' />;
  }

  // If the user is logged in and the account is activated with all fields filled, return the main layout
  if (
    Boolean(
      isLoggedIn &&
        Boolean(isActivated) &&
        hasCompleteProfile &&
        hasChampProfile,
    )
  ) {
    return (
      <main className='h-auto min-h-screen overflow-y-auto overflow-x-hidden'>
        <NavBar />
        {/*   wait PR chat interaction for activate Matching card */}
        {isMatching ? <MatchingCard /> : undefined}

        {/* Display messages only in the home page when the width is superior to 1024px */}
        <div
          className={`font-base relative flex h-full w-full justify-between`}
        >
          {isHome || isConversation ? (
            <SidebarLayout isVisible={isVisibleConversation} isBorderLeft>
              <ConversationsList />
            </SidebarLayout>
          ) : undefined}

          <Outlet />

          {isHome ? (
            <SidebarLayout isVisible={isVisibleFilter} isBorderRight>
              <Filter />
            </SidebarLayout>
          ) : undefined}
        </div>
      </main>
    );
  }

  // If the user is not logged in, return the authentication page
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
