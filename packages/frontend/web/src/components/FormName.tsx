import { useFormContext } from 'react-hook-form';

export default function FormName() {
  const { register } = useFormContext();
  return (
    <div className='mt-32 flex items-center justify-center'>
      <label className='text-secondary'>{'First Name'}</label>
      <input
        type='text'
        placeholder='test'
        className='bg-dark-ulta-light flex flex-col'
        {...register('name')}
      />

      {/*  {errors.firstName ? (
          <span className='text-next'>{errors.firstName.message}</span>
        ) : undefined} */}
    </div>
  );
}
