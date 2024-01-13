import express from 'express';

import authRouter from './auth/auth';
import categoriesRouter from './category/category-crud';
import interactionRouter from './interaction/interaction-crud';
import userRouter from './user/user-crud';
import filterRouter from './user/user-filter-crud';

const router = express.Router();

router.use('/auth', authRouter);

router.use('/categories', categoriesRouter);

router.use('/users', userRouter);

router.use('/users', interactionRouter);

router.use('/users', filterRouter);

export default router;
