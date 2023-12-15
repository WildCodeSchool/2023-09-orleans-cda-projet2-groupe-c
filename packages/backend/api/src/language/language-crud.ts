import express from 'express';

import { db } from '@app/backend-shared';

const languageRouter = express.Router();

// GET all languages
languageRouter.get('/', async (req, res) => {
  try {
    const { name, order } = req.query;

    let query = db.selectFrom('language').selectAll();

    // Verify if name is a string and not empty
    if (typeof name === 'string' && name.trim() !== '') {
      // if name is a string and not empty, add a WHERE clause to the query
      query = query.where('name', 'like', `%${name}%`);
    }

    // Verify if order is a string and not empty
    if (typeof order === 'string' && order.trim() !== '') {
      if (order === 'asc') {
        // if order is a string and not empty, add an ORDER BY clause to the query
        // sort by alphabetical order
        query = query.orderBy('name', 'asc');
      } else if (order === 'desc') {
        // sort by reverse alphabetical order
        query = query.orderBy('name', 'desc');
      }
    }

    const languages = await query.execute();

    res.status(200).json(languages);
  } catch {
    res
      .status(500)
      .send({ error: 'An error occurred while fetching languages' });
  }
});

// GET language by id
languageRouter.get('/:languageId', async (req, res) => {
  try {
    const languageId = Number.parseInt(req.params.languageId);

    const language = await db
      .selectFrom('language')
      .selectAll()
      .where('id', '=', languageId)
      .execute();

    if (language.length === 0) {
      return res.status(404).send({ message: 'Language not found' });
    }

    return res.status(200).json(language);
  } catch {
    return res
      .status(500)
      .send({ error: 'An error occurred while fetching language' });
  }
});

// // ADD language
// languageRouter.post('/languages', async (req, res) => {
//   try {
//     // eslint-disable-next-line @typescript-eslint/naming-convention
//     const { name, logo_path } = req.body;

//     await db
//       .insertInto('language')
//       .values({
//         name,
//         logo_path,
//       })
//       .executeTakeFirst();

//     return res.status(200).send({ message: 'Language added successfully' });
//   } catch {
//     res.status(500).send({ error: 'An error occurred while adding language' });
//   }
// });

// // UPDATE language
// languageRouter.put('/languages/:languageId', async (req, res) => {
//   try {
//     const languageId = Number.parseInt(req.params.languageId);
//     // eslint-disable-next-line @typescript-eslint/naming-convention
//     const { name, logo_path } = req.body;

//     await db
//       .updateTable('language')
//       .set({
//         name,
//         logo_path,
//       })
//       .where('id', '=', languageId)
//       .executeTakeFirst();

//     return res.status(200).json({ message: 'Language updated successfully' });
//   } catch {
//     return res.status(500).send({ error: 'An error occurred while updating' });
//   }
// });

// // DELETE language
// languageRouter.delete('/languages/:languageId', async (req, res) => {
//   try {
//     const languageId = Number.parseInt(req.params.languageId);

//     const language = await db
//       .selectFrom('language')
//       .selectAll()
//       .where('id', '=', languageId)
//       .execute();

//     if (language.length === 0) {
//       return res.status(404).send({ message: 'Language not found' });
//     }

//     await db
//       .deleteFrom('language')
//       .where('id', '=', languageId)
//       .executeTakeFirst();

//     return res.status(200).json({ message: 'Language deleted successfully' });
//   } catch {
//     return res.status(500).send({ error: 'An error occurred while deleting' });
//   }
// });

export default languageRouter;
