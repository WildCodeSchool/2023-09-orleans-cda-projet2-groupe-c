import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { Message } from '@app/shared';

import useAllConversations from '@/hooks/use-all-conversations';

import { useAuth } from './AuthContext';

interface AllConversation {
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

interface User {
  id: number;
  name: string;
  picture_path: string;
}

type Messages = Omit<Message, 'sender_id'> & {
  sender_name: string;
};

interface Conversation {
  conversation_id: number;
  user_1: User;
  user_2: User;
  messages: Messages[];
}

type ConversationProviderProps = {
  readonly children: React.ReactNode;
};

type ConversationState = {
  userId?: number;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleConversationClick: () => void;
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

  /* const navigate = useNavigate();  */

  //Allows to select the conversation id
  const selectedConversation = useCallback(
    (index: number) => {
      if (conversationsList) {
        setConversationId(index);
      }

      if (window.innerWidth < 1024) {
        setIsVisible(false);
      }
    },
    [conversationsList],
  );

  const handleConversationClick = () => {
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setIsVisible]);

  //Fetches the conversation
  useEffect(() => {
    if (Boolean(conversationId) && conversationsList !== undefined) {
      const controller = new AbortController();

      const signal = controller.signal;
      const fetchMessage = async () => {
        const response = await fetch(
          `/api/users/${userId}/conversations/${conversationId}`,
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

      //Fetches the messages to update the conversation with new messages
      const intervalId = setInterval(fetchMessage, 1100);

      return () => {
        clearInterval(intervalId);
        controller.abort();
      };
    }
  }, [conversationId, conversationsList, userId]);

  const value = useMemo(() => {
    return {
      userId,
      isVisible,
      setIsVisible,
      handleConversationClick,
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
    setIsVisible,
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
