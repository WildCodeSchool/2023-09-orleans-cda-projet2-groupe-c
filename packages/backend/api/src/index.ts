import cookieParser from 'cookie-parser';
import express from 'express';

import router from './router';

const app = express();

const HOST = process.env.BACKEND_HOST ?? 'localhost';
const PORT = process.env.BACKEND_PORT ?? 3000;
const COOKIE_SECRET = process.env.COOKIE_SECRET;

app.use(express.json());

app.use(cookieParser(COOKIE_SECRET));

app.use('/api', router);

app.listen(+PORT, '0.0.0.0', () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on http://${HOST}:${PORT}`);
});
