import express from 'express';

import authRouter from './auth/auth';
import categoriesRouter from './category/category-crud';

const router = express.Router();

router.use('/auth', authRouter);

router.use('/categories', categoriesRouter);

router.use('/auth', authRouter);

export default router;
