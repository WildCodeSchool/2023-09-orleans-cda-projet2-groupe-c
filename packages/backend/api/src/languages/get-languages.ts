import express from 'express';

import { db } from '@app/backend-shared';

const languageRouter = express.Router();

languageRouter.get('/', async (req, res) => {
  const languages = await db.selectFrom('language').selectAll().execute();
  return res.json(languages);
});

export { languageRouter };
