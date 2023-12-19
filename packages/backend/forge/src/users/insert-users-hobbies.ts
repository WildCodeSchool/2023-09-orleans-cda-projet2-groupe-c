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

    // Function to generate a random hobby id
    const randomHobbyId = () => {
      const randomIndex = Math.floor(Math.random() * hobbies.length);
      return hobbies[randomIndex].id;
    };

    // Array to store all user hobbies
    const userHobbies = [];

    // For each user, assign 6 random hobbies
    for (const userId of users) {
      // Generate a random number between 1 and 6, this number will be the number of hobbies for each user
      const hobbyCount = Math.floor(Math.random() * MAX_HOBBIES_PER_USER) + 1;

      for (let index = 0; index < hobbyCount; index++) {
        userHobbies.push({
          order: index + 1,
          user_id: userId.id,
          hobby_id: randomHobbyId(),
        });
      }
    }

    // Insert all user hobbies
    await db.insertInto('hobby_user').values(userHobbies).execute();
  } catch (error) {
    throw new Error(`Impossible to insert users hobbies: ${String(error)}`);
  }
};
