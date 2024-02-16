import { useCallback, useEffect, useState } from 'react';

import type { UserBody } from '@app/shared';

import { useMatching } from '@/contexts/MatchingContext';

import useAllConversations from './use-all-conversations';

const API_URL = import.meta.env.VITE_API_URL;

export default function useInteractions({ ...props }) {
  const { userId } = props;

  const [selectedUser, setSelectedUser] = useState<UserBody>();
  const [superLikesCount, setSuperLikesCount] = useState<number>(0);
  const { fetchConversations } = useAllConversations();
  /*  const { fetchConversations} = useMatching()  */

  // Fetch user's superlike from the API
  const fetchUsers = useCallback(
    async ({ signal }: { signal: AbortSignal }) => {
      const res = await fetch(`${API_URL}/users/${userId}`, {
        signal,
        credentials: 'include',
      });
      const data = await res.json();

      // Set a list of user interactions in the state "superLike"
      setSelectedUser(data[0]);
    },
    [userId, setSelectedUser],
  );

  // Fetch user's superlike from the API
  const fetchUserSuperLikeCount = useCallback(
    async ({ signal }: { signal: AbortSignal }) => {
      const res = await fetch(
        `${API_URL}/users/${userId}/interactions/superlike/count`,
        {
          signal,
          credentials: 'include',
        },
      );
      const data = await res.json();

      // Set a list of user interactions in the state "superLike"
      setSuperLikesCount(data);
    },
    [userId, setSuperLikesCount],
  );

  // Fetch users and superlikes count from the user logged in
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchUsers({ signal }).catch((error) => {
      throw new Error(`Fail to fetch users: ${String(error)}`);
    });

    fetchUserSuperLikeCount({ signal }).catch((error) => {
      throw new Error(`Fail to fetch user's superlike: ${String(error)}`);
    });

    // Abort all fetch requests if the component is unmounted
    return () => {
      controller.abort();
    };
  }, [fetchUserSuperLikeCount, fetchUsers]);

  // Handle the interactions
  const handleInteraction = async (interactionType: string) => {
    try {
      // Send a request to the API to like, superlike or next a user
      await fetch(
        `${API_URL}/users/${userId}/interactions/${interactionType}`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            receiver_id: selectedUser?.id, // Send in the body the id of the selected user
          }),
        },
      );

      // Fetch selected user and superlikes count from the user logged in to display the next user and the remaining superlikes count
      const controller = new AbortController();
      const signal = controller.signal;

      fetchUsers({ signal }).catch((error) => {
        throw new Error(`Fail to fetch users: ${String(error)}`);
      });

      fetchUserSuperLikeCount({ signal }).catch((error) => {
        throw new Error(`Fail to fetch user's superlike: ${String(error)}`);
      });

      fetchConversations({ signal }).catch(() => {
        throw new Error(`Fail to fetch conversations}`);
      });

      // Abort all fetch requests if the component is unmounted
      return () => {
        controller.abort();
      };
    } catch (error) {
      throw new Error(`Fail to ${interactionType} a user: ${String(error)}`);
    }
  };

  return { selectedUser, superLikesCount, handleInteraction };
}
