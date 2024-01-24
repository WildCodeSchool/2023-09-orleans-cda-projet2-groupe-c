/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import type { UserBody } from '@app/shared';

import { useAuth } from '@/contexts/AuthContext';
import useDateFormatted from '@/hooks/use-date-formatted';

import Button from '../Button';
import BookIcon from '../icons/BookIcon';
import CodeIcon from '../icons/CodeIcon';
import DateIcon from '../icons/DateIcon';
import GenderIcon from '../icons/GenderIcon';
import GitHubIcon from '../icons/GitHubIcon';
import LikeIcon from '../icons/LikeIcon';
import LocationIcon from '../icons/LocationIcon';
import TechnoIcon from '../icons/TechnoIcon';
import UserIcon from '../icons/UserIcon';
import CircularProgressBar from './CircularProgressBar';
import ProfileMenu from './ProfileMenu';

const API_URL = import.meta.env.VITE_API_URL;

export default function Profile() {
  const { userId } = useAuth();
  const { profileId } = useParams();

  const [user, setUser] = useState<UserBody>();
  const [error, setError] = useState<string>();
  const [percentage, setPercentage] = useState<number>(10);

  const birthdateFormatted = useDateFormatted({ dateString: user?.birthdate });

  // Check if the user is allowed to access this page
  useEffect(() => {
    if (userId !== Number(profileId)) {
      console.error('You are not allowed to access this page');
    }
  }, [userId, profileId]);

  // Fetch information about the user logged in
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchUser = async () => {
      const res = await fetch(`${API_URL}/users/${userId}/profile`, {
        signal,
        credentials: 'include',
      });

      const data = await res.json();

      setUser(data[0]);
    };

    fetchUser().catch(() => {
      setError('Failed to fetch user');
    });

    return () => {
      controller.abort();
    };
  }, [userId]);

  // If the user is not logged in, don't render anything
  if (!user) {
    return;
  }

  const userData = [
    {
      id: 1,
      content: user.name,
      icon: <UserIcon className='fill-secondary h-5 w-5' />,
      isEmpty: !user.name,
    },
    {
      id: 2,
      content: 'Biography',
      icon: <BookIcon className='fill-secondary h-5 w-5' />,
      isEmpty: !user.biography,
    },
    {
      id: 3,
      content: String(birthdateFormatted),
      icon: <DateIcon className='fill-secondary h-5 w-5' />,
      isEmpty: !user.birthdate,
    },
    {
      id: 4,
      content: user.gender.charAt(0).toUpperCase() + user.gender.slice(1),
      icon: <GenderIcon className='fill-secondary h-5 w-5' />,
      isEmpty: !user.gender,
    },
    {
      id: 5,
      content: user.city.city_name,
      icon: <LocationIcon className='fill-secondary h-5 w-5' />,
      isEmpty: !user.city.city_name,
    },
    {
      id: 6,
      content: 'Hobbies',
      icon: <LikeIcon className='fill-secondary h-5 w-5' />,
      isEmpty: user.hobbies.length === 0,
    },
    {
      id: 7,
      content: 'Languages',
      icon: <CodeIcon className='fill-secondary h-5 w-5' />,
      isEmpty: user.languages.length === 0,
    },
    {
      id: 8,
      content: 'Technologies',
      icon: <TechnoIcon className='fill-secondary stroke-secondary h-5 w-5' />,
      isEmpty: user.technologies.length === 0,
    },
    {
      id: 9,
      content: 'Github',
      icon: <GitHubIcon className='fill-secondary h-5 w-5' />,
      isEmpty: !user.account_github,
    },
  ];

  return (
    <div className='font-base text-md flex h-[calc(100vh-55px)] w-full flex-col items-center justify-between py-12'>
      <div className='bg-light-medium mx-auto flex h-full w-full max-w-[500px] flex-col items-center'>
        <CircularProgressBar percentage={percentage} circleWidth={200} />
        <div className='h-40 w-40 overflow-hidden rounded-full'>
          <img src={user.pictures[0].picture_path} alt='' />
        </div>
        <p>{user.name}</p>
        <section className='flex max-h-[500px] w-full flex-col gap-[2px] overflow-hidden rounded-lg'>
          {userData.map((data) => (
            <ProfileMenu key={data.id} icon={data.icon} isEmpty={data.isEmpty}>
              {data.content}
            </ProfileMenu>
          ))}
        </section>
      </div>
      <Button type='button' isOutline={false}>
        {`Logout`}
      </Button>
    </div>
  );
}
