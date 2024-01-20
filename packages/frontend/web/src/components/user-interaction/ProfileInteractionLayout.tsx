import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ProfileCard from '@/components/user-interaction/ProfileCard';
import ProfileHeader from '@/components/user-interaction/ProfileHeader';
import { useAuth } from '@/contexts/AuthContext';

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
  // const [userLikedMe, setUserLikedMe] = useState([]);

  // State to toggle the visibility of the profile header
  const [isVisible, setIsVisible] = useState<boolean>(true);

  // Get the user id from the JWT
  const { userId } = useAuth();

  // Get the profile id from the URL
  const { profileId } = useParams();

  const navigate = useNavigate();

  // Check if the user is allowed to see this page
  useEffect(() => {
    if (userId !== Number(profileId)) {
      navigate('/error');
    }
  }, [navigate, profileId, userId]);

  // Fetch the users the user logged in have interacted with
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchInteractions = async () => {
      const profileLiked = await fetch(
        `${API_URL}/users/${userId}/interactions`,
        {
          signal,
          credentials: 'include',
        },
      );

      const data = await profileLiked.json();

      setInteractions(data);
    };

    fetchInteractions().catch((error) => {
      throw new Error(`Failed to fetch users liked: ${String(error)}`);
    });

    return () => {
      controller.abort();
    };
  }, [userId]);

  // Function to toggle the visibility of the profile header
  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <section className='lg:mx-auto lg:max-w-[1200px]'>
      <ProfileHeader handleClick={handleClick} isVisible={isVisible} />

      <div className='mx-5 my-10'>
        {isVisible && interactions.length > 0 ? (
          <div className='font-base grid grid-cols-2 gap-2 text-white md:grid-cols-3 lg:grid-cols-4'>
            {interactions.map((interaction) => (
              <ProfileCard key={interaction.id} interaction={interaction} />
            ))}
          </div>
        ) : (
          <p className='text-secondary font-base'>{`There are no interactions yet!`}</p>
        )}
      </div>
    </section>
  );
}
