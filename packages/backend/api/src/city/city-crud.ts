import express from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

const cityRouter = express.Router();

// GET all cities
cityRouter.get('/cities', async (req, res) => {
  try {
    const { name } = req.query;

    let query = db.selectFrom('city').selectAll();

    // Verify if name is a string and not empty
    if (typeof name === 'string' && name.trim() !== '') {
      // if name is a string and not empty, add a WHERE clause to the query
      query = query.where('name', 'like', `%${name}%`);
    }

    const cities = await query.execute();

    res.status(200).json(cities);
  } catch {
    res.status(500).send({ error: 'An error occurred while fetching cities' });
  }
});

// GET city by id
cityRouter.get('/cities/:cityId', async (req, res) => {
  try {
    const cityId = Number.parseInt(req.params.cityId);

    const city = await db
      .selectFrom('city')
      .selectAll()
      .where('id', '=', cityId)
      .execute();

    if (city.length === 0) {
      return res.status(404).send({ message: 'City not found' });
    }

    return res.status(200).json(city);
  } catch {
    return res
      .status(500)
      .send({ error: 'An error occurred while fetching city' });
  }
});

// ADD city
cityRouter.post('/cities', async (req, res) => {
  try {
    const { name, coordinates } = req.body;

    await db
      .insertInto('city')
      .values({
        name,
        coordinates: sql`POINT(${coordinates.x}, ${coordinates.y})`,
      })
      .executeTakeFirst();

    return res.status(200).send({ message: 'City added successfully' });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

// UPDATE city
cityRouter.put('/cities/:cityId', async (req, res) => {
  try {
    const cityId = Number.parseInt(req.params.cityId);
    const { name, coordinates } = req.body;

    await db
      .updateTable('city')
      .set({
        name,
        coordinates: sql`POINT(${coordinates.x}, ${coordinates.y})`,
      })
      .where('id', '=', cityId)
      .executeTakeFirst();

    return res.status(200).json({ message: 'City updated successfully' });
  } catch {
    return res.status(500).send({ error: 'An error occurred while updating' });
  }
});

// DELETE city
cityRouter.delete('/cities/:cityId', async (req, res) => {
  try {
    const cityId = Number.parseInt(req.params.cityId);

    const city = await db
      .selectFrom('city')
      .selectAll()
      .where('id', '=', cityId)
      .execute();

    if (city.length === 0) {
      return res.status(404).send({ message: 'city not found' });
    }

    await db.deleteFrom('city').where('id', '=', cityId).executeTakeFirst();

    return res.status(200).json({ message: 'City deleted successfully' });
  } catch {
    return res.status(500).send({ error: 'An error occurred while deleting' });
  }
});

export default cityRouter;
