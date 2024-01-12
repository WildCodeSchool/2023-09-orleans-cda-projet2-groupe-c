import express from 'express';

import authRouter from './auth/auth';
import categoriesRouter from './category/category-crud';
import { cityRouter } from './cities/city-crud';
import { hobbyRouter } from './hobby/hobby-crud';
import interactionRouter from './interaction/interaction-crud';
import { languageRouter } from './languages/language-crud';
import { register } from './register';
import { technologyRouter } from './technologies.ts/technology-crud';
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
