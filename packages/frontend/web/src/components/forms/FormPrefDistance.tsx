import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import type { FormDistancePref } from '@app/shared';

import FormContainer from './FormContainer';

const distance = ['10', '4040'];

export default function FormPrefDistance() {
  const { register, setValue } = useFormContext<FormDistancePref>();

  const [data, setData] = useState<number>(10);

  return (
    <FormContainer title='Looking for company nearby...'>
      <span className='flex justify-start pb-8'>
        {'Select your preferred distance for matches'}
      </span>
      <div className='mb-3 flex flex-col gap-2'>
        <p className='text-placeholder'>{`${data} km`}</p>
        <input
          {...register('distance', {
            valueAsNumber: true,
          })}
          type='range'
          min={distance[0]}
          max={distance[1]} // Length max of France
          step='10'
          onChange={(event) => {
            setData(Number(event.target.value));
            setValue('distance', Number(event.target.value));
          }}
          className='accent-primary border-divider bg-light-medium caret-primary h-2 w-full cursor-pointer appearance-none rounded-full border'
        />
        <div className='flex justify-between'>
          {distance.map((value) => (
            <div
              key={value}
              className='bg-primary flex h-7  items-center justify-center rounded-lg px-4'
            >
              <p>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </FormContainer>
  );
}
