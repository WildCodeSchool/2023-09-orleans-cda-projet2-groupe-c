import { useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export default function useInteractions({ ...props }) {
  const { userId, setSuperLikeCount } = props;

  // Fetch user's superlike from the API
  const fetchUserSuperLikeCount = useCallback(
    async ({ signal }: { signal: AbortSignal }) => {
      try {
        const res = await fetch(
          `${API_URL}/users/${userId}/interactions/superlike/count`,
          {
            signal,
          },
        );
        const data = await res.json();

        // Set a list of user interactions in the state "superLike"
        setSuperLikeCount(data);
      } catch (error) {
        throw new Error(`Fail to fetch user interactions: ${String(error)}`);
      }
    },
    [userId, setSuperLikeCount],
  );

  return { fetchUserSuperLikeCount };
}
