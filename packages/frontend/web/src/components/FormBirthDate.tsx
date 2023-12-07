import { useFormContext } from 'react-hook-form';

export default function FormBirthDate() {
  const { register } = useFormContext();

  return (
    <div className='mt-32 flex items-center justify-center'>
      <form className='bg-light-light text-light-hard flex w-56 flex-col gap-2'>
        <label htmlFor='birthdate' className='text-secondary'>
          {'Birthdate'}
        </label>
        <input
          type='date'
          id='birthdate'
          className='bg-dark-ulta-light flex flex-col'
          {...register('birthdate', { required: 'Email is required' })}
        />
        {/*    {errors.birthdate ? (
          <span className='text-next'>{errors.birthdate.message}</span>
        ) : undefined} */}
        <button className='bg-primary rounded-md' type='submit'>
          {'Next'}
        </button>
        <button
          className='border-primary text-primary rounded-md border-2'
          type='button'
        >
          {'Back'}
        </button>
      </form>
    </div>
  );
}
