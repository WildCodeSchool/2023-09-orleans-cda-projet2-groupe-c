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

    // Array to store all user technologies
    const userTechnologies = [];

    // For each user, assign 1 to 6 random technologies
    for (const user of users) {
      // Create a new set to avoid duplicate technologies
      const technologiesId = new Set();

      // Generate a random number between 1 and 6, this number will be the number of technologies for each user
      const randomTechnologyCount =
        Math.floor(Math.random() * MAX_TECHNOLOGIES_PER_USER) + 1;

      // Loop to generate a random index for each technologies par user and add to the set "techoologiesId"
      while (technologiesId.size < randomTechnologyCount) {
        // Generate a random index between 0 and the length of the technologies array
        const randomIndex = Math.floor(Math.random() * technology.length);

        // Add the technology id to the set
        technologiesId.add(technology[randomIndex].id);
      }

      let order = 1;

      // For each technologies in the set, push an object with order, user_id and technology_id fields to the array "userTechnologies"
      for (const technologyId of technologiesId) {
        userTechnologies.push({
          order: order++,
          user_id: user.id,
          technology_id: technologyId as number,
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
