import express from 'express';

import { db } from '@app/backend-shared';

const hobbyRouter = express.Router();

// GET all hobbies
hobbyRouter.get('/hobbies', async (req, res) => {
  try {
    const { name, order } = req.query;

    let sql = db.selectFrom('hobby').selectAll();

    // Verify if name is a string and not empty
    if (typeof name === 'string' && name.trim() !== '') {
      // if name is a string and not empty, add a WHERE clause to the query
      // sort by name
      sql = sql.where('name', 'like', `%${name}%`);
    }

    // Verify if order is a string and not empty
    if (typeof order === 'string' && order.trim() !== '') {
      if (order === 'asc') {
        // if order is a string and not empty, add an ORDER BY clause to the query
        // sort by alphabetical order
        sql = sql.orderBy('name', 'asc');
      } else if (order === 'desc') {
        // sort by reverse alphabetical order
        sql = sql.orderBy('name', 'desc');
      }
    }

    const hobbies = await sql.execute();

    res.status(200).json(hobbies);
  } catch {
    res.status(500).send({ error: 'An error occurred while fetching hobbies' });
  }
});

// GET hobby by id
hobbyRouter.get('/hobbies/:hobbyId', async (req, res) => {
  try {
    const hobbyId = Number.parseInt(req.params.hobbyId);

    const hobby = await db
      .selectFrom('hobby')
      .selectAll()
      .where('id', '=', hobbyId)
      .execute();

    // Verify if hobby exists
    return hobby.length === 0
      ? res.status(404).send({ message: 'Hobby not found' })
      : res.status(200).json(hobby);
  } catch {
    return res
      .status(500)
      .send({ error: 'An error occurred while fetching hobby' });
  }
});

// ADD hobby
hobbyRouter.post('/hobbies', async (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { name, hobby_category_id } = req.body;

    await db
      .insertInto('hobby')
      .values({
        name,
        hobby_category_id,
      })
      .executeTakeFirst();

    return res.status(200).send({ message: 'Hobby added successfully' });
  } catch {
    res.status(500).send({ error: 'An error occurred while adding hobby' });
  }
});

// UPDATE hobby
hobbyRouter.put('/hobbies/:hobbyId', async (req, res) => {
  try {
    const hobbyId = Number.parseInt(req.params.hobbyId);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { name, hobby_category_id } = req.body;

    // Get hobby by id
    const hobby = await db
      .selectFrom('hobby')
      .selectAll()
      .where('id', '=', hobbyId)
      .execute();

    // Verify if hobby exists
    if (hobby.length === 0) {
      return res.status(404).send({ message: 'hobby not found' });
    } else {
      // If exist, update hobby
      await db
        .updateTable('hobby')
        .set({
          name,
          hobby_category_id,
        })
        .where('id', '=', hobbyId)
        .executeTakeFirst();
    }

    return res.status(200).json({ message: 'hobby updated successfully' });
  } catch {
    return res.status(500).send({ error: 'An error occurred while updating' });
  }
});

// DELETE hobby
hobbyRouter.delete('/hobbies/:hobbyId', async (req, res) => {
  try {
    const hobbyId = Number.parseInt(req.params.hobbyId);

    // Get hobby by id
    const hobby = await db
      .selectFrom('hobby')
      .selectAll()
      .where('id', '=', hobbyId)
      .execute();

    // Verify if hobby exists
    if (hobby.length === 0) {
      return res.status(404).send({ message: 'hobby not found' });
    } else {
      // If exist, delete hobby
      await db.deleteFrom('hobby').where('id', '=', hobbyId).executeTakeFirst();
    }

    return res.status(200).json({ message: 'hobby deleted successfully' });
  } catch {
    return res.status(500).send({ error: 'An error occurred while deleting' });
  }
});

export default hobbyRouter;
