import express from 'express';

import technologyRouter from './technology/technology-crud';

const router = express.Router();

router.use('/', technologyRouter);

export default router;
