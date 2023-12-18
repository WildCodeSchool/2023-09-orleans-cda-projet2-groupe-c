import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { authSchema } from '@app/types';
import type { AuthWithRoleAndActivationCode } from '@app/types';

import Button from '../Button';

const API_URL = import.meta.env.VITE_API_URL;

export default function RegistrationForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } =
    useForm<AuthWithRoleAndActivationCode>({
      resolver: zodResolver(authSchema),
    });
  const { isValid, errors } = formState;

  // onSubmit function to handle form submission
  const onSubmit: SubmitHandler<AuthWithRoleAndActivationCode> = async (
    data,
  ) => {
    try {
      // Send a POST request to the API to register the user
      await fetch(`${API_URL}/auth/registration`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
    } catch (error) {
      throw new Error(`Failed to register : ${String(error)}`); // Throw an error if the request fails
    }
    if (isValid) {
      navigate('/registration/success'); // Navigate to the success page if the form is valid with useNavigate
    }
  };

  return (
    <div className='p-8'>
      <h1 className='font-title text-primary mb-5 mt-24 text-xl'>
        {'Validate my account'}
      </h1>
      <div className='bg-light-light flex h-[18rem] flex-col items-center gap-2 rounded-lg px-2 shadow-md'>
        <div className='text-start'>
          <p className='text-dark-light my-2 mb-4 align-top text-xs'>
            {'Please enter your credentials to continue.'}
          </p>
        </div>
        <div className='flex flex-col items-center'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col justify-center gap-3'
          >
            <label
              htmlFor='email'
              className='text-secondary dark:text-light-light -mb-2 text-sm'
            >
              {'Email'}
              <span className='text-next'>{'*'}</span>
            </label>
            <input
              type='email'
              id='email'
              className='border-primary bg-light-light text-dark-light/70 focus:outline-secondary w-100 rounded-lg border p-2 text-center transition-all focus:outline'
              {...register('email')}
            />
            {errors.email && errors.email.message !== undefined ? (
              <p className='text-next flex text-xs'>{errors.email.message}</p>
            ) : undefined}
            <label
              htmlFor='password'
              className='text-secondary dark:text-light-light -mb-2 mt-2 text-sm'
            >
              {'Password'}
              <span className='text-next'>{'*'}</span>
            </label>
            <input
              type='password'
              id='password'
              className='border-primary bg-light-light text-dark-light/70 focus:outline-secondary w-100 rounded-lg border p-2 text-center transition-all focus:outline'
              {...register('password')}
            />
            {errors.password && errors.password.message !== undefined ? (
              <p className='text-next flex text-xs'>
                {errors.password.message}
              </p>
            ) : undefined}
            <div className='mt-[20rem] flex flex-col'>
              <Button type='submit' isOutline={false}>
                {'Validate'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
