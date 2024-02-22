import type { Users } from '@/services/users';

export const filteredByAge = ({
  users,
  minAge,
  maxAge,
}: {
  users: Users;
  minAge: number;
  maxAge: number;
}) => {
  try {
    // Get the current year
    const currentYear = new Date().getFullYear();

    return users.filter((user) => {
      // Check if the user has a birthdate
      if (!user.birthdate) {
        return false;
      }

      // Get the year from the user birthdate
      const year = new Date(user.birthdate).getFullYear();

      // Calculate the user age
      const userAge = currentYear - year;

      // Return the users list between the min and max age
      return userAge >= minAge && userAge <= maxAge;
    });
  } catch {
    throw new Error('An error occurred while filtering users by age.');
  }
};
