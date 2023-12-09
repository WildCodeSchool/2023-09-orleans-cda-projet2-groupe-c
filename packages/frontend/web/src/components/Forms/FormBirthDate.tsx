import { useFormContext } from 'react-hook-form';

export default function FormBirthDate() {
  const { register } = useFormContext();

  return (
    <div className='font-base w-full flex-col items-center pt-40'>
      <h1 className='text-primary font-title mb-4 justify-start text-2xl lg:text-3xl'>
        {'MY BIRTHDAY'}
      </h1>
      <div className='bg-light text-secondary h-full rounded-md px-7 pb-12 pt-5 text-sm shadow-md lg:text-base'>
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
      </div>
    </div>
  );
}
