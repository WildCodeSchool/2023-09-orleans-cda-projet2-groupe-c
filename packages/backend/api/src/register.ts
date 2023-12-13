import express from 'express';

import { db } from '@app/backend-shared';

const register = express.Router();

register.get('/users', async (req, res) => {
  const users = await db.selectFrom('user').selectAll().execute();
  return res.json(users);
});
register.post('/', async (req, res) => {
  const {
    name,
    role,
    birthdate,
    gender,
    cityId,
    biography,
    accountGithub,
    email,
    password,
  } = req.body; //city_id,

  const insertUsers = await db
    .insertInto('user')
    .values({
      name,
      role,
      birthdate,
      gender,
      city_id: cityId,
      biography,
      account_github: accountGithub,
      email,
      password,
    })
    .execute();
  for (const insertUser of insertUsers) {
    console.log(insertUser.insertId);
  }
  return res.json({
    ok: true,
  });
});

export { register };