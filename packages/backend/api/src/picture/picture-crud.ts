import express from 'express';

import { db } from '@app/backend-shared';

const pictureRouter = express.Router();

// GET all pictures from a user
pictureRouter.get('/users/:userId/pictures', async (req, res) => {
  try {
    const userId = Number.parseInt(req.params.userId);

    const pictures = await db
      .selectFrom('picture')
      .selectAll()
      .where('user_id', '=', userId)
      .execute();

    res.status(200).json(pictures);
  } catch {
    res
      .status(500)
      .send({ error: 'An error occurred while fetching pictures' });
  }
});

// GET picture by id from a user
pictureRouter.get('/users/:userId/pictures/:pictureId', async (req, res) => {
  try {
    const userId = Number.parseInt(req.params.userId);
    const pictureId = Number.parseInt(req.params.pictureId);

    const picture = await db
      .selectFrom('picture')
      .selectAll()
      .where('user_id', '=', userId)
      .where('id', '=', pictureId)
      .execute();

    if (picture.length === 0) {
      return res.status(404).send({ message: 'Picture not found' });
    }

    return res.status(200).json(picture);
  } catch {
    return res
      .status(500)
      .send({ error: 'An error occurred while fetching picture' });
  }
});

// ADD picture from a user
pictureRouter.post('/users/:userId/pictures', async (req, res) => {
  try {
    const userId = Number.parseInt(req.params.userId);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { picture_path } = req.body;

    // Get the number of pictures for this user
    const pictureCount = await db
      .selectFrom('picture')
      .select(({ fn }) => [fn.count('picture.id').as('picture_count')])
      .executeTakeFirst();

    // picture's order
    let order = 1;

    // If there is already a picture, set the order to the next one
    if (pictureCount) {
      order = (pictureCount.picture_count as number) + 1;
    }

    await db
      .insertInto('picture')
      .values({
        order,
        picture_path,
        user_id: userId,
      })
      .executeTakeFirst();

    return res.status(200).send({ message: 'Picture added successfully' });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

// UPDATE picture
pictureRouter.put('/users/:userId/pictures/:pictureId', async (req, res) => {
  try {
    const userId = Number.parseInt(req.params.userId);
    const pictureId = Number.parseInt(req.params.pictureId);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { picture_path } = req.body;

    await db
      .updateTable('picture')
      .set({
        picture_path,
        user_id: userId,
      })
      .where('user_id', '=', userId)
      .where('id', '=', pictureId)
      .executeTakeFirst();

    return res.status(200).json({ message: 'Picture updated successfully' });
  } catch {
    return res.status(500).send({ error: 'An error occurred while updating' });
  }
});

// DELETE picture
pictureRouter.delete('/users/:userId/pictures/:pictureId', async (req, res) => {
  try {
    const userId = Number.parseInt(req.params.userId);
    const pictureId = Number.parseInt(req.params.pictureId);

    const picture = await db
      .selectFrom('picture')
      .selectAll()
      .where('user_id', '=', userId)
      .where('id', '=', pictureId)
      .execute();

    if (picture.length === 0) {
      return res.status(404).send({ message: 'Picture not found' });
    }

    await db
      .deleteFrom('picture')
      .where('id', '=', pictureId)
      .executeTakeFirst();

    return res.status(200).json({ message: 'Picture deleted successfully' });
  } catch {
    return res.status(500).send({ error: 'An error occurred while deleting' });
  }
});

export default pictureRouter;
