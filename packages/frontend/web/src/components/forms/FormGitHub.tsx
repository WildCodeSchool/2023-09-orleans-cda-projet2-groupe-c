import { useFormContext } from 'react-hook-form';

import { type FormGitValidation, formGitSchema } from '@app/shared';

import FormContainer from './FormContainer';

export default function FormGitHub() {
  const { register, formState } = useFormContext<FormGitValidation>();
  const { errors } = formState;

  return (
    <FormContainer title='MY GITHUB'>
      <span className='flex justify-start pb-8'>
        {'Add your Github link to share your projects'}
      </span>
      <label htmlFor='account_github'>
        {'URL’s GitHub'}
        <span className='text-placeholder text-sm'>{` (optionnal)`}</span>
      </label>
      <input
        type='url'
        id='account_github'
        placeholder='http://your-github.com'
        {...register('accountGithub', {
          validate: (value) => {
            const result = formGitSchema.shape.accountGithub.safeParse(value);
            return result.success || result.error.errors[0]?.message;
          },
        })}
        className='border-primary bg-light mt-2 h-5 w-full rounded-md border px-2 py-6 text-lg focus:outline-none lg:text-xl'
      />
      {errors.accountGithub ? (
        <p className='text-primary mt-2'>{errors.accountGithub.message}</p>
      ) : (
        ''
      )}
    </FormContainer>
  );
}
