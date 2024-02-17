/* eslint-disable react/prop-types */

/* eslint-disable unicorn/no-nested-ternary */
import { useState } from 'react';
import type { UseFormSetValue } from 'react-hook-form';
import ReactSlider from 'react-slider';

import type { RequestPreferencesBody } from '@app/shared';

import { usePreference } from '@/contexts/PreferenceContext';

export function FilterAgeForm({
  setValue,
}: {
  readonly setValue: UseFormSetValue<RequestPreferencesBody>;
}) {
  // Get user preferences from preference context
  const { preferences } = usePreference();

  // Store to store the min age
  const [minAge, setMinAge] = useState(preferences?.min_age ?? 18);

  // Store to store the max age
  const [maxAge, setMaxAge] = useState(preferences?.max_age ?? 100);

  return (
    <div className='flex w-full flex-col justify-between gap-2'>
      <div className='text-secondary mb-2 flex justify-between'>
        <div className='flex gap-2'>
          <p>{`min`}</p>
          <p className='text-placeholder border-divider w-10 rounded-md border text-center'>
            {minAge}
          </p>
        </div>
        <div className='flex gap-2'>
          <p>{`max`}</p>
          <p className='text-placeholder border-divider w-10 rounded-md border text-center'>
            {maxAge}
          </p>
        </div>
      </div>

      {/* Use React Slider to create a double range slider */}
      <ReactSlider
        className='pb-10'
        marks={[20, 30, 40, 50, 60, 70, 80, 90, 100]}
        value={[minAge, maxAge]}
        min={18}
        max={100}
        step={1}
        defaultValue={[18, 100]}
        onChange={(value) => {
          setMinAge(value[0]);
          setMaxAge(value[1]);
          setValue('min_age', value[0]);
          setValue('max_age', value[1]);
        }}
        ariaLabel={['Lower thumb', 'Upper thumb']}
        // Custom thumb
        renderThumb={(props) => (
          <div
            {...props}
            className='bg-primary border-light h-4 w-4 -translate-y-1 cursor-pointer rounded-full border-2 outline-0'
          />
        )}
        // Custom track
        renderTrack={(props, state) => (
          <div
            {...props}
            className={`${
              state.index === 2
                ? 'bg-light-medium border-divider border'
                : state.index === 1
                  ? 'bg-primary'
                  : 'bg-light-medium border-divider border'
            } h-2 rounded-full`}
          />
        )}
        // Custom mark
        renderMark={(props) => {
          const isBetween =
            Number(props.key) >= minAge && Number(props.key) <= maxAge;

          return (
            <div {...props}>
              <div
                className={`h-1 w-1 translate-x-[150%] translate-y-[2px] rounded-full bg-white ${
                  isBetween
                    ? 'outline-primary outline outline-2 outline-offset-2'
                    : 'outline-divider outline outline-1'
                }`}
              />
              <div
                className={`text-light mt-[.6rem] flex translate-x-[-10%] items-center justify-center rounded-md px-1 ${
                  isBetween ? 'bg-primary' : 'bg-transparent'
                }`}
              >
                <p
                  className={`translate-y-[1px] text-center text-[9px] text-white`}
                >
                  {String(props.key)}
                </p>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
