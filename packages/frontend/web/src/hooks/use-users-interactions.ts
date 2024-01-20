import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import type { InteractionReceivedBody, InteractionSentBody } from '@app/shared';

import { useAuth } from '@/contexts/AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

interface FetchInteractions {
  userId: number;
  interactionType: string;
  signal: AbortSignal;
  setter:
    | React.Dispatch<React.SetStateAction<InteractionSentBody[]>>
    | React.Dispatch<React.SetStateAction<InteractionReceivedBody[]>>;
}

// Function to fetch all interactions sent or received
const fetchInteractions = async ({
  userId,
  interactionType,
  signal,
  setter,
}: FetchInteractions) => {
  const profileLiked = await fetch(
    `${API_URL}/users/${userId}/interactions/${interactionType}`,
    {
      signal,
      credentials: 'include',
    },
  );

  const data = await profileLiked.json();

  setter(data);
};

export default function useUsersInteractions() {
  const [interactionsSent, setInteractionsSent] = useState<
    InteractionSentBody[]
  >([]);
  const [interactionsReceived, setInteractionsReceived] = useState<
    InteractionReceivedBody[]
  >([]);

  // State to toggle the visibility of the profile header
  const [isVisible, setIsVisible] = useState<boolean>(true);

  // Get the user id JWT from the context
  const { userId } = useAuth();

  // Get the profile id from the URL
  const { profileId } = useParams();

  // Hook to navigate to another page
  const navigate = useNavigate();

  // Function to toggle the visibility of the profile header
  const handleClick = (button: 'profileLiked' | 'usersLikedMe') => {
    // If the button clicked is the same as the one already clicked, do nothing
    if (
      (button === 'profileLiked' && isVisible) ||
      (button === 'usersLikedMe' && !isVisible)
    ) {
      return;
    }

    setIsVisible(!isVisible);
  };

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

    fetchInteractions({
      userId: Number(userId),
      interactionType: 'sent',
      signal,
      setter: setInteractionsSent,
    }).catch((error) => {
      throw new Error(`Failed to fetch users liked: ${String(error)}`);
    });

    fetchInteractions({
      userId: Number(userId),
      interactionType: 'received',
      signal,
      setter: setInteractionsReceived,
    }).catch((error) => {
      throw new Error(`Failed to fetch users liked: ${String(error)}`);
    });

    return () => {
      controller.abort();
    };
  }, [userId]);

  return { interactionsSent, interactionsReceived, isVisible, handleClick };
}
