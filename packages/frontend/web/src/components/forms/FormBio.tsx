import { useFormContext } from 'react-hook-form';

import { type FormBioValidation, formBioSchema } from '@app/shared';

import FormContainer from './FormContainer';

export default function FormBio() {
  const { register, formState } = useFormContext<FormBioValidation>();
  const { errors } = formState;

  return (
    <FormContainer title='ABOUT ME...'>
      <label htmlFor='biography'>
        {'Biography'}
        <span className='text-placeholder text-sm'>{` (optionnal)`}</span>
      </label>
      <textarea
        id='biography'
        placeholder='Describe who you are, what you like, what’s on your mind...'
        {...register('biography', {
          validate: (value) => {
            const result = formBioSchema.shape.biography.safeParse(value);
            if (!result.success) {
              return result.error.errors[0].message;
            }
            return true;
          },
        })}
        className='border-primary bg-light mt-2 h-[30vh] w-full resize-none rounded-md border px-3 py-2 text-lg focus:outline-none lg:text-xl'
      />
      {errors.biography ? (
        <p className='text-primary mt-2'>{errors.biography.message}</p>
      ) : (
        ''
      )}
    </FormContainer>
  );
}
