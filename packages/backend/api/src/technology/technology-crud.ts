import express from 'express';

import { db } from '@app/backend-shared';

const technologyRouter = express.Router();

// GET all technologies
technologyRouter.get('/technologies', async (req, res) => {
  try {
    const { name } = req.query;

    let query = db.selectFrom('technology').selectAll();

    // Verify if name is a string and not empty
    if (typeof name === 'string' && name.trim() !== '') {
      // if name is a string and not empty, add a WHERE clause to the query
      query = query.where('name', '=', name);
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
technologyRouter.get('/technologies/:id', async (req, res) => {
  try {
    const technologyId = Number.parseInt(req.params.id);

    const technology = await db
      .selectFrom('technology')
      .select(['id', 'name', 'logo_path'])
      .where('id', '=', technologyId)
      .execute();

    if (technology.length === 0) {
      return res.status(404).send({ message: 'technology not found' });
    }

    return res.status(200).json(technology);
  } catch {
    return res
      .status(500)
      .send({ error: 'An error occurred while fetching technology' });
  }
});

// ADD technology
technologyRouter.post('/technologies', async (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { name, logo_path } = req.body;

    await db
      .insertInto('technology')
      .values({
        name,
        logo_path,
      })
      .executeTakeFirst();

    return res.status(200).send({ message: 'technology added successfully' });
  } catch {
    res
      .status(500)
      .send({ error: 'An error occurred while adding technology' });
  }
});

// UPDATE technology
technologyRouter.put('/technologies/:id', async (req, res) => {
  try {
    const technologyId = Number.parseInt(req.params.id);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { name, logo_path } = req.body;

    await db
      .updateTable('technology')
      .set({
        name,
        logo_path,
      })
      .where('id', '=', technologyId)
      .executeTakeFirst();

    return res.status(200).json({ message: 'technology updated successfully' });
  } catch {
    return res.status(500).send({ error: 'An error occurred while updating' });
  }
});

// DELETE technology
technologyRouter.delete('/technologies/:id', async (req, res) => {
  try {
    const technologyId = Number.parseInt(req.params.id);

    const technology = await db
      .selectFrom('technology')
      .select(['id'])
      .where('id', '=', technologyId)
      .execute();

    if (technology.length === 0) {
      return res.status(404).send({ message: 'technology not found' });
    }

    await db
      .deleteFrom('technology')
      .where('id', '=', technologyId)
      .executeTakeFirst();

    return res.status(200).json({ message: 'technology deleted successfully' });
  } catch {
    return res.status(500).send({ error: 'An error occurred while deleting' });
  }
});

export default technologyRouter;
