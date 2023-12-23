import { z } from 'zod';

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

export const likeSchema = interactionBaseSchema.extend({
  liked_at: z.date(),
});

export const superLikeSchema = interactionBaseSchema.extend({
  superlike_at: z.date(),
});

export const nextSchema = interactionBaseSchema.extend({
  next_at: z.date(),
});

export type LikeBody = z.infer<typeof likeSchema>;

export type SuperLikeBody = z.infer<typeof superLikeSchema>;

export type NextBody = z.infer<typeof nextSchema>;
