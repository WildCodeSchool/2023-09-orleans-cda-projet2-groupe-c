// While waiting for the PR register
import { useFormContext } from 'react-hook-form';

type FormValues = {
  email: string;
  password: string;
};

export default function FormTest() {
  const { register, formState } = useFormContext<FormValues>();
  const { errors } = formState;
  return (
    <div className='m-auto w-[500px] flex-col items-center'>
      <h1 className='text-primary font-title mb-4 mt-40 justify-start text-2xl'>
        {'MY NAME IS...'}
      </h1>
      <div className='bg-light h-64 rounded-md p-8 py-14 shadow-md'>
        <label htmlFor='email' className='text-secondary'>
          {'Email'}
        </label>
        <input
          type='email'
          id='email'
          className='bg-dark-ulta-light flex flex-col'
          {...register('email', {
            pattern: {
              value:
                /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z-]+(?:\.[\dA-Za-z-]+)*$/,
              message: 'Invalid Email.',
            },
            required: {
              value: true,
              message: 'nop',
            },
          })}
        />
        <p>{errors.email?.message}</p>
        <label htmlFor='password' className='text-secondary'>
          {'Password'}
        </label>
        <input
          type='password'
          id='password'
          className='bg-dark-ulta-light flex flex-col'
          {...register('password')}
        />
      </div>
    </div>
  );
}
