import { useFormContext } from 'react-hook-form';

export default function FormTest() {
  const { register } = useFormContext();
  return (
    <div>
      <label htmlFor='email' className='text-secondary'>
        {'Email'}
      </label>
      <input
        type='email'
        id='email'
        className='bg-dark-ulta-light flex flex-col'
        {...register('email')}
      />
      <label htmlFor='password' className='text-secondary'>
        {'Password'}
      </label>
      <input
        type='password'
        id='password'
        className='bg-dark-ulta-light flex flex-col'
        {...register('password')}
      />
      {/*  {errors.firstName ? (
          <span className='text-next'>{errors.firstName.message}</span>
        ) : undefined} */}
    </div>
  );
}
