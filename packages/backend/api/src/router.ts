import express from 'express';

import interactionRouter from './interaction/interaction';

const router = express.Router();

router.use('/users', interactionRouter);

export default router;
