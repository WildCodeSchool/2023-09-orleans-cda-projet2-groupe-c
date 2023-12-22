import { useFormContext } from 'react-hook-form';
import { ZodError } from 'zod';

import type { FormBirthDateValidation } from '@app/shared';
import { formBirthDate } from '@app/shared';

import FormContainer from './FormContainer';

export default function FormBirthDate() {
  const { register, formState } = useFormContext<FormBirthDateValidation>();

  const { errors } = formState;
  return (
    <FormContainer title='MY BIRTHDAY'>
      <span className=' flex justify-start'>
        {'Your age will be visible to everyone.'}
      </span>
      <span className=' flex justify-start pb-8'>
        {'You must be of legal age to register.'}
      </span>
      <label className='' htmlFor='birthdate'>
        {'Username *'}
      </label>
      <input
        type='date'
        id='birthdate'
        {...register('birthdate', {
          validate: (value) => {
            if ((value as unknown as string) === '') {
              return 'ⓘ Birthdate is required.';
            }
            try {
              formBirthDate.shape.birthdate.parse(new Date(value)); // convert the string to a Date
              return true;
            } catch (error: unknown) {
              if (error instanceof ZodError) {
                return error.errors[0]?.message;
              }
              return 'An error occurred';
            }
          },
        })}
        className='border-primary bg-light mt-2 h-5 w-full rounded-md border px-2 py-6 text-xl focus:outline-none'
      />
      {errors.birthdate ? (
        <p className='error-message'>{errors.birthdate.message}</p>
      ) : (
        ''
      )}
    </FormContainer>
  );
}
