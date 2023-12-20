import express from 'express';

import categoriesRouter from './category/category-crud';
import { city } from './cities/get-cities';
import hobbyRouter from './hobby/hobby-crud';
import { language } from './languages/get-languages';
import { register } from './register';
import { technology } from './technologies.ts/get-technologies';

const router = express.Router();

router.use('/categories', categoriesRouter);

router.use('/register', register);
router.use('/', city);
router.use('/', language);
router.use('/', technology);
router.use('/hobbies', hobbyRouter);

export default router;
