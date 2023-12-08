import express from 'express';

import { db } from '@app/backend-shared';

const register = express.Router();

register.get('/users', async (req, res) => {
  const users = await db.selectFrom('user').selectAll().execute();
  return res.json(users);
});
register.post('/', async (req, res) => {
  const { name, role, birthdate, gender, city_id, email, password } = req.body;

  const insertUsers = await db
    .insertInto('user')
    .values({
      name,
      role,
      birthdate,
      gender,
      city_id,
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
