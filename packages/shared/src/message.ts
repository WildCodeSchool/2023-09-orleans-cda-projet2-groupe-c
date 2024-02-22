import { z } from 'zod';

import type { Conversation } from '.';

export const messageSchema = z.object({
  content: z.string().max(255),
});

export type NewConversation = Omit<Conversation, 'id'>;

export type MessageValidation = z.infer<typeof messageSchema>;
