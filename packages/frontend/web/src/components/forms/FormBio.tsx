import { useFormContext } from 'react-hook-form';
import { ZodError } from 'zod';

import { formBioShema } from '@app/shared';
import type { FormBioValidation } from '@app/shared';

import FormContainer from './FormContainer';

export default function FormBio() {
  const { register, formState } = useFormContext<FormBioValidation>();
  const { errors } = formState;

  return (
    <>
      <FormContainer title='ABOUT ME'>
        <label htmlFor='biography'>{'Biography'}</label>
        <textarea
          id='biography'
          placeholder='Describe who you are, what you like, what’s on your mind...'
          {...register('biography', {
            pattern: {
              value: /^\w*$/,
              message: 'ⓘ Special characters are not allowed',
            },
            validate: (value) => {
              try {
                formBioShema.shape.biography.parse(value);
                return true;
              } catch (error: unknown) {
                if (error instanceof ZodError) {
                  return error.errors[0]?.message;
                }
                return 'An error occurred';
              }
            },
          })}
          className='border-primary bg-light mt-2 h-40 w-full resize-none rounded-md border px-2 py-4 text-lg focus:outline-none sm:h-60 lg:text-xl'
        />
        {errors.biography ? (
          <p className='error-message'>{errors.biography.message}</p>
        ) : (
          ''
        )}
      </FormContainer>
      <div className='text-secondary mb-8 flex justify-end text-lg'>
        <button type='submit'>{'Skip >'}</button>
      </div>
    </>
  );
}
