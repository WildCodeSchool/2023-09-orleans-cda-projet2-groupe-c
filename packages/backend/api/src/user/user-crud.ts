/* eslint-disable unicorn/no-null */
import express from 'express';
import { jsonArrayFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';
import type { User } from '@app/shared';

const userRouter = express.Router();

async function getUsers(userId: number): Promise<User[]> {
  // Select all users with whom the initiator has not interacted
  //
  // MySQL query:
  //

  const users = await db
    .selectFrom('user as u')
    .select((eb) => [
      'u.id',
      'u.name',
      'u.birthdate',
      'u.gender',
      'u.biography',
      'u.account_github',
      jsonArrayFrom(
        eb
          .selectFrom('city as c')
          .select(['c.id', 'c.name as city_name', 'c.coordinates'])
          .whereRef('c.id', '=', 'u.city_id'),
      ).as('city'),
      jsonArrayFrom(
        eb
          .selectFrom('language_user as lu')
          .innerJoin('language as l', 'lu.language_id', 'l.id')
          .whereRef('lu.user_id', '=', 'u.id')
          .select(['l.id', 'l.name', 'lu.order', 'l.logo_path'])
          .orderBy('lu.order', 'asc')
          .limit(6),
      ).as('languages'),
      jsonArrayFrom(
        eb
          .selectFrom('technology_user as tu')
          .innerJoin('technology as t', 'tu.technology_id', 't.id')
          .whereRef('tu.user_id', '=', 'u.id')
          .select(['t.id', 't.name', 'tu.order', 't.logo_path'])
          .orderBy('tu.order', 'asc')
          .limit(6),
      ).as('technologies'),
      jsonArrayFrom(
        eb
          .selectFrom('hobby_user as hu')
          .innerJoin('hobby as h', 'hu.hobby_id', 'h.id')
          .innerJoin('hobby_category as hc', 'h.hobby_category_id', 'hc.id')
          .whereRef('hu.user_id', '=', 'u.id')
          .select(['hc.name as category', 'h.id', 'h.name', 'hu.order']),
      ).as('hobbies'),
      jsonArrayFrom(
        eb
          .selectFrom('picture as p')
          .whereRef('p.user_id', '=', 'u.id')
          .select(['p.id', 'p.order', 'p.picture_path'])
          .orderBy('p.order', 'asc')
          .limit(6),
      ).as('pictures'),
    ])
    .where((eb) =>
      eb.and([
        eb('u.name', 'is not', null),
        eb('u.birthdate', 'is not', null),
        eb('u.gender', 'is not', null),
        eb('u.city_id', 'is not', null),
        eb('u.activate_at', 'is not', null),
      ]),
    )
    .where('u.id', 'not in', (eb) =>
      eb
        .selectFrom('user_action as ua')
        .select('ua.receiver_id')
        .where('ua.initiator_id', '=', userId),
    )
    .execute();

  return users;
}

// const users = await db
//   .selectFrom('user as u')
//   .where((eb) =>
//     eb.and([
//       eb('u.name', 'is not', null),
//       eb('u.birthdate', 'is not', null),
//       eb('u.gender', 'is not', null),
//       eb('u.city_id', 'is not', null),
//       eb('u.activate_at', 'is not', null),
//     ]),
//   )
//   .where('u.id', 'not in', (eb) =>
//     eb
//       .selectFrom('user_action as ua')
//       .select('ua.receiver_id')
//       .where('ua.initiator_id', '=', userId),
//   )
//   .select([
//     'u.id',
//     'u.name',
//     'u.birthdate',
//     'u.gender',
//     'u.biography',
//     'u.account_github',
//     'u.city_id',
//   ])
//   .execute();

// Remove the current user from the list of users
//   const filteredUsers: UserWithLanguages[] = users.filter(
//     (user) => Number(user.id) !== userId,
//   );

//   // For each user
//   for (const filteredUser of filteredUsers) {
//     // Select all languages from a user
//     const languages = await db
//       .selectFrom('language_user as lu')
//       .innerJoin('language as l', 'lu.language_id', 'l.id')
//       .where('lu.user_id', '=', filteredUser.id)
//       .selectAll()
//       .execute();

//     // Select all technologies from a user
//     const technologies = await db
//       .selectFrom('technology_user as tu')
//       .innerJoin('technology as t', 'tu.technology_id', 't.id')
//       .where('tu.user_id', '=', filteredUser.id)
//       .selectAll()
//       .execute();

//     // Select all hobbies from a user
//     const hobbies = await db
//       .selectFrom('hobby_user as hu')
//       .innerJoin('hobby as h', 'hu.hobby_id', 'h.id')
//       .where('hu.user_id', '=', filteredUser.id)
//       .selectAll()
//       .execute();

//     // Select all pictures from a user
//     const pictures = await db
//       .selectFrom('picture as p')
//       .innerJoin('user as u', 'p.user_id', 'u.id')
//       .where('p.user_id', '=', filteredUser.id)
//       .selectAll()
//       .execute();

//     // Add languages, technologies, hobbies and pictures fields to the user
//     filteredUser.languages = languages.map((l) => l.name);
//     filteredUser.technologies = technologies.map((t) => t.name);
//     filteredUser.hobbies = hobbies.map((h) => h.name);
//     filteredUser.pictures = pictures.map((p) => p.picture_path);
//   }

//   return filteredUsers;
// }

// Fetch a list of users without the user logged in and return the first user from the list
userRouter.get('/:userId', async (req, res) => {
  try {
    const userId = Number.parseInt(req.params.userId);
    // const userIndex = 0;

    // Get users if account is activated and has all required fields
    const users = await getUsers(userId);

    // const selectedUser = filteredUsers[userIndex];

    res.status(200).json(users);
  } catch {
    res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
});

userRouter.post('/:userId', async (req, res) => {
  try {
    const userId = Number.parseInt(req.params.userId);
    const userIndex = Number.parseInt(req.body.userIndex);

    const users = await getUsers();

    const filteredUsers = users.filter((user) => Number(user.id) !== userId);

    const nextUserIndex = (userIndex + 1) % filteredUsers.length;
    const nextUser = filteredUsers[nextUserIndex];

    res.status(200).json(nextUser);
  } catch {
    res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
});

export default userRouter;
