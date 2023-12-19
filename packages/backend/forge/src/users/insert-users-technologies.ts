import { db } from '@app/backend-shared';

const MAX_TECHNOLOGIES_PER_USER = 6;

export const insertUsersTechnologies = async () => {
  // Get all users id
  const usersId = await db
    .selectFrom('user')
    .select('id')
    .orderBy('id')
    .execute();

  // Get all technologies id
  const technologyId = await db
    .selectFrom('technology')
    .select('id')
    .orderBy('id')
    .execute();

  // Function to generate a random technology id
  const randomTechnologyId = () => {
    const randomIndex = Math.floor(Math.random() * technologyId.length);
    return technologyId[randomIndex].id;
  };

  // For each user, insert 6 random technologies
  for (const userId of usersId) {
    for (let index = 0; index < MAX_TECHNOLOGIES_PER_USER; index++) {
      await db
        .insertInto('technology_user')
        .values({
          order: index + 1,
          user_id: userId.id,
          technology_id: randomTechnologyId(),
        })
        .execute();
    }
  }
};
