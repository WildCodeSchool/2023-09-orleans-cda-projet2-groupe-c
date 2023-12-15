import express from 'express';

import cityRouter from './city/city-crud';

const router = express.Router();

router.use('/', cityRouter);

export default router;
