import { useCallback, useEffect, useState } from 'react';

import type { UserBody } from '@app/shared';

import { useAuth } from '@/contexts/AuthContext';
import { useConversation } from '@/contexts/ConversationContext';
import { useMatching } from '@/contexts/MatchingContext';

export default function useInteractions() {
  const [selectedUser, setSelectedUser] = useState<UserBody>();
  const [superLikesCount, setSuperLikesCount] = useState<number>(0);

  const [interactionStatus, setInteractionStatus] = useState<string>();
  const [isMatching, setIsMatching] = useState<boolean>(false);
  const [errorMatching, setErrorMatching] = useState<string>();

  /* const { fetchMatching } = useMatching(); */

  const { fetchConversations } = useConversation();
  const { isLoggedIn } = useAuth();

  // Fetch users from the API
  const fetchUsers = useCallback(
    async ({ signal }: { signal: AbortSignal }) => {
      const res = await fetch(`/api/users`, {
        signal,
      });
      const data = await res.json();

      // Set a list of user interactions in the state "superLike"
      setSelectedUser(data[0]);
    },
    [],
  );

  // Fetch user's superlike from the API
  const fetchUserSuperLikeCount = useCallback(
    async ({ signal }: { signal: AbortSignal }) => {
      const res = await fetch(`/api/users/interactions/superlike/count`, {
        signal,
      });
      const data = await res.json();

      // Set a list of user interactions in the state "superLike"
      setSuperLikesCount(data);
    },
    [],
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
  }, [fetchUserSuperLikeCount, fetchUsers, isLoggedIn]);

  // Handle the interactions
  const handleInteraction = async (interactionType: string) => {
    try {
      // Send a request to the API to like, superlike or next a user
      const sendInteraction = async () => {
        const res = await fetch(`/api/users/interactions/${interactionType}`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            receiver_id: selectedUser?.id, // Send in the body the id of the selected user
          }),
        });

        if (res.ok) {
          setInteractionStatus(interactionType);
        }
      };

      await sendInteraction();

      // Fetch selected user and superlikes count from the user logged in to display the next user and the remaining superlikes count
      const controller = new AbortController();
      const signal = controller.signal;

      await fetchUsers({ signal }).catch((error) => {
        throw new Error(`Fail to fetch users: ${String(error)}`);
      });

      await fetchUserSuperLikeCount({ signal }).catch((error) => {
        throw new Error(`Fail to fetch user's superlike: ${String(error)}`);
      });

      // Fetch conversationList when the user interacts with someone

     /*  const fetchInteractionsVerify = async () => {
        await fetch(`/api/users/interactions/verify`, {
          signal,
        });
      };

      await fetchInteractionsVerify(); */

      /* const fetchMatching = async () => {
        const controller = new AbortController();
        try {
          const response = await fetch('/api/users/interactions/verify', {
            signal: controller.signal,
          });
    
          const data = (await response.json()) as { isMatching: boolean };
          setIsMatching(data.isMatching);
    
          return () => {
            controller.abort();
          };
        } catch {
          setErrorMatching('ⓘ An error occurred while fetching Matching verify.');
        }
      };

      await fetchMatching() */

      fetchConversations({ signal });

      const timeoutId = setTimeout(() => {
        setInteractionStatus('');
      }, 100);

      // Abort all fetch requests if the component is unmounted
      return () => {
        controller.abort();
        clearTimeout(timeoutId);
      };
    } catch (error) {
      throw new Error(`Fail to ${interactionType} a user: ${String(error)}`);
    }
  };

  const handleBackInteraction = async () => {
    try {
      // Send a request to the API to go back to the previous user
      await fetch(`/api/users/interactions/back`, {
        method: 'DELETE',
      });

      const controller = new AbortController();
      const signal = controller.signal;

      fetchUsers({ signal }).catch((error) => {
        throw new Error(`Fail to fetch users: ${String(error)}`);
      });

      fetchUserSuperLikeCount({ signal }).catch((error) => {
        throw new Error(`Fail to fetch user's superlike: ${String(error)}`);
      });

      // Abort fetch requests if the component is unmounted
      return () => {
        controller.abort();
      };
    } catch {
      throw new Error('Fail to go back to the previous user.');
    }
  };

  return {
    selectedUser,
    superLikesCount,
    handleInteraction,
    handleBackInteraction,
    fetchUsers,
    interactionStatus,
    setInteractionStatus,
  };
}
