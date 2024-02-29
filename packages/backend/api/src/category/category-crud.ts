import express from 'express';

import { db } from '@app/backend-shared';

const categoriesRouter = express.Router();

// GET all categories
categoriesRouter.get('/', async (req, res) => {
  try {
    const { name, order } = req.query;

    let query = db.selectFrom('hobby_category').selectAll();

    // Verify if name is a string and not empty
    if (typeof name === 'string' && name.trim() !== '') {
      // if name is a string and not empty, add a WHERE clause to the query
      // sort by name
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

    const categories = await query.execute();

    res.status(200).json(categories);
  } catch {
    res
      .status(500)
      .send({ error: 'An error occurred while fetching categories' });
  }
});

// GET category by id
categoriesRouter.get('/categories/:categoryId', async (req, res) => {
  try {
    const categoryId = Number.parseInt(req.params.categoryId);

    const category = await db
      .selectFrom('hobby_category')
      .selectAll()
      .where('id', '=', categoryId)
      .execute();

    // Verify if category exists
    return category.length === 0
      ? res.status(404).send({ message: 'Category not found' })
      : res.status(200).json(category);
  } catch {
    return res
      .status(500)
      .send({ error: 'An error occurred while fetching category' });
  }
});

export default categoriesRouter;
