import express from 'express';

import categoriesRouter from './category/category-crud';

const router = express.Router();

router.use('/', categoriesRouter);

export default router;
