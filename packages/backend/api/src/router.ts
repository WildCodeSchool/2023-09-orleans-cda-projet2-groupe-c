import express from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';
import type { SomeInterface } from '@app/shared';

import authRouter from './auth/auth';

const router = express.Router();

router.get('/', async (_request, response) => {
  // you can remove this; it's just for the demo
  const result = await sql<{
    coucou: number;
  }>`SELECT 1 as coucou`.execute(db);
  const [row] = result.rows;

  return response.send(`Hello World! ${row.coucou}`);
});

router.get('/some-route', (_request, response) => {
  const value: SomeInterface = {
    someProperty: 'someValueFromApi',
  };

  return response.json(value);
});

router.use('/auth', authRouter);

export default router;
