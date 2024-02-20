import express from 'express';

import authRouter from './auth/auth';
import categoriesRouter from './category/category-crud';
import interactionRouter from './interaction/interaction-crud';
import languageRouter from './language/language-crud';
import registerRouter from './registration/registration';
import userRouter from './user/user-crud';
import filterRouter from './user/user-filter-crud';

const router = express.Router();

router.use('/auth', authRouter);

router.use('/registration', registerRouter);

router.use('/categories', categoriesRouter);

router.use('/languages', languageRouter);

router.use('/users', userRouter);

router.use('/users', interactionRouter);

router.use('/users', filterRouter);

export default router;
