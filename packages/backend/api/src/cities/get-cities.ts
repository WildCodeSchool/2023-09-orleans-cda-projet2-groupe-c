import express from 'express';

import { db } from '@app/backend-shared';

const city = express.Router();

city.get('/cities', async (_req, res) => {
  const cities = await db.selectFrom('city').selectAll().execute();
  return res.json(cities);
});

export { city };
