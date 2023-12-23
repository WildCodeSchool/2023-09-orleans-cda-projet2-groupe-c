import Bun from 'bun';

import { db } from '@app/backend-shared';
import type { Gender, Role } from '@app/shared';

import adminsData from '../data/admins-data.json';
import usersData from '../data/users-data.json';

interface City {
  id: number;
}

export const insertUsers = async () => {
  try {
    // Get all cities id
    const citiesId: City[] = await db.selectFrom('city').select('id').execute();

    // Function to generate a random city id
    const randomCityId = (): number => {
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
          role: 'admin' as Role,
          password: hashedPassword,
          email_verified_at: new Date(),
          activation_code: '',
          activate_at: new Date(),
          city_id: randomCityId(),
        };
      }),
    );

    // Get a list of users with hashed passwords
    const users = await Promise.all(
      // Loop on each users
      usersData.map(async (user) => {
        // Get the password from the user
        const password = 'password';
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
          role: 'user' as Role,
          password: hashedPassword,
          email_verified_at: new Date(),
          activation_code: '',
          activate_at: new Date(),
          city_id: randomCityId(),
        };
      }),
    );

    // Insert to database the admins and users
    await db
      .insertInto('user')
      .values([...admins, ...users])
      .execute();
  } catch (error) {
    throw new Error(`Impossible to insert users: ${String(error)}`);
  }
};
