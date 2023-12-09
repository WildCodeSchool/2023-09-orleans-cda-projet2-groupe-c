import { useFormContext } from 'react-hook-form';

type DefaultValues = {
  biography: string;
};

export default function FormBio() {
  const { register } = useFormContext<DefaultValues>();

  return (
    <div className='font-base w-full flex-col items-center pt-40'>
      <h1 className='text-primary font-title mb-4 justify-start text-2xl lg:text-3xl'>
        {'ABOUT ME'}
      </h1>
      <div className='bg-light text-secondary mb-2 rounded-md px-7 pb-12 pt-5 text-sm shadow-md lg:text-base'>
        <span className='flex justify-start pb-8'>
          {'Your biography will be visible to everyone.'}
        </span>
        <label htmlFor='biography'>{'Biography'}</label>
        <textarea
          id='biography'
          placeholder='Describe who you are, what you like, what’s on your mind...'
          {...register('biography')}
          className='border-primary bg-light mt-2 h-40 w-full resize-none rounded-md border px-2 py-4 text-lg focus:outline-none sm:h-60 lg:text-xl'
        />
      </div>
      <div className='text-secondary flex justify-end'>
        <button type='submit'>{'Skip >'}</button>
      </div>
    </div>
  );
}
