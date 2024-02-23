/* eslint-disable unicorn/no-nested-ternary */
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import ReactSlider from 'react-slider';

import { type FormAgeBody, maxAgeSchema, minAgeSchema } from '@app/shared';

import FormContainer from './FormContainer';

export function FormAge() {
  // Store to store the min age, default value is 18
  const [minAge, setMinAge] = useState(18);

  // Store to store the max age, default value is 100
  const [maxAge, setMaxAge] = useState(100);

  const { setValue, register } = useFormContext<FormAgeBody>();

  // Validation for the min age
  register('minAge', {
    valueAsNumber: true,
    validate: (value) => {
      const result = minAgeSchema.safeParse(value);
      if (!result.success) {
        return result.error.errors[0].message;
      }
      return true;
    },
  });

  // Validation for the max age
  register('maxAge', {
    valueAsNumber: true,
    validate: (value) => {
      const result = maxAgeSchema.safeParse(value);
      if (!result.success) {
        return result.error.errors[0].message;
      }
      return true;
    },
  });

  // Set the min and max age to the form
  useEffect(() => {
    setValue('minAge', minAge);
    setValue('maxAge', maxAge);
  }, [minAge, maxAge, setValue]);

  return (
    <FormContainer title='Age pref'>
      <span className=''>{'Choose the minimum and maximum age.'}</span>

      <div className='mt-12 flex w-full flex-col justify-between gap-2'>
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
            setValue('minAge', value[0]);
            setValue('maxAge', value[1]);
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
          renderMark={(props: React.HTMLProps<HTMLSpanElement>) => {
            const isBetween =
              Number(props.key) >= minAge && Number(props.key) <= maxAge;

            return (
              <span {...props}>
                <div
                  className={`h-1 w-1 translate-x-[150%] translate-y-[2px] rounded-full bg-white ${
                    isBetween
                      ? 'outline-primary outline outline-2 outline-offset-2'
                      : 'outline-divider outline outline-1'
                  }`}
                />
                <div
                  className={`mt-[.6rem] flex translate-x-[-10%] items-center justify-center rounded-md px-1 ${
                    isBetween
                      ? 'bg-primary text-white'
                      : 'text-secondary bg-transparent'
                  }`}
                >
                  <p className='translate-y-[1px] text-center text-[9px]'>
                    {String(props.key)}
                  </p>
                </div>
              </span>
            );
          }}
        />
      </div>
    </FormContainer>
  );
}
