import express from 'express';

import { db } from '@app/backend-shared';

const technologyRouter = express.Router();

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

export default technologyRouter;
