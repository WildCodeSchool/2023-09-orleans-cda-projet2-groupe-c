import { useFormContext } from 'react-hook-form';

import {
  type FormBirthdateBody,
  daySchema,
  monthSchema,
  yearSchema,
} from '@app/shared';

import FormContainer from './FormContainer';

type BirthdateKey = 'day' | 'month' | 'year';

// Array of objects to map through the inputs
const inputsBirthdate = [
  {
    register: 'year',
    placeholder: 'YYYY',
    maxLength: 4,
    schema: yearSchema,
  },
  {
    register: 'month',
    placeholder: 'MM',
    maxLength: 2,
    schema: monthSchema,
  },
  {
    register: 'day',
    placeholder: 'DD',
    maxLength: 2,
    schema: daySchema,
  },
];

export default function FormBirthDate() {
  const { register, formState } = useFormContext<FormBirthdateBody>();

  const { errors } = formState;

  return (
    <FormContainer title='I was born...'>
      <span className='flex justify-start pb-8'>
        {'You must be of legal age to register.'}
      </span>

      {/* Input year, month and day */}
      <div className='mx-auto flex max-w-[300px] gap-2'>
        {inputsBirthdate.map((input) => (
          <div key={input.register} className='h-full w-full'>
            <label htmlFor={input.register}>
              {input.register.charAt(0).toUpperCase() + input.register.slice(1)}
              <span className='text-primary'>{`*`}</span>
            </label>

            <input
              type='text'
              id={input.register}
              placeholder={input.placeholder}
              maxLength={input.maxLength}
              {...register(input.register as BirthdateKey, {
                valueAsNumber: true,
                validate: (value) => {
                  const result = input.schema.safeParse(value);
                  if (!result.success) {
                    return result.error.errors[0].message;
                  }
                  return true;
                },
              })}
              className='border-primary bg-light mt-1 w-full rounded-lg border py-3 text-center text-lg uppercase focus:outline-none lg:text-xl'
            />
          </div>
        ))}
      </div>

      {/* Errors messages */}
      {errors.year ? (
        <p className='text-primary mt-2'>{errors.year.message}</p>
      ) : undefined}
      {errors.month ? (
        <p className='text-primary mt-2'>{errors.month.message}</p>
      ) : undefined}
      {errors.day ? (
        <p className='text-primary mt-2'>{errors.day.message}</p>
      ) : undefined}
    </FormContainer>
  );
}
