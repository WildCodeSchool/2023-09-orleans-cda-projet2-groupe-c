import express from 'express';

import { db } from '@app/backend-shared';

const interactionRouter = express.Router();

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
