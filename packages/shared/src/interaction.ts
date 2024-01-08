import type { Request as ExpressRequest } from 'express';
import { z } from 'zod';

export interface Request extends ExpressRequest {
  userId?: number;
}

export const receiver = z.number().int().positive();

export const receiverSchema = z.object({
  receiver_id: receiver,
});

export type ReceiverBody = z.infer<typeof receiverSchema>;

export const interactionBaseSchema = z.object({
  initiator_id: z.number().int().positive(),
  receiver_id: receiver,
  canceled_at: z.date(),
});

export const actionSchema = interactionBaseSchema.extend({
  liked_at: z.date().optional(),
  superlike_at: z.date().optional(),
  next_at: z.date().optional(),
});

export type ActionBody = z.infer<typeof actionSchema>;
