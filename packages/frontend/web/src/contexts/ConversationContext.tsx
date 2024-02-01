import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import useAllConversations from '@/hooks/use-all-conversations';

import { useAuth } from './AuthContext';

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

type ConversationProviderProps = {
  readonly children: React.ReactNode;
};

type ConversationState = {
  userId?: number;
  conversation?: Conversation[];
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleClick: () => void;
  messagesCount: number;
  conversationsList?: AllConversation[];
  selectedConversation: (index: number) => void;
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

 /*  const [conversation, setConversation] = useState<Conversation[]>([]); */
  const [selectedId, setSelectedId] = useState<number>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
/*   console.log(selectedId); */


  const { conversationsList, messagesCount } = useAllConversations();

  const navigate = useNavigate();

  const selectedConversation = useCallback(
    (index: number) => {
      if (conversationsList !== undefined) {
        setSelectedId(index);
       /*  console.log(conversationsList[index].conversation_id); */
  
        if (index !== undefined) {
          navigate(`/users/${userId}/conversations/${conversationsList[index].conversation_id}`);
        }
      }
    },
    [conversationsList, navigate, userId],
  );

  /*   console.log(selectedId, 'id');  */

  const handleClick = () => {
    setIsVisible((prev) => !prev);
  };


  const value = useMemo(() => {
    return {
      userId,

      isVisible,
      setIsVisible,
      handleClick,
      messagesCount,
      conversationsList,
      selectedConversation,
      selectedId
    };
  }, [
    userId,
    isVisible,
    messagesCount,
    conversationsList,
    selectedConversation,
    selectedId
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
