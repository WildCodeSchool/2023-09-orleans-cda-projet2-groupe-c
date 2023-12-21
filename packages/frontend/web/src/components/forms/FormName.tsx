import { useFormContext } from 'react-hook-form';
import { ZodError } from 'zod';

import type { FormNameValidation } from '@app/shared';
import { formName } from '@app/shared';

import FormContainer from './FormContainer';

export default function FormName() {
  const { register, formState } = useFormContext<FormNameValidation>();
  const { errors } = formState;

  return (
    <FormContainer title='MY NAME IS...'>
      <span className='flex justify-start pb-8'>
        {'The maximum allowed number of character is 100.'}
      </span>
      <label htmlFor='name'>{'Username *'}</label>
      <input
        type='text'
        id='name'
        placeholder='name'
        {...register('name', {
          pattern: {
            value: /^\w*$/,
            message: 'ⓘ Special characters are not allowed',
          },
          validate: (value) => {
            try {
              formName.shape.name.parse(value);
              return true;
            } catch (error: unknown) {
              if (error instanceof ZodError) {
                return error.errors[0]?.message;
              }
              return 'An error occurred';
            }
          },
        })}
        className='border-primary bg-light mt-2 h-5 w-full rounded-md border px-2 py-6 text-lg focus:outline-none lg:text-xl'
      />
      {errors.name ? (
        <p className='error-message'>{errors.name.message}</p>
      ) : (
        ''
      )}
    </FormContainer>
  );
}
