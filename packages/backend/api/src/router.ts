import express from 'express';

import hobbyRouter from './hobby/hobby-crud';

const router = express.Router();

router.use('/', hobbyRouter);

export default router;
