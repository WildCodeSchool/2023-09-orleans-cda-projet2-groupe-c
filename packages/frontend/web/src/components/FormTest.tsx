import { useFormContext } from 'react-hook-form';

type FormValues = {
  email: string;
  password: string;
};

export default function FormTest() {
  const { register, formState } = useFormContext<FormValues>();
  const { errors } = formState;
  return (
    <div>
      <label htmlFor='email' className='text-secondary'>
        {'Email'}
      </label>
      <input
        type='email'
        id='email'
        className='bg-dark-ulta-light flex flex-col'
        {...register('email', {
          pattern: {
            value: /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z-]+(?:\.[\dA-Za-z-]+)*$/,
            message: 'Pas top l email non ? ',
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
      {/*  {errors.firstName ? (
          <span className='text-next'>{errors.firstName.message}</span>
        ) : undefined} */}
    </div>
  );
}
