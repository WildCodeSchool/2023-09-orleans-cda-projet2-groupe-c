import { useFormContext } from 'react-hook-form';

type DefaultValues = {
  accountGithub: string;
};

export default function FormGitHub() {
  const { register } = useFormContext<DefaultValues>();

  return (
    <div className='font-base w-full flex-col items-center pt-40'>
      <h1 className='text-primary font-title mb-4 justify-start text-2xl lg:text-3xl'>
        {'MY GITHUB'}
      </h1>
      <div className='bg-light text-secondary mb-2 rounded-md px-7 pb-12 pt-5 text-sm shadow-md lg:text-base'>
        <span className='flex justify-start pb-8'>
          {'Add your Github link to share your projects'}
        </span>
        <label htmlFor='account_github'>{'URL’s GitHub'}</label>
        <input
          type='url'
          id='account_github'
          pattern='https://.*'
          placeholder='Your GitHub'
          {...register('accountGithub')}
          className='border-primary bg-light mt-2 h-5 w-full rounded-md border px-2 py-6 text-lg focus:outline-none lg:text-xl'
        />
      </div>
      <div className='text-secondary flex justify-end'>
        <button type='submit'>{'Skip >'}</button>
      </div>
    </div>
  );
}
