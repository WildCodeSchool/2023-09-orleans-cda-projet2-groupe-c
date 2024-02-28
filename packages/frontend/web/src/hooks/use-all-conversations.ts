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

export default function useAllConversations() {
  const [conversationsList, setConversationsList] = useState<Conversation[]>();
  const [messagesCount, setMessagesCount] = useState<number>(0);
  const [errorConversation, setErrorConversation] = useState<string>();
  const { isLoggedIn } = useAuth();

  const fetchConversations = useCallback(
    async ({ signal }: { signal: AbortSignal }) => {
      const res = await fetch(`/api/users/conversations`, {
        signal,
      });

      if (res.ok) {
        const data = await res.json();
        setConversationsList(data.conversation);
      }
    },
    [],
  );

  // Fetch conversations between the user logged in and other users
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchConversations({ signal }).catch(() => {
      setErrorConversation(`Failed to fetch messages`);
    });

    const interval = setInterval(() => {
      fetchConversations({ signal }).catch((error) => {
        throw new Error(`${String(error)}`);
      });
    }, 2500);

    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, [fetchConversations, isLoggedIn]);

  // Set the number of messages
  useEffect(() => {
    if (conversationsList !== undefined) {
      setMessagesCount(conversationsList.length);
    }
  }, [conversationsList]);

  return {
    conversationsList,
    messagesCount,
    errorConversation,
    fetchConversations,
  };
}
