import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

interface Conversation {
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

  const API_URL = import.meta.env.VITE_API_URL;

export default function useAllConversations(){

    const [conversationsList, setConversationsList] = useState<Conversation[]>();
    const [messagesCount, setMessagesCount] = useState<number>(0);
    const {userId} = useAuth()

      // Fetch conversations between the user logged in and other users
      useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
    
        const fetchConversations = async () => {
          const res = await fetch(`${API_URL}/users/${userId}/conversations`, {
            signal,
            credentials: 'include',
          });
    
          const data = await res.json();
    
          setConversationsList(data);
        };
    
        fetchConversations().catch((error) => {
          throw new Error(`Failed to fetch messages: ${String(error)}`);
        });
    
        return () => {
          controller.abort();
        };
      }, [userId]);
    
      // Set the number of messages
      useEffect(() => {
        if (conversationsList !== undefined) {
          setMessagesCount(conversationsList.length);
        }
      }, [conversationsList]);

      return {conversationsList, messagesCount,}
}