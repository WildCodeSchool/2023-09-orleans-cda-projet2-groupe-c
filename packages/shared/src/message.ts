import { z } from 'zod';

export const messageSchema = z.object({
  content: z.string().max(255),
});

export type MessageValidation = z.infer<typeof messageSchema>;
