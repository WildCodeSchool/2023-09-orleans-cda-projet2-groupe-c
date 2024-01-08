import express from 'express';

import authRouter from './auth/auth';
import categoriesRouter from './category/category-crud';
import { cityRouter } from './cities/get-cities';
import { hobbyRouter } from './hobby/hobby-crud';
import { languageRouter } from './languages/get-languages';
import { register } from './register';
import { technologyRouter } from './technologies.ts/get-technologies';

const router = express.Router();

router.use('/auth', authRouter);

router.use('/categories', categoriesRouter);

router.use('/register', register);
router.use('/cities', cityRouter);
router.use('/languages', languageRouter);
router.use('/technologies', technologyRouter);
router.use('/hobbies', hobbyRouter);

export default router;
