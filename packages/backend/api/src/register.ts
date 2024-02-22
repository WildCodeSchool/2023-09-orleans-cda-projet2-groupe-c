import express from 'express';

import { db } from '@app/backend-shared';
import type { FormProfileBodyBackend, Request } from '@app/shared';

import { getUserId } from './middlewares/auth-handlers';

const register = express.Router();

register.post('/', getUserId, async (req: Request, res) => {
  try {
    const {
      name,
      birthdate,
      gender,
      cityId,
      biography,
      accountGithub,
      languages,
      technologies,
      hobbies,
      distance,
      languagePrefId,
      genderPref,
    } = req.body as FormProfileBodyBackend;

    const userId = req.userId as number;

    // Use the transaction property allows us to cancel the request if an
    // Error has arrived during the submission of the data
    await db.transaction().execute(async (trx) => {
      await trx
        .updateTable('user')
        .set({
          name,
          birthdate,
          gender,
          city_id: Number(cityId),
          biography,
          account_github: String(accountGithub),
        })
        .where('user.id', '=', userId)
        .executeTakeFirstOrThrow();

      // It maps over the 'languages, technologies and hobbies' array, which contains objects with 'id' and 'order' properties.
      // e.g For each language, it creates a new record with 'language_id' set to the language's 'id',
      // 'user_id' set to 'userId', and 'order' set to the language's 'order'.
      await trx
        .insertInto('language_user')
        .values(
          languages.map((language) => ({
            language_id: language.id,
            user_id: Number(userId),
            order: language.order,
          })),
        )
        .execute();

      await trx
        .insertInto('technology_user')
        .values(
          technologies.map((technology) => ({
            technology_id: technology.id,
            user_id: Number(userId),
            order: technology.order,
          })),
        )
        .execute();

      await trx
        .insertInto('hobby_user')
        .values(
          hobbies.map((hobby) => ({
            hobby_id: hobby.id,
            user_id: Number(userId),
            order: hobby.order,
          })),
        )
        .execute();

      await trx
        .insertInto('preference')
        .values({
          distance,
          language_pref_id: Number(languagePrefId),
          gender_pref: genderPref,
          user_id: Number(userId),
        })
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
