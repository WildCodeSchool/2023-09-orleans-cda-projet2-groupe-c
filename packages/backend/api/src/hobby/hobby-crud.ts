import express from 'express';
import { jsonArrayFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';

const hobbyRouter = express.Router();

hobbyRouter.get('/', async (req, res) => {
  try {
    const hobbiesByCategory = await db
      .selectFrom('hobby_category')
      .select((eb) => [
        'hobby_category.logo_path',
        'hobby_category.name as category_name',
        jsonArrayFrom(
          eb
            .selectFrom('hobby')
            .select(['hobby.name as hobby_name', 'hobby.id as hobby_id'])
            .whereRef('hobby.hobby_category_id', '=', 'hobby_category.id')
            .orderBy('hobby_name asc'),
        ).as('hobbies'),
      ])
      .orderBy('hobby_category.name asc')
      .execute();

    return res.status(200).json(hobbiesByCategory);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while retrieving data ${String(error)}`,
    });
  }
});

export { hobbyRouter };
