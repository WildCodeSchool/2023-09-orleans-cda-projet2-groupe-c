import express from 'express';

import { db } from '@app/backend-shared';

const register = express.Router();

register.get('/users', async (req, res) => {
  const users = await db.selectFrom('user').selectAll().execute();
  return res.json(users);
});
/* register.post('/', async (_req, res) => { */
//
/*   const name = 'Greg0';
  const email = 'Greg0@mama.com';
  const password = '123456';
  const role = 'user'; */
/*   const insertUsers = await db
    .insertInto('user')
    .values({
      name,
      role,
      email,
      password,
    })
    .execute(); */
/*  for (const insertUser of insertUsers) {
    console.log(insertUser.insertId);
  } */
/*   return res.json({
    ok: true,
  }); */
/* }); */

export { register };
