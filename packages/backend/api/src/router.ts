import express from 'express';

import pictureRouter from './picture/picture-crud';

const router = express.Router();

router.use('/users', pictureRouter);

export default router;
