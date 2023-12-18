import express from 'express';

import categoriesRouter from './category/category-crud';
import technologyRouter from './technology/technology-crud';

const router = express.Router();

router.use('/categories', categoriesRouter);

router.use('/technologies', technologyRouter);

export default router;
