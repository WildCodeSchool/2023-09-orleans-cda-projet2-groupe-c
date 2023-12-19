import { db } from '@app/backend-shared';
import type { Gender } from '@app/types';

const MAX_PICTURES_PER_USER = 6;

export const insertUsersPictures = async (userGender: Gender) => {
  // Get all users id
  const users = await db
    .selectFrom('user')
    .select(['id', 'gender'])
    .orderBy('id')
    .execute();

  // For each user, insert a random pictures
  for (const user of users) {
    let pictureGender = user.gender;

    // If user's gender is "non-binary", set to "woman" or "man"
    if (pictureGender === 'non-binary') {
      pictureGender = Math.random() < 0.5 ? 'woman' : 'man';
    }

    // Generate a random number between 1 and 6, this number will be the number of pictures for each user
    const pictureCount = Math.floor(Math.random() * MAX_PICTURES_PER_USER) + 1;

    if (user.gender === userGender) {
      for (let index = 0; index < pictureCount; index++) {
        // Generate a random index between 1 and 20
        // 20 man's picture
        // 20 woman's picture
        const randomIndex = Math.floor(Math.random() * 20) + 1;

        // insert man's or woman's picture to the user in database depending on the parameter
        await db
          .insertInto('picture')
          .values({
            order: index + 1,
            picture_path: `/images/users-pictures/${pictureGender}-${randomIndex}.webp`,
            user_id: user.id,
          })
          .execute();
      }
    }
  }
};
