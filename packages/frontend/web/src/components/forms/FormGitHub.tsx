import { useFormContext } from 'react-hook-form';

import FormContainer from './FormContainer';

type DefaultValues = {
  account_github: string;
};

export default function FormGitHub() {
  const { register } = useFormContext<DefaultValues>();

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
          pattern='https://.*'
          placeholder='Your GitHub'
          {...register('account_github')}
          className='border-primary bg-light mt-2 h-5 w-full rounded-md border px-2 py-6 text-lg focus:outline-none lg:text-xl'
        />
      </FormContainer>
      <div className='text-secondary mb-16 flex justify-end text-lg'>
        <button type='submit'>{'Skip >'}</button>
      </div>
    </>
  );
}
