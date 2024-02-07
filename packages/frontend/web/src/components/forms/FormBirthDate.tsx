import { useFormContext } from 'react-hook-form';

import { type FormBirthDateValidation, formBirthDateSchema } from '@app/shared';

import FormContainer from './FormContainer';

export default function FormBirthDate() {
  const { register, formState } = useFormContext<FormBirthDateValidation>();

  const { errors } = formState;
  return (
    <FormContainer title='MY BIRTHDAY'>
      <span className='flex justify-start pb-8'>
        {'You must be of legal age to register.'}
      </span>
      <input
        type='date'
        id='birthdate'
        placeholder='YYYY-MM-DD'
        {...register('birthdate', {
          validate: (value) => {
            const date = new Date(value);
            if (Number.isNaN(date.getTime())) {
              return 'ⓘ Please enter your birthday date.';
            }
            const result = formBirthDateSchema.shape.birthdate.safeParse(date);
            return result.success ? true : result.error.errors[0]?.message;
          },
        })}
        className='border-primary bg-light mt-5 h-5 w-full rounded-md border px-2 py-6 text-xl focus:outline-none'
      />

      {errors.birthdate ? (
        <p className='text-primary mt-2'>{errors.birthdate.message}</p>
      ) : (
        ''
      )}
    </FormContainer>
  );
}
