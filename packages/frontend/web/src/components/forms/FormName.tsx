import { useFormContext } from 'react-hook-form';

import { type FormNameValidation, formNameSchema } from '@app/shared';

import FormContainer from './FormContainer';

export default function FormName() {
  const { register, formState } = useFormContext<FormNameValidation>();
  const { errors } = formState;

  return (
    <FormContainer title='MY NAME IS...'>
      <span className='flex justify-start pb-8'>
        {'The maximum allowed number of character is 100.'}
      </span>

      <label htmlFor='name'>
        {'Username'}
        <span className='text-primary'>{'*'}</span>
      </label>

      <input
        type='text'
        id='name'
        placeholder='Write your name...'
        {...register('name', {
          validate: (value) => {
            const result = formNameSchema.shape.name.safeParse(value);
            return result.success ? true : result.error.errors[0]?.message;
          },
        })}
        className='border-primary bg-light mt-2 w-full rounded-md border px-2 py-3 text-lg focus:outline-none lg:text-xl'
      />
      {errors.name ? (
        <p className='text-primary mt-2'>{errors.name.message}</p>
      ) : undefined}
    </FormContainer>
  );
}
