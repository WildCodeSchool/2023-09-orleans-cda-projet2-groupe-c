import express from 'express';

import { db } from '@app/backend-shared';

import authRouter from './auth/auth';
import categoriesRouter from './category/category-crud';
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

router.use('/auth', authRouter);

router.use('/categories', categoriesRouter);

export default router;
