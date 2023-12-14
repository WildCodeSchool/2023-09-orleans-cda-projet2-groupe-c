import { db } from '@app/backend-shared';
import type { Gender, Role } from '@app/types';

import adminsData from '../data/adminsData.json';
import usersData from '../data/usersData.json';

export const insertUsers = async () => {
  // Get all cities id
  const citiesId = await db.selectFrom('city').select('id').execute();

  // Function to generate a random city id
  const randomCityId = () => {
    const randomIndex = Math.floor(Math.random() * citiesId.length);
    return citiesId[randomIndex].id;
  };

  // Get a list of admins with hashed passwords
  const admins = await Promise.all(
    // Loop on each admins
    adminsData.map(async (admin) => {
      // Get the password from the admin
      const password = admin.password;
      // Hash the password with bcrypt
      const hashedPassword = await Bun.password.hash(password, {
        algorithm: 'bcrypt',
        cost: 10,
      });

      // Return the admin with the hashed password and the other fields
      return {
        ...admin,
        birthdate: new Date(admin.birthdate),
        gender: admin.gender as Gender,
        role: admin.role as Role,
        password: hashedPassword,
        email_verified_at: new Date(),
        activate_at: new Date(),
        city_id: BigInt(randomCityId()),
      };
    }),
  );

  // Get a list of users with hashed passwords
  const users = await Promise.all(
    // Loop on each users
    usersData.map(async (user) => {
      // Get the password from the user
      const password = user.password;
      // Hash the password with bcrypt
      const hashedPassword = await Bun.password.hash(password, {
        algorithm: 'bcrypt',
        cost: 10,
      });

      // Return the user with the hashed password and the other fields
      return {
        ...user,
        birthdate: new Date(user.birthdate),
        gender: user.gender as Gender,
        role: user.role as Role,
        password: hashedPassword,
        email_verified_at: new Date(),
        activate_at: new Date(),
        city_id: BigInt(randomCityId()),
      };
    }),
  );

  // Insert to database the admins and users
  await db
    .insertInto('user')
    .values([...admins, ...users])
    .execute();
};
