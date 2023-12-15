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

// // ADD category
// categoriesRouter.post('/categories', async (req, res) => {
//   try {
//     // eslint-disable-next-line @typescript-eslint/naming-convention
//     const { name, logo_path } = req.body;

//     await db
//       .insertInto('hobby_category')
//       .values({
//         name,
//         logo_path,
//       })
//       .executeTakeFirst();

//     return res.status(200).send({ message: 'Category added successfully' });
//   } catch {
//     res.status(500).send({ error: 'An error occurred while adding category' });
//   }
// });

// UPDATE category
// categoriesRouter.put('/categories/:categoryId', async (req, res) => {
//   try {
//     const categoryId = Number.parseInt(req.params.categoryId);
//     // eslint-disable-next-line @typescript-eslint/naming-convention
//     const { name, logo_path } = req.body;

//     // Get category by id
//     const category = await db
//       .selectFrom('hobby_category')
//       .selectAll()
//       .where('id', '=', categoryId)
//       .execute();

//     // Verify if category exists
//     if (category.length === 0) {
//       return res.status(404).send({ message: 'Category not found' });
//     } else {
//       // If exist, update category
//       await db
//         .updateTable('hobby_category')
//         .set({
//           name,
//           logo_path,
//         })
//         .where('id', '=', categoryId)
//         .executeTakeFirst();
//     }

//     return res.status(200).json({ message: 'Category updated successfully' });
//   } catch {
//     return res.status(500).send({ error: 'An error occurred while updating' });
//   }
// });

// DELETE category
// categoriesRouter.delete('/categories/:categoryId', async (req, res) => {
//   try {
//     const categoryId = Number.parseInt(req.params.categoryId);

//     // Get category by id
//     const category = await db
//       .selectFrom('hobby_category')
//       .selectAll()
//       .where('id', '=', categoryId)
//       .execute();

//     // Verify if category exists
//     if (category.length === 0) {
//       return res.status(404).send({ message: 'Category not found' });
//     } else {
//       // If exist, delete category
//       await db
//         .deleteFrom('hobby_category')
//         .where('id', '=', categoryId)
//         .executeTakeFirst();
//     }

//     return res.status(200).json({ message: 'Category deleted successfully' });
//   } catch {
//     return res.status(500).send({ error: 'An error occurred while deleting' });
//   }
// });

export default categoriesRouter;
