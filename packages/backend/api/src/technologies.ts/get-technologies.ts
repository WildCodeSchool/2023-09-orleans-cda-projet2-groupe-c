import express from 'express';

import { db } from '@app/backend-shared';

const technology = express.Router();

technology.get('/technologies', async (req, res) => {
  const technologies = await db.selectFrom('technology').selectAll().execute();
  return res.json(technologies);
});

export { technology };
