import express from 'express';

import languageRouter from './language/language-crud';

const router = express.Router();

router.use('/', languageRouter);

export default router;
