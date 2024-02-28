import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { AllConversation, Conversations } from '@app/shared';

import useAllConversations from '@/hooks/use-all-conversations';

import { useAuth } from './AuthContext';

type ConversationProviderProps = {
  readonly children: React.ReactNode;
};

type ConversationState = {
  userId?: number;
  isVisibleConversation: boolean;
  setIsVisibleConversation: React.Dispatch<React.SetStateAction<boolean>>;
  handleConversationClick: () => void;
  messagesCount: number;
  conversationsList?: AllConversation[];
  selectedConversation: (index: number) => void;
  conversationId?: number;
  conversation?: Conversations;
  fetchMessage: ({ signal }: { signal: AbortSignal }) => Promise<void>;
  scrollToBottom: () => void;
  messagesEndReference: React.MutableRefObject<HTMLDivElement | null>;
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

  const [conversation, setConversation] = useState<Conversations>();

  const messagesEndReference = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndReference.current?.scrollIntoView({ behavior: 'instant' });
  };

  const [conversationId, setConversationId] = useState<number>();

  const [isVisibleConversation, setIsVisibleConversation] =
    useState<boolean>(false);

  const { conversationsList, messagesCount, fetchConversations } =
    useAllConversations();

  //Allows to select the conversation id
  const selectedConversation = useCallback(
    (index: number) => {
      if (conversationsList) {
        setConversationId(index);
      }

      if (window.innerWidth < 1024) {
        setIsVisibleConversation(false);
      }
    },
    [conversationsList],
  );

  const handleConversationClick = () => {
    setIsVisibleConversation((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsVisibleConversation(true);
      } else {
        setIsVisibleConversation(false);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setIsVisibleConversation]);

  const fetchMessage = useCallback(
    async ({ signal }: { signal: AbortSignal }) => {
      const response = await fetch(
        `/api/users/${userId}/conversations/${conversationId}`,
        {
          signal,
        },
      );

      const data = await response.json();

      setConversation(data[0]);
    },
    [conversationId, userId],
  );

  const value = useMemo(() => {
    return {
      userId,
      isVisibleConversation,
      setIsVisibleConversation,
      handleConversationClick,
      messagesCount,
      conversationsList,
      selectedConversation,
      conversationId,
      conversation,
      fetchMessage,
      scrollToBottom,
      messagesEndReference,
      fetchConversations,
    };
  }, [
    userId,
    isVisibleConversation,
    messagesCount,
    conversationsList,
    selectedConversation,
    conversationId,
    conversation,
    fetchMessage,
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
