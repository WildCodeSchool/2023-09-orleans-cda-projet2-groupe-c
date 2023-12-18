import express from 'express';

import categoriesRouter from './category/category-crud';

const router = express.Router();

router.use('/categories', categoriesRouter);

export default router;
