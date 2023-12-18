// prettier-ignore
import express from 'express';

import authRouter from './auth';
import categoriesRouter from './category/category-crud';

const router = express.Router();

router.use('/categories', categoriesRouter);

router.use('/auth', authRouter);

export default router;
