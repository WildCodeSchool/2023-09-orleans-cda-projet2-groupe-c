import express from 'express';

import authRouter from './auth/auth';
import categoriesRouter from './category/category-crud';
import messageRouter from './user/message';

const router = express.Router();

router.use('/auth', authRouter);

router.use('/categories', categoriesRouter);

router.use('/users', messageRouter);

export default router;
