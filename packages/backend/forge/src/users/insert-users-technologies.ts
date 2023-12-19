import { db } from '@app/backend-shared';

const MAX_TECHNOLOGIES_PER_USER = 6;

export const insertUsersTechnologies = async () => {
  try {
    // Get all users id
    const users = await db
      .selectFrom('user')
      .select('id')
      .orderBy('id')
      .execute();

    // Get all technologies id
    const technology = await db
      .selectFrom('technology')
      .select('id')
      .orderBy('id')
      .execute();

    // Function to generate a random technology id
    const randomTechnologyId = () => {
      const randomIndex = Math.floor(Math.random() * technology.length);
      return technology[randomIndex].id;
    };

    // Array to store all user technologies
    const userTechnologies = [];

    // For each user, assign 6 random technologies
    for (const userId of users) {
      // Generate a random number between 1 and 6, this number will be the number of technologies for each user
      const technologyCount =
        Math.floor(Math.random() * MAX_TECHNOLOGIES_PER_USER) + 1;

      for (let index = 0; index < technologyCount; index++) {
        userTechnologies.push({
          order: index + 1,
          user_id: userId.id,
          technology_id: randomTechnologyId(),
        });
      }
    }

    // Insert all user technologies
    await db.insertInto('technology_user').values(userTechnologies).execute();
  } catch (error) {
    throw new Error(
      `Impossible to insert users technologies: ${String(error)}`,
    );
  }
};
