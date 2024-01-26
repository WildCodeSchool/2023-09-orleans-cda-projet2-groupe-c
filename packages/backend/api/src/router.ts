import express from 'express';

import authRouter from './auth/auth';
import categoriesRouter from './category/category-crud';
import interactionRouter from './interaction/interaction-crud';
import messageRouter from './user/message';
import userRouter from './user/user-crud';

const router = express.Router();

router.use('/auth', authRouter);

router.use('/categories', categoriesRouter);

router.use('/users', userRouter);

router.use('/users', interactionRouter);

router.use('/users', messageRouter);

export default router;
