import { useFormContext } from 'react-hook-form';
import { ZodError } from 'zod';

import type { FormGitValidation } from '@app/shared';
import { formGitShema } from '@app/shared';

import FormContainer from './FormContainer';

export default function FormGitHub() {
  const { register, formState } = useFormContext<FormGitValidation>();
  const { errors } = formState;

  return (
    <>
      <FormContainer title='MY GITHUB'>
        <span className='flex justify-start pb-8'>
          {'Add your Github link to share your projects'}
        </span>
        <label htmlFor='account_github'>{'URL’s GitHub'}</label>
        <input
          type='url'
          id='account_github'
          pattern='http//*'
          placeholder='Your GitHub'
          {...register('account_github', {
            validate: (value) => {
              try {
                formGitShema.shape.account_github.parse(value);
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
        {errors.account_github ? (
          <p className='error-message'>{errors.account_github.message}</p>
        ) : (
          ''
        )}
      </FormContainer>
      <div className='text-secondary mb-16 flex justify-end text-lg'>
        <button type='submit'>{'Skip >'}</button>
      </div>
    </>
  );
}
