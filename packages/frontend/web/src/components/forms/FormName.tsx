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
      <label htmlFor='name'>{'Username'}</label>
      <input
        type='text'
        id='name'
        placeholder='name'
        {...register('name', {
          validate: (value) => {
            const result = formNameSchema.shape.name.safeParse(value);
            return result.success ? true : result.error.errors[0]?.message;
          },
        })}
        className='border-primary bg-light mt-2 h-5 w-full rounded-md border px-2 py-6 text-lg focus:outline-none lg:text-xl'
      />
      {errors.name ? (
        <p className='text-secondary absolute bottom-3'>
          {errors.name.message}
        </p>
      ) : (
        ''
      )}
    </FormContainer>
  );
}
