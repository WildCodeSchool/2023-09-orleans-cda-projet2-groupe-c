import express from 'express';

import { db } from '@app/backend-shared';

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
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { receiver_id } = req.body;

    await db
      .insertInto('user_action')
      .values({
        initiator_id: userId,
        receiver_id,
        liked_at: new Date(),
        canceled_at: new Date(),
      })
      .execute();

    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

// Send a superlike
interactionRouter.post('/:userId/interactions/superlike', async (req, res) => {
  try {
    const userId = Number.parseInt(req.params.userId);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { receiver_id } = req.body;

    await db
      .insertInto('user_action')
      .values({
        initiator_id: userId,
        receiver_id,
        superlike_at: new Date(),
        canceled_at: new Date(),
      })
      .execute();

    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

// Next a user
interactionRouter.post('/:userId/interactions/next', async (req, res) => {
  try {
    const userId = Number.parseInt(req.params.userId);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { receiver_id } = req.body;

    await db
      .insertInto('user_action')
      .values({
        initiator_id: userId,
        receiver_id,
        next_at: new Date(),
        canceled_at: new Date(),
      })
      .execute();

    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

export default interactionRouter;
