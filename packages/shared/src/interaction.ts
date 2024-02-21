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

export const conversationSchema = z.object({
  conversation: z.number().int().positive(),
});

export const actionSchema = interactionBaseSchema.extend({
  liked_at: z.date().optional(),
  superlike_at: z.date().optional(),
  next_at: z.date().optional(),
});

export type ActionBody = z.infer<typeof actionSchema>;

export interface InteractionBody {
  id: number;
  canceled_at: string;
  liked_at?: string;
  superlike_at?: string;
  next_at?: string;
  initiator: {
    id: number;
    name: string;
    birthdate: string;
    pictures: {
      path: string;
    };
    city: {
      name: string;
      coordinates: {
        x: number;
        y: number;
      };
    };
  };
  receiver: {
    id: number;
    name: string;
    birthdate: string;
    pictures: {
      path: string;
    };
    city: {
      id: number;
      name: string;
      coordinates: {
        x: number;
        y: number;
      };
    };
    languages: {
      id: number;
      name: string;
    };
  };
}
