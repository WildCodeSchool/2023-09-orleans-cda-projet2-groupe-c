import express from 'express';

import languageRouter from './language/language-crud';

const router = express.Router();

router.use('/languages', languageRouter);

export default router;
