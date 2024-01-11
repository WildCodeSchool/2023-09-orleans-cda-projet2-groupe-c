import express from 'express';
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';
import { type ActionBody, actionSchema, receiverSchema } from '@app/shared';
import type { Request as ExpressRequest } from '@app/shared';

import { getUserId } from '@/middlewares/auth-handlers';
import { getSuperLikeCount } from '@/middlewares/interaction-handlers';

interface Request extends ExpressRequest {
  superLikesCount?: number;
}

const interactionRouter = express.Router();

// Get all interactions from the user
interactionRouter.get(
  '/:userId/interactions',
  getUserId,
  async (req: Request, res) => {
    try {
      // Get userId from the request
      const userId = req.userId as number;

      // Select all interactions from the user
      const userActions = await db
        .selectFrom('user_action as ua')
        .innerJoin('user as initiator', 'initiator.id', 'ua.initiator_id')
        .innerJoin('user as receiver', 'receiver.id', 'ua.receiver_id')
        .select((eb) => [
          'ua.id',
          'next_at',
          'liked_at',
          'superlike_at',
          'canceled_at',
          jsonObjectFrom(
            eb
              .selectFrom('user as initiator')
              .select([
                'initiator.id',
                'initiator.name',
                jsonObjectFrom(
                  eb
                    .selectFrom('city as c')
                    .select('coordinates')
                    .whereRef('c.id', '=', 'initiator.city_id'),
                ).as('city'),
              ])
              .whereRef('initiator.id', '=', 'ua.initiator_id'),
          ).as('initiator'),
          jsonObjectFrom(
            eb
              .selectFrom('user as receiver')
              .select([
                'receiver.id',
                'receiver.name',
                'receiver.birthdate',
                jsonObjectFrom(
                  eb
                    .selectFrom('picture as p')
                    .select('p.picture_path as path')
                    .whereRef('p.user_id', '=', 'receiver.id')
                    .orderBy('order', 'asc')
                    .limit(1),
                ).as('pictures'),
                jsonObjectFrom(
                  eb
                    .selectFrom('city as c')
                    .select(['c.id', 'c.name', 'c.coordinates'])
                    .whereRef('c.id', '=', 'receiver.city_id'),
                ).as('city'),
                jsonObjectFrom(
                  eb
                    .selectFrom('language as l')
                    .innerJoin(
                      'language_user as lu',
                      'lu.user_id',
                      'receiver.id',
                    )
                    .select(['l.id', 'name'])
                    .whereRef('l.id', '=', 'lu.language_id')
                    .orderBy('lu.order', 'asc')
                    .limit(1),
                ).as('languages'),
              ])
              .whereRef('receiver.id', '=', 'ua.receiver_id'),
          ).as('receiver'),
        ])
        .where('initiator_id', '=', userId)
        .execute();

      res.status(200).json(userActions);
    } catch {
      res.status(500).json({
        success: false,
        error: 'An error occurred while fetching user interactions.',
      });
    }
  },
);

// Get user liked med
interactionRouter.get('/:userId/interactions/liked', async (req, res) => {
  try {
    const userId = req.params.userId;

    const userLikedMe = await db
      .selectFrom('user_action as ua')
      .innerJoin('user as initiator', 'initiator.id', 'ua.initiator_id')
      .innerJoin('user as receiver', 'receiver.id', 'ua.receiver_id')
      .select(['initiator.name'])
      .whereRef('ua.receiver_id', '=', 'receiver.id')
      .where('receiver_id', '=', userId)
      .execute();

    console.log(userLikedMe);

    res.status(200).json(userLikedMe);
  } catch {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching superlike count.' });
  }
});

// Get superlikes count from the user between the current date and the next date
interactionRouter.get(
  '/:userId/interactions/superlike/count',
  getUserId,
  getSuperLikeCount,
  (req: Request, res) => {
    try {
      const remainingSuperLikes = req.superLikesCount as number;

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
  getSuperLikeCount,
  async (req: Request, res) => {
    try {
      // Get the userId from the request
      const userId = req.userId as number;

      // Get superlikes count from the request
      const remainingSuperLikes = req.superLikesCount as number;

      // Get the action from the request params
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

      // Switch between the action type
      switch (action) {
        case 'like': {
          actionBody = {
            ...actionBody,
            liked_at: new Date(),
          };
          break;
        }
        case 'superlike': {
          // If there is no remaining superlikes, returns an error
          if (remainingSuperLikes <= 0) {
            return res
              .status(400)
              .json({ success: false, error: 'No remaining superlikes!' });
          }

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

      // Insert like interaction in database with zod parsed data
      await db.insertInto('user_action').values(result.data).execute();

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
