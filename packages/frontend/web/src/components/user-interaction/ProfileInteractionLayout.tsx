import { useEffect, useState } from 'react';
import { set } from 'react-hook-form';

import { useAuth } from '@/contexts/AuthContext';

import ProfileCard from './ProfileCard';
import ProfileHeader from './ProfileHeader';

const API_URL = import.meta.env.VITE_API_URL;

export interface InteractionBody {
  id: number;
  canceled_at: string;
  liked_at?: string;
  superlike_at?: string;
  next_at?: string;
  initiator: {
    id: number;
    name: string;
    city: {
      coordinates: {
        x: number;
        y: number;
      };
    };
  };
  receiver: {
    id: number;
    name: string;
    birthdate: string;
    pictures: {
      path: string;
    };
    city: {
      id: number;
      name: string;
      coordinates: {
        x: number;
        y: number;
      };
    };
    languages: {
      id: number;
      name: string;
    };
  };
}

export default function ProfileInteractionLayout() {
  const [interactions, setInteractions] = useState<InteractionBody[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { userId } = useAuth();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchInteractions = async () => {
      const res = await fetch(`${API_URL}/users/${userId}/interactions`, {
        signal,
        credentials: 'include',
      });

      const data = await res.json();

      setInteractions(data);
    };

    fetchInteractions().catch((error) => {
      throw new Error(`Failed to fetch users liked: ${String(error)}`);
    });

    return () => {
      controller.abort();
    };
  }, [userId]);

  console.log(interactions);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <section>
      <ProfileHeader handleClick={handleClick} isVisible={isVisible} />
      <section className='mx-2 my-4'>
        <div className='font-base grid grid-cols-2 gap-2 text-white md:grid-cols-3'>
          {isVisible
            ? interactions.map((interaction) => (
                <ProfileCard key={interaction.id} interaction={interaction} />
              ))
            : undefined}
        </div>
      </section>
    </section>
  );
}
