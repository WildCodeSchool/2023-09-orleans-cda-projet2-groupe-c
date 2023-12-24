import { db } from '@app/backend-shared';

const MAX_HOBBIES_PER_USER = 6;

export const insertUsersHobbies = async () => {
  try {
    // Get all users id
    const users = await db
      .selectFrom('user')
      .select('id')
      .orderBy('id')
      .execute();

    // Get all hobbies id
    const hobbies = await db
      .selectFrom('hobby')
      .select('id')
      .orderBy('id')
      .execute();

    // Array to store all user hobbies
    const userHobbies = [];

    // For each user, assign 1 to 6 random hobbies
    for (const user of users) {
      // Create a new set to avoid duplicate hobbies
      const hobbiesId = new Set();

      // Generate a random number between 1 and 6, this number will be the number of hobbies for each user
      const randomHobbyCount =
        Math.floor(Math.random() * MAX_HOBBIES_PER_USER) + 1;

      // Loop to generate a random index for each hobbies par user and add to the set "hobbiesId"
      while (hobbiesId.size < randomHobbyCount) {
        // Generate a random index between 0 and the length of the hobbies array
        const randomIndex = Math.floor(Math.random() * hobbies.length);

        // Add the language id to the set
        hobbiesId.add(hobbies[randomIndex].id);
      }

      let order = 1;

      // For each hobbies in the set, push an object with order, user_id and hobby_id fields to the array "userHobbies"
      for (const hobbyId of hobbiesId) {
        userHobbies.push({
          order: order++,
          user_id: user.id,
          hobby_id: hobbyId as number,
        });
      }
    }

    // Insert all user hobbies
    await db.insertInto('hobby_user').values(userHobbies).execute();
  } catch (error) {
    throw new Error(`Impossible to insert users hobbies: ${String(error)}`);
  }
};
