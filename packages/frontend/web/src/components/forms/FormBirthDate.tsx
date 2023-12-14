import { useFormContext } from 'react-hook-form';

import FormContainer from './FormContainer';

export default function FormBirthDate() {
  const { register } = useFormContext();

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
          required: {
            value: true,
            message: 'le nom pelo',
          },
        })}
        className='border-primary bg-light mt-2 h-5 w-full rounded-md border px-2 py-6 text-xl focus:outline-none'
      />
    </FormContainer>
  );
}
