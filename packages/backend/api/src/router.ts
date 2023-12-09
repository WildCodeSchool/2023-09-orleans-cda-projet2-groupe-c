import express from 'express';

import pictureRouter from './picture/picture-crud';

const router = express.Router();

router.use('/', pictureRouter);

export default router;
