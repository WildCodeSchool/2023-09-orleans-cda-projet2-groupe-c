import { z } from 'zod';

import type { Conversation, Message } from '.';

export type AllConversation = {
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
};

export type UserConversation = {
  id: number;
  name: string;
  picture_path: string;
};

export type Messages = Omit<Message, 'sender_id'> & {
  sender_name: string;
};

export type Conversations = {
  conversation_id: number;
  user_1: UserConversation;
  user_2: UserConversation;
  messages: Messages[];
};

export const messageSchema = z.object({
  content: z.string().max(255),
});

export type NewConversation = Omit<Conversation, 'id'>;

export type MessageValidation = z.infer<typeof messageSchema>;
