import { useFormContext } from 'react-hook-form';

import FormContainer from './FormContainer';

type DefaultValues = {
  biography: string;
};

export default function FormBio() {
  const { register } = useFormContext<DefaultValues>();

  return (
    <>
      <FormContainer title='ABOUT ME'>
        <label htmlFor='biography'>{'Biography'}</label>
        <textarea
          id='biography'
          placeholder='Describe who you are, what you like, what’s on your mind...'
          {...register('biography')}
          className='border-primary bg-light mt-2 h-40 w-full resize-none rounded-md border px-2 py-4 text-lg focus:outline-none sm:h-60 lg:text-xl'
        />
      </FormContainer>
      <div className='text-secondary mb-8 flex justify-end text-lg'>
        <button type='submit'>{'Skip >'}</button>
      </div>
    </>
  );
}
