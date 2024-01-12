import express from 'express';

import { db } from '@app/backend-shared';

const technologyRouter = express.Router();

technologyRouter.get('/', async (req, res) => {
  const technologies = await db.selectFrom('technology').selectAll().execute();
  return res.json(technologies);
});

export { technologyRouter };
