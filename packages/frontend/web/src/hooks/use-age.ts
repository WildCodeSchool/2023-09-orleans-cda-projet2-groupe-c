import { useEffect, useState } from 'react';

export default function useAge({
  userBirthdate,
}: {
  userBirthdate: string | undefined;
}) {
  const [age, setAge] = useState<number>(0);

  // Calculate the age of the user
  useEffect(() => {
    if (Boolean(userBirthdate)) {
      const currentDate = new Date();
      const birthdate = new Date(String(userBirthdate));
      const userAge = currentDate.getFullYear() - birthdate.getFullYear();

      setAge(userAge);
    }
  }, [userBirthdate]);

  return age;
}
