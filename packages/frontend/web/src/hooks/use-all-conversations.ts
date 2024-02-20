import { useCallback, useEffect, useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';

interface Conversation {
  conversation_id: number;
  messages: {
    id: number;
    content: string;
    sent_at: string;
  };
  user_1: {
    id: number;
    picture_path: string;
    name: string;
  };
  user_2: {
    id: number;
    picture_path: string;
    name: string;
  };
}

const API_URL = import.meta.env.VITE_API_URL;

export default function useAllConversations() {
  const [conversationsList, setConversationsList] = useState<Conversation[]>();
  const [messagesCount, setMessagesCount] = useState<number>(0);
  const { userId } = useAuth();

  const fetchConversations = useCallback(
    async ({ signal }: { signal: AbortSignal }) => {
      const res = await fetch(`${API_URL}/users/${userId}/conversations`, {
        signal,
        credentials: 'include',
      });

      const data = await res.json();

      setConversationsList(data.conversation);
    },
    [userId],
  );

  // Fetch conversations between the user logged in and other users
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchConversations({ signal }).catch((error) => {
      throw new Error(`Failed to fetch messages: ${String(error)}`);
    });

    return () => {
      controller.abort();
    };
  }, [fetchConversations]);

  // Set the number of messages
  useEffect(() => {
    if (conversationsList !== undefined) {
      setMessagesCount(conversationsList.length);
    }
  }, [conversationsList]);

  return { conversationsList, messagesCount, fetchConversations };
}
