import express from 'express';

import authRouter from './auth/auth';
import categoriesRouter from './category/category-crud';
import userRouter from './user/user-crud';

const router = express.Router();

router.use('/auth', authRouter);

router.use('/categories', categoriesRouter);

router.use('/users', userRouter);

export default router;
