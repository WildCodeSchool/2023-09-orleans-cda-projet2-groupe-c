import express from 'express';

import { db } from '@app/backend-shared';

const language = express.Router();

language.get('/languages', async (req, res) => {
  const languages = await db.selectFrom('language').selectAll().execute();
  return res.json(languages);
});

export { language };
