import express from 'express';

import { db } from '@app/backend-shared';

const cityRouter = express.Router();

cityRouter.get('/', async (req, res) => {
  try {
    const { name, order } = req.query;

    let query = db.selectFrom('city').selectAll();

    //verify if name is a string and not empty
    if (typeof name === 'string' && name.trim() !== '') {
      query = query.where('name', 'like', `${name}%`);
    }

    if (typeof order === 'string' && order.trim() !== '') {
      if (order === 'asc') {
        query = query.orderBy('name', 'asc');
      } else if (order === 'desc') {
        query = query.orderBy('name', 'desc');
      }
    }

    const cities = await query.execute();

    res.status(200).json(cities);
  } catch {
    res.status(200).send({ error: 'An error occured while fetching cities' });
  }
});

export { cityRouter };
