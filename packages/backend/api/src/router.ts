import express from 'express';

import authRouter from './auth/auth';
import messageRouter from './auth/user/message';
import categoriesRouter from './category/category-crud';

const router = express.Router();

router.use('/auth', authRouter);

router.use('/categories', categoriesRouter);

router.use('/users', messageRouter);

export default router;
