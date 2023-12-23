import express from 'express';

import { db } from '@app/backend-shared';
import {
  type LikeBody,
  type NextBody,
  type SuperLikeBody,
  likeSchema,
  nextSchema,
  receiverSchema,
  superLikeSchema,
} from '@app/shared';

const interactionRouter = express.Router();

// Get all interactions from the user
interactionRouter.get('/:userId/interactions', async (req, res) => {
  try {
    const userId = Number.parseInt(req.params.userId);

    const userActions = await db
      .selectFrom('user_action')
      .selectAll()
      .where('initiator_id', '=', userId)
      .execute();

    res.status(200).json(userActions);
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

// Get superlikes count from the user between the current date and the next date
interactionRouter.get(
  '/:userId/interactions/superlike/count',
  async (req, res) => {
    try {
      const userId = Number.parseInt(req.params.userId);

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
        // Filter superlikes's date with "WHERE...AND WHERE" clause and compare if the date is between the current date and the next date
        .where('initiator_id', '=', userId)
        .where('superlike_at', '>=', currentDate)
        .where('superlike_at', '<', nextDate)
        .execute();

      // By default, superliker count is 5, for each superlike post, decrement the counter
      // Reset the counter to 5 when the date has changed
      let superLikesCounter = 5 - superLikesCount[0].superlike_count;

      // Make sure the counter is between 0 and 5
      superLikesCounter = Math.max(0, Math.min(5, superLikesCounter));

      res.status(200).json(superLikesCounter);
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  },
);

// Send a like
interactionRouter.post('/:userId/interactions/like', async (req, res) => {
  try {
    const userId = Number.parseInt(req.params.userId);

    // Get the receiver id from the request body
    // Use parse from zod to validate the request body
    const { receiver_id: receiverId } = receiverSchema.parse(req.body);

    const likeBody: LikeBody = {
      initiator_id: userId,
      receiver_id: receiverId,
      liked_at: new Date(),
      canceled_at: new Date(),
    };

    // Use safeParse from zod to validate the request body
    // Return an object with success or error and data properties
    const result = likeSchema.safeParse(likeBody);

    // If one of the property values is incorrect, returns an error
    if (!result.success) {
      res.status(400).json({ success: false, error: result.error.message });
      return;
    }

    // Insert like interaction in database with zod parsed data
    await db.insertInto('user_action').values(result.data).execute();

    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

// Send a superlike
interactionRouter.post('/:userId/interactions/superlike', async (req, res) => {
  try {
    const userId = Number.parseInt(req.params.userId);

    // Get the receiver id from the request body
    // Use parse from zod to validate the request body
    const { receiver_id: receiverId } = receiverSchema.parse(req.body);

    const superLikeBody: SuperLikeBody = {
      initiator_id: userId,
      receiver_id: receiverId,
      superlike_at: new Date(),
      canceled_at: new Date(),
    };

    // Use safeParse from zod to validate the request body
    // Return an object with success or error and data properties
    const result = superLikeSchema.safeParse(superLikeBody);

    // If one of the property values is incorrect, returns an error
    if (!result.success) {
      res.status(400).json({ success: false, error: result.error.message });
      return;
    }

    // Insert superlike interaction in database with zod parsed data
    await db.insertInto('user_action').values(result.data).execute();

    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

// Next a user
interactionRouter.post('/:userId/interactions/next', async (req, res) => {
  try {
    const userId = Number.parseInt(req.params.userId);

    // Get the receiver id from the request body
    // Use parse from zod to validate the request body
    const { receiver_id: receiverId } = receiverSchema.parse(req.body);

    const nextBody: NextBody = {
      initiator_id: userId,
      receiver_id: receiverId,
      next_at: new Date(),
      canceled_at: new Date(),
    };

    // Use safeParse from zod to validate the request body
    // Return an object with success or error and data properties
    const result = nextSchema.safeParse(nextBody);

    // If one of the property values is incorrect, returns an error
    if (!result.success) {
      res.status(400).json({ success: false, error: result.error.message });
      return;
    }

    await db.insertInto('user_action').values(result.data).execute();

    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

export default interactionRouter;
