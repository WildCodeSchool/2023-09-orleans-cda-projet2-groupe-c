import express from 'express';

import { db } from '@app/backend-shared';

const register = express.Router();

register.get('/users', async (_req, res) => {
  const users = await db.selectFrom('user').selectAll().execute();
  return res.json(users);
});

register.post('/', async (req, res) => {
  try {
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
      languages,
      technologies,
      hobbies,
    } = req.body;

    await db.transaction().execute(async (trx) => {
      const userResult = await trx
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

        .executeTakeFirstOrThrow();

      //recupère l'id de l'user nouvellement creer
      const userId = userResult.insertId;

      await trx
        .insertInto('language_user')
        .values(
          languages.map((language: { id: number; order: number }) => ({
            language_id: language.id,
            user_id: userId,
            order: language.order,
          })),
        )
        .execute();

      await trx
        .insertInto('technology_user')
        .values(
          technologies.map((technology: { id: number; order: number }) => ({
            technology_id: technology.id,
            user_id: userId,
            order: technology.order,
          })),
        )
        .execute();

      await trx
        .insertInto('hobby_user')
        .values(
          hobbies.map((hobby: { id: number; order: number }) => ({
            hobby_id: hobby.id,
            user_id: userId,
            order: hobby.order,
          })),
        )
        .execute();
    });

    return res.json({ success: true, message: 'User add with success !' });
  } catch (error) {
    return res.status(500).json({
      error: `An error occurred during registration ${String(error)}`,
    });
  }
});

export { register };
