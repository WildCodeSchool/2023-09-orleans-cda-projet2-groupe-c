import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import ConversationsList from '@/components/message/ConversationsList';
import useAllConversations from '@/hooks/use-all-conversations';

import { useAuth } from './AuthContext';

interface AllConversation {
  conversation_id: number;
  messages: {
    id: number;
    content: string;
    sent_at: string;
  }[];
  receiver: {
    id: number;
    picture_path: string;
    receiver_name: string;
  }[];
  sender: {
    id: number;
    picture_path: string;
    sender_name: string;
  }[];
}

interface User {
  id: number;
  name: string;
  picture_path: string;
}

interface Message {
  id: number;
  content: string;
  sent_at: Date;
  sender_name: string;
}

interface Conversation {
  conversation_id: number;
  sender: User;
  receiver: User;
  messages: Message[];
}

type ConversationProviderProps = {
  readonly children: React.ReactNode;
};

type ConversationState = {
  userId?: number;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleClick: () => void;
  messagesCount: number;
  conversationsList?: AllConversation[];
  selectedConversation: (index: number) => void;
  conversationId?: number;
  conversation?: Conversation;
  error?: string;
  fetchConversations: ({ signal }: { signal: AbortSignal }) => void;
};

// Create context
const conversationProviderContext = createContext<
  ConversationState | undefined
>(undefined);

export default function ConversationContext({
  children,
  ...props
}: ConversationProviderProps) {
  const { userId } = useAuth();

  const [conversation, setConversation] = useState<Conversation>();

  const [error, setError] = useState<string>();

  const [conversationId, setConversationId] = useState<number>();

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { conversationsList, messagesCount, fetchConversations } =
    useAllConversations();

  console.log(conversationsList);

  const navigate = useNavigate();

  const selectedConversation = useCallback(
    (index: number) => {
      if (conversationsList) {
        setConversationId(index);

        navigate(`/users/${userId}/conversations/${conversationId}`);
      }

      if (window.innerWidth < 1024) {
        setIsVisible(false);
      }
    },
    [conversationsList, navigate, userId, conversationId],
  );

  const handleClick = () => {
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    if (Boolean(conversationId) && conversationsList !== undefined) {
      const controller = new AbortController();

      const signal = controller.signal;
      const fetchMessage = async () => {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${userId}/conversations/${conversationId}`,
          {
            signal,
            credentials: 'include',
          },
        );

        const data = await response.json();

        setConversation(data[0]);
      };

      fetchMessage().catch(() => {
        setError('An occurred while fetching the message.');
      });
      /*   const intervalId = setInterval(fetchMessage, 1000); */

      return () => {
        /*  clearInterval(intervalId); */
        controller.abort();
      };
    }
  }, [conversationId, conversationsList, userId]);

  const value = useMemo(() => {
    return {
      userId,
      isVisible,
      setIsVisible,
      handleClick,
      messagesCount,
      conversationsList,
      selectedConversation,
      conversationId,
      conversation,
      error,
      fetchConversations,
    };
  }, [
    userId,
    isVisible,
    messagesCount,
    conversationsList,
    selectedConversation,
    conversationId,
    conversation,
    error,
    fetchConversations,
  ]);

  return (
    <conversationProviderContext.Provider {...props} value={value}>
      {children}
    </conversationProviderContext.Provider>
  );
}

export const useConversation = () => {
  const context = useContext(conversationProviderContext);

  if (!context) {
    throw new Error(
      'useConversation must be used within a ConversationProvider',
    );
  }

  return context;
};
