import { db } from '@app/backend-shared';

// const MAX_PICTURES_PER_USER = 6;

export const insertUsersLanguages = async () => {
  // Get all users id
  const users = await db
    .selectFrom('user')
    .select(['id', 'gender'])
    .orderBy('id')
    .execute();

  for (const user of users) {
    const ramdomPicture = Math.floor(Math.random() * 20);
    if (user.gender && (user.gender as string) === 'man') {
      await db
        .insertInto('picture')
        .values({
          order: 1,
          picture_path: `/images/users-pictures/man-${ramdomPicture}.webp`,
          user_id: user.id,
        })
        .execute();
    }
  }

  // if (user.gender === 'woman') {
  //   console.log(user.gender);
  // }

  // if (user.gender === 'non-binary') {
  //   console.log(user.gender);
  // }
};

// console.log(users);

// await db
//   .insertInto('picture')
//   .values({
//     order: 1,
//     picture_path: 'test',
//     user_id: 1,
//   })
//   .execute();

// insertUsersLanguages();
