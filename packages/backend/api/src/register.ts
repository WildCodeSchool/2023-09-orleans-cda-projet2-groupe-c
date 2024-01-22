import express from 'express';

import { db } from '@app/backend-shared';
import type { FormBackValidation } from '@app/shared';

const register = express.Router();

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
    } = req.body as FormBackValidation;

    //use the transaction property allows us to cancel the request if an
    //error has arrived during the submission of the data
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

      //get the user id newly created
      const userId = userResult.insertId;

      // It maps over the 'languages, technologies and hobbies' array, which contains objects with 'id' and 'order' properties.
      // e.g For each language, it creates a new record with 'language_id' set to the language's 'id',
      // 'user_id' set to 'userId', and 'order' set to the language's 'order'.
      await trx
        .insertInto('language_user')
        .values(
          languages.map((language: { id: number; order: number }) => ({
            language_id: language.id,
            user_id: Number(userId),
            order: language.order,
          })),
        )
        .execute();

      await trx
        .insertInto('technology_user')
        .values(
          technologies.map((technology: { id: number; order: number }) => ({
            technology_id: technology.id,
            user_id: Number(userId),
            order: technology.order,
          })),
        )
        .execute();

      await trx
        .insertInto('hobby_user')
        .values(
          hobbies.map((hobby: { id: number; order: number }) => ({
            hobby_id: hobby.id,
            user_id: Number(userId),
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