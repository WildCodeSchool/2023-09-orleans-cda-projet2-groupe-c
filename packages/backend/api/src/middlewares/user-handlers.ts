/* eslint-disable unicorn/no-null */
import type { Response } from 'express';
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';
import type { Request as ExpressRequest } from '@app/shared';

// Unwrap the type of the Promise
export type Users = Awaited<ReturnType<typeof users>>;

interface Request extends ExpressRequest {
  usersList?: Users;
}

const users = async (userId: number) => {
  // Select all users with whom the initiator has not interacted
  //
  // MySQL query:
  //
  // SELECT "u.id", "u.name", "u.birthdate", "u.gender", "u.biography", "u.account_github"
  //  (
  //    SELECT JSON_AGG(agg), '[]')
  //    FROM (
  //        SELECT "c.id", "c.name" AS "city_name", "c.coordinates"
  //        FROM "city" AS "c"
  //        WHERE "c.id" = "u.city_id"
  //    ) AS agg
  //  ) AS "city",
  // (
  //    SELECT JSON_AGG(agg), '[]')
  //    FROM (
  //        SELECT "l.id", "l.name", "lu.order", "l.logo_path"
  //        FROM "language_user" AS "lu"
  //        INNER JOIN "language" AS "l" ON "lu.language_id" = "l.id"
  //        WHERE "lu.user_id" = "u.id"
  //        ORDER BY "lu.order" ASC
  //        LIMIT 6
  //    ) AS agg
  //  ) AS "languages",
  // (
  //    SELECT JSON_AGG(agg), '[]')
  //    FROM (
  //        SELECT "t.id", "t.name", "tu.order", "t.logo_path"
  //        FROM "technology_user" AS "tu"
  //        INNER JOIN "technology" AS "t" ON "tu.technology_id" = "t.id"
  //        WHERE "tu.user_id" = "u.id"
  //        ORDER BY "tu.order" ASC
  //        LIMIT 6
  //    ) AS agg
  //  ) AS "technologies",
  // (
  //    SELECT JSON_AGG(agg), '[]')
  //    FROM (
  //        SELECT "hc.name" AS "category", "h.id", "h.name", "hu.order"
  //        FROM "hobby_user" AS "hu"
  //        INNER JOIN "hobby" AS "h" ON "hu.hobby_id" = "h.id"
  //        INNER JOIN "hobby_category" AS "hc" ON "h.hobby_category_id" = "hc.id"
  //        WHERE "hu.user_id" = "u.id"
  //    ) AS agg
  //  ) AS "hobbies",
  // (
  //    SELECT JSON_AGG(agg), '[]')
  //    FROM (
  //        SELECT "p.id", "p.order", "p.picture_path"
  //        FROM "picture" AS "p"
  //        WHERE "p.user_id" = "u.id"
  //        ORDER BY "p.order" ASC
  //        LIMIT 6
  //    ) AS agg
  //  ) AS "pictures"
  // FROM "user" AS "u"
  // WHERE (
  //    "u.name" IS NOT NULL
  //    AND "u.birthdate" IS NOT NULL
  //    AND "u.gender" IS NOT NULL
  //    AND "u.city_id" IS NOT NULL
  //    AND "u.activate_at" IS NOT NULL
  // )
  // AND "u.id" NOT IN (
  //    SELECT "ua.receiver_id"
  //    FROM "user_action" AS "ua"
  //    WHERE "ua.initiator_id" = ?
  // )
  const users = await db
    .selectFrom('user as u')
    .select((eb) => [
      'u.id',
      'u.name',
      'u.birthdate',
      'u.gender',
      'u.biography',
      'u.account_github',
      jsonObjectFrom(
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
          .select([
            'hc.name as category',
            'hc.logo_path',
            'h.id',
            'h.name',
            'hu.order',
          ]),
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

  // Remove the user logged in from the list of users
  const filteredUsers = users.filter((user) => Number(user.id) !== userId);

  return filteredUsers;
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: () => void,
) => {
  try {
    const userId = req.userId;

    if (userId === undefined) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized!',
      });
    }

    const usersList = await users(userId);
    req.usersList = usersList;

    next();
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Internal server error!',
    });
  }
};
