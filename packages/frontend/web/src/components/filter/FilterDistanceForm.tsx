import { useEffect, useState } from 'react';
import type { UseFormRegister } from 'react-hook-form';

import type { RequestPreferencesBody } from '@app/shared';

import { usePreference } from '@/contexts/PreferenceContext';

const distance = ['10', '4040'];

export default function FilterDistanceForm({
  register,
}: {
  readonly register: UseFormRegister<RequestPreferencesBody>;
}) {
  // Get user preferences from preference context
  const { preferences } = usePreference();

  // State to store the distance value
  const [data, setData] = useState<number>(preferences?.distance ?? 10);

  // Update the distance value when the preferences change
  useEffect(() => {
    if (preferences && !Boolean(preferences.distance)) {
      setData(Number(preferences.distance));
    }
  }, [preferences]);

  return (
    <div className='mb-3 flex flex-col gap-2'>
      <p className='text-placeholder'>{`${data} km`}</p>
      <input
        {...register('distance', {
          valueAsNumber: true,
        })}
        type='range'
        min='10'
        max='4040' // Length max of France
        step='10'
        value={data}
        onChange={(event) => {
          setData(Number(event.target.value));
        }}
        className='accent-primary border-divider bg-light-medium caret-primary h-2 w-full cursor-pointer appearance-none rounded-full border'
      />
      <div className='flex justify-between'>
        {distance.map((value) => (
          <div
            key={value}
            className='bg-primary text-light flex h-7 w-[4rem] items-center justify-center rounded-lg text-xs'
          >
            <p>{`${value} km`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
