import express from 'express';

import { db } from '@app/backend-shared';
import { type ActionBody, actionSchema, receiverSchema } from '@app/shared';
import type { Request } from '@app/shared';

import { getUserId } from '@/middlewares/auth-handlers';

const interactionRouter = express.Router();

// Function to get superlikes count
const superLikeCount = async (userId: number) => {
  // Create a new date object and get the current date
  const currentDate = new Date();

  // Set time to 00:00:00:00
  currentDate.setHours(0, 0, 0, 0);

  // Create a new date object for the next date
  const nextDate = new Date(currentDate);

  // Get the current day + 1 and set the next date
  nextDate.setDate(nextDate.getDate() + 1);

  // Select all superlikes from the user between the current date and the next date
  const superLikesCount = await db
    .selectFrom('user_action')
    .select((eb) => eb.fn.countAll<number>().as('superlike_count'))
    .where('initiator_id', '=', userId)
    // Filter superlikes's date with "WHERE...AND WHERE" clause and compare if the date is between the current date and the next date
    .where('superlike_at', '>=', currentDate)
    .where('superlike_at', '<', nextDate)
    .execute();

  // By default, superliker count is 5, for each superlike post, decrement the counter
  // Reset the counter to 5 when the date has changed
  let superLikesCounter = 5 - superLikesCount[0].superlike_count;

  // Make sure the counter is between 0 and 5
  superLikesCounter = Math.max(0, Math.min(5, superLikesCounter));

  return superLikesCounter;
};

// Get all interactions from the user
interactionRouter.get(
  '/:userId/interactions',
  getUserId,
  async (req: Request, res) => {
    try {
      // Get the userId from the payload
      const userId = req.userId as number;

      // Select all interactions from the user
      const userActions = await db
        .selectFrom('user_action as ua')
        .innerJoin('user as receiver', 'receiver.id', 'ua.receiver_id')
        .innerJoin('user as initiator', 'initiator.id', 'ua.initiator_id')
        .select([
          'initiator.id as initiator_id',
          'initiator.name as initiator_name',
          'receiver.id as receiver_id',
          'receiver.name as receiver_name',
          'next_at',
          'liked_at',
          'superlike_at',
          'canceled_at',
        ])
        .where('initiator_id', '=', userId)
        .execute();

      res.status(200).json(userActions);
    } catch {
      res.status(500).json({
        success: false,
        error: 'An error occurred while fetching interactions.',
      });
    }
  },
);

// Get superlikes count from the user between the current date and the next date
interactionRouter.get(
  '/:userId/interactions/superlike/count',
  getUserId,
  async (req: Request, res) => {
    try {
      // Get the userId from the payload
      const userId = req.userId as number;

      // Get superlikes count
      const remainingSuperLikes = await superLikeCount(userId);

      res.status(200).json(remainingSuperLikes);
    } catch {
      res
        .status(500)
        .json({ error: 'An error occurred while fetching superlike count.' });
    }
  },
);

// Send a like
interactionRouter.post(
  '/:userId/interactions/:action',
  getUserId,
  async (req: Request, res) => {
    try {
      // Get the userId from the payload
      const userId = req.userId as number;

      const action = req.params.action;

      // Get the receiver id from the request body
      // Use parse from zod to validate the request body
      const { receiver_id: receiverId } = receiverSchema.parse(req.body);

      // Get interaction between the user and the receiver
      const existingInteraction = await db
        .selectFrom('user_action')
        .selectAll()
        .where('initiator_id', '=', userId)
        .where('receiver_id', '=', receiverId)
        .execute();

      // If the interaction already exists, returns an error
      if (existingInteraction.length > 0) {
        return res
          .status(400)
          .json({ success: false, error: 'Interaction already exists !' });
      }

      let actionBody: ActionBody = {
        initiator_id: Number(userId),
        receiver_id: receiverId,
        canceled_at: new Date(),
      };

      switch (action) {
        case 'like': {
          actionBody = {
            ...actionBody,
            liked_at: new Date(),
          };
          break;
        }
        case 'superlike': {
          actionBody = {
            ...actionBody,
            superlike_at: new Date(),
          };
          break;
        }
        case 'next': {
          actionBody = {
            ...actionBody,
            next_at: new Date(),
          };
          break;
        }
      }

      // Use safeParse from zod to validate the request body
      // Return an object with success or error and data properties
      const result = actionSchema.safeParse(actionBody);

      // If one of the property values is incorrect, returns an error
      if (!result.success) {
        res.status(400).json({ success: false, error: result.error.message });
        return;
      }

      // Get superlikes count
      const remainingSuperLikes = await superLikeCount(userId);

      // If superlikes count is less than or equal to 0, returns an error
      if (remainingSuperLikes <= 0) {
        return res
          .status(400)
          .json({ success: false, error: 'No remaining superlikes!' });
      } else {
        // Insert like interaction in database with zod parsed data
        await db.insertInto('user_action').values(result.data).execute();
      }

      res.json({ success: true });
    } catch {
      res.status(500).json({
        success: false,
        error: 'An error occurred during user interaction.',
      });
    }
  },
);

export default interactionRouter;
