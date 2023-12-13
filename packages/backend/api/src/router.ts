import express from 'express';

import { db } from '@app/backend-shared';

import interactionRouter from './interaction/interaction';

const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await db.selectFrom('user').selectAll().execute();
    res.json(users);
  } catch {
    res.status(500).json({ success: false });
  }
});

router.use('/users', interactionRouter);

export default router;
