import express from 'express';

import { db } from '@app/backend-shared';

const technologyRouter = express.Router();

// GET all technologies
technologyRouter.get('/', async (req, res) => {
  try {
    const { name, order } = req.query;

    let query = db.selectFrom('technology').selectAll();

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

    const technologies = await query.execute();

    res.status(200).json(technologies);
  } catch {
    res
      .status(500)
      .send({ error: 'An error occurred while fetching technologies' });
  }
});

// GET technology by id
technologyRouter.get('/:technologyId', async (req, res) => {
  try {
    const technologyId = Number.parseInt(req.params.technologyId);

    const technology = await db
      .selectFrom('technology')
      .selectAll()
      .where('id', '=', technologyId)
      .execute();

    if (technology.length === 0) {
      return res.status(404).send({ message: 'Technology not found' });
    }

    return res.status(200).json(technology);
  } catch {
    return res
      .status(500)
      .send({ error: 'An error occurred while fetching technology' });
  }
});

// // ADD technology
// technologyRouter.post('/technologies', async (req, res) => {
//   try {
//     // eslint-disable-next-line @typescript-eslint/naming-convention
//     const { name, logo_path } = req.body;

//     await db
//       .insertInto('technology')
//       .values({
//         name,
//         logo_path,
//       })
//       .executeTakeFirst();

//     return res.status(200).send({ message: 'Technology added successfully' });
//   } catch {
//     res
//       .status(500)
//       .send({ error: 'An error occurred while adding technology' });
//   }
// });

// // UPDATE technology
// technologyRouter.put('/technologies/:technologyId', async (req, res) => {
//   try {
//     const technologyId = Number.parseInt(req.params.technologyId);
//     // eslint-disable-next-line @typescript-eslint/naming-convention
//     const { name, logo_path } = req.body;

//     await db
//       .updateTable('technology')
//       .set({
//         name,
//         logo_path,
//       })
//       .where('id', '=', technologyId)
//       .executeTakeFirst();

//     return res.status(200).json({ message: 'technology updated successfully' });
//   } catch {
//     return res.status(500).send({ error: 'An error occurred while updating' });
//   }
// });

// // DELETE technology
// technologyRouter.delete('/technologies/:technologyId', async (req, res) => {
//   try {
//     const technologyId = Number.parseInt(req.params.technologyId);

//     const technology = await db
//       .selectFrom('technology')
//       .selectAll()
//       .where('id', '=', technologyId)
//       .execute();

//     if (technology.length === 0) {
//       return res.status(404).send({ message: 'Technology not found' });
//     }

//     await db
//       .deleteFrom('technology')
//       .where('id', '=', technologyId)
//       .executeTakeFirst();

//     return res.status(200).json({ message: 'Technology deleted successfully' });
//   } catch {
//     return res.status(500).send({ error: 'An error occurred while deleting' });
//   }
// });

export default technologyRouter;
