import { db } from '@app/backend-shared';
import type { Gender } from '@app/shared';

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
      // Create a new set to avoid duplicate pictures
      const picturesId = new Set();

      let pictureGender = user.gender;

      // If user's gender is "non-binary", set to "woman" or "man"
      if (pictureGender === 'non-binary') {
        pictureGender = Math.random() < 0.5 ? 'woman' : 'man';
      }

      // Generate a random number between 1 and 6, this number will be the number of pictures for each user
      const pictureCount =
        Math.floor(Math.random() * MAX_PICTURES_PER_USER) + 1;

      // Loop to generate a random index for each pictures par user and add to the set "picturesId"
      while (picturesId.size < pictureCount) {
        // Generate a random index between 1 and 20
        const randomIndex = Math.floor(Math.random() * MAX_INDEX_PICTURE) + 1;

        // Add the picture index to the set
        picturesId.add(randomIndex);
      }

      // If the user gender is the same as the parameter, push a number random of pictures to the array "userPictures" for each user
      if (user.gender === userGender) {
        let order = 1;

        // For each pictures in the set, push an object with order, user_id and picture_path fields to the array "userPictures"
        for (const pictureId of picturesId) {
          userPictures.push({
            order: order++,
            picture_path: `/images/users-pictures/${pictureGender}-${Number(
              pictureId,
            )}.webp`,
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
