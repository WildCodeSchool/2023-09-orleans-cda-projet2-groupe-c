import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import router from './router';

const app = express();

const HOST = process.env.BACKEND_HOST ?? 'localhost';
const PORT = process.env.BACKEND_PORT ?? 3000;
const COOKIE_SECRET = process.env.COOKIE_SECRET;

app.use(express.json());

app.use(cookieParser(COOKIE_SECRET));

app.use('/api', router);

app.use(
  express.static(
    path.join(path.dirname(fileURLToPath(import.meta.url)), '../public'),
  ),
);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on http://${HOST}:${PORT}`);
});
