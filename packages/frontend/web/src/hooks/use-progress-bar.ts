import { useEffect, useState } from 'react';

import type { UserBody } from '@app/shared';

const MAX_PERCENTAGE = 100;
const FIELD_LENGTH = 9;

export default function useProgressBar({ userData }: { userData?: UserBody }) {
  // State to store the percentage of the profile completed
  const [percentage, setPercentage] = useState<number>(0);

  // Check if the user data is complete and update the percentage
  useEffect(() => {
    let newPercentage = 0;
    const valuePerField = MAX_PERCENTAGE / FIELD_LENGTH;

    if (Boolean(userData?.name)) {
      newPercentage += valuePerField;
    }
    if (Boolean(userData?.biography)) {
      newPercentage += valuePerField;
    }
    if (Boolean(userData?.birthdate)) {
      newPercentage += valuePerField;
    }
    if (Boolean(userData?.gender)) {
      newPercentage += valuePerField;
    }
    if (Boolean(userData?.city)) {
      newPercentage += valuePerField;
    }
    if (userData && userData.hobbies.length > 0) {
      newPercentage += valuePerField;
    }
    if (userData && userData.languages.length > 0) {
      newPercentage += valuePerField;
    }
    if (userData && userData.technologies.length > 0) {
      newPercentage += valuePerField;
    }
    if (Boolean(userData?.account_github)) {
      newPercentage += valuePerField;
    }

    // Set the final percentage in the state
    setPercentage(Math.floor(newPercentage));
  }, [userData]);

  return { percentage };
}
