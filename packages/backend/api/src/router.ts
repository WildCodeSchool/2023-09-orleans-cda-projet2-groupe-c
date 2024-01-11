import express from 'express';

import authRouter from './auth/auth';
import categoriesRouter from './category/category-crud';
import { cityRouter } from './cities/get-cities';
import { hobbyRouter } from './hobby/hobby-crud';
import interactionRouter from './interaction/interaction-crud';
import { languageRouter } from './languages/get-languages';
import { register } from './register';
import { technologyRouter } from './technologies.ts/get-technologies';
import userRouter from './user/user-crud';

const router = express.Router();

router.use('/auth', authRouter);

router.use('/categories', categoriesRouter);

router.use('/register', register);
router.use('/cities', cityRouter);
router.use('/languages', languageRouter);
router.use('/technologies', technologyRouter);
router.use('/hobbies', hobbyRouter);
router.use('/users', userRouter);

router.use('/users', interactionRouter);

export default router;
