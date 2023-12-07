import { useFormContext } from 'react-hook-form';

export default function FormName() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className='flex flex-col'>
      <label className='text-secondary'>{'First Name'}</label>
      <input
        type='text'
        placeholder='test'
        className='bg-dark-ulta-light flex flex-col'
        {...register('name')}
      />

      {/*   {errors.firstName ? (
        <span className='text-next'>{errors.firstName.message}</span>
      ) : undefined} */}
    </div>
  );
}
