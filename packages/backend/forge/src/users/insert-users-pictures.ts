import { db } from '@app/backend-shared';
import type { Gender } from '@app/types';

const MAX_PICTURES_PER_USER = 6;
const MAX_INDEX_PICTURE = 20;

export const insertUsersPictures = async (userGender: Gender) => {
  try {
    // Get all users id
    const users = await db
      .selectFrom('user')
      .select(['id', 'gender'])
      .orderBy('id')
      .execute();

    // Array to store all user pictures
    const userPictures = [];

    // For each user, insert a random pictures
    for (const user of users) {
      let pictureGender = user.gender;

      // If user's gender is "non-binary", set to "woman" or "man"
      if (pictureGender === 'non-binary') {
        pictureGender = Math.random() < 0.5 ? 'woman' : 'man';
      }

      // Generate a random number between 1 and 6, this number will be the number of pictures for each user
      const pictureCount =
        Math.floor(Math.random() * MAX_PICTURES_PER_USER) + 1;

      // If the user gender is the same as the parameter, push a number random of pictures to the array "userPictures" for each user
      if (user.gender === userGender) {
        for (let index = 0; index < pictureCount; index++) {
          // Generate a random index between 1 and 20
          // 20 man's picture
          // 20 woman's picture
          const randomIndex = Math.floor(Math.random() * MAX_INDEX_PICTURE) + 1;

          // Push a picture to the array "userPictures"
          userPictures.push({
            order: index + 1,
            picture_path: `/images/users-pictures/${pictureGender}-${randomIndex}.webp`,
            user_id: user.id,
          });
        }
      }
    }

    // insert man's or woman's or non-binary's pictures to the user in database depending on the parameter
    await db.insertInto('picture').values(userPictures).execute();
  } catch (error) {
    throw new Error(`Impossible to insert users pictures: ${String(error)}`);
  }
};
