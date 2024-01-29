import { useState } from 'react';
import type { UseFormRegister, UseFormWatch } from 'react-hook-form';

import type { RequestPreferencesBody } from '@app/shared';

import { usePreference } from '@/contexts/PreferenceContext';

import ArrowIcon from '../icons/ArrowIcon';

const genders = [
  {
    id: 1,
    value: 'man',
  },
  {
    id: 2,
    value: 'woman',
  },
  {
    id: 3,
    value: 'non-binary',
  },
];

export default function FilterGenderForm({
  register,
  watch,
}: {
  readonly register: UseFormRegister<RequestPreferencesBody>;
  readonly watch: UseFormWatch<RequestPreferencesBody>;
}) {
  // State to display the gender inputs
  const [isToggleGenderInputs, setIsToggleGenderInputs] =
    useState<boolean>(false);

  // Get user preferences from preference context
  const { preferences } = usePreference();

  // Watch the value from the input gender_pref
  // Used to add class into the label
  const watchGenderPref = watch('gender_pref');

  // Function to display the gender inputs on click
  const handleGenderClick = () => {
    setIsToggleGenderInputs(!isToggleGenderInputs);
  };

  return (
    <>
      <div
        onClick={handleGenderClick}
        className='flex items-center justify-between'
      >
        {/* Display the gender selected with the first letter to uppercase */}
        <p className='text-placeholder'>
          {(preferences?.gender_pref ?? '').charAt(0).toUpperCase() +
            (preferences?.gender_pref ?? '').slice(1)}
        </p>

        <div
          className={`${
            isToggleGenderInputs && 'rotate-0'
          } -rotate-90 duration-200 ease-in-out`}
        >
          <ArrowIcon />
        </div>
      </div>

      {isToggleGenderInputs ? (
        <div className='mb-2 mt-4 flex flex-col gap-2'>
          {/* Loop to display all gender */}
          {genders.map((gender) => (
            <div key={gender.id} className='w-full'>
              <label
                htmlFor={String(gender.id)}
                className={`border-primary hover:bg-primary hover:text-light block w-full rounded-md border py-3 text-center text-lg ${
                  // Check if gender.value is selected
                  // If is true, add a bg-primary and text-light class
                  watchGenderPref === gender.value ||
                  // Or
                  // Check if no gender is selected
                  // Then, check if gender_pref is equal to gender.value
                  // Add a bg-primary and text-light class, else, remove the class
                  (!Boolean(watchGenderPref) &&
                    preferences?.gender_pref === gender.value)
                    ? 'bg-primary text-light'
                    : 'text-secondary'
                }`}
              >
                {/* Display the gender with the first letter to uppercase */}
                {gender.value.charAt(0).toUpperCase() + gender.value.slice(1)}
              </label>
              <input
                {...register('gender_pref', {
                  required: false,
                })}
                type='radio'
                id={String(gender.id)}
                name='gender_pref'
                value={gender.value}
                hidden
              />
            </div>
          ))}
        </div>
      ) : undefined}
    </>
  );
}
