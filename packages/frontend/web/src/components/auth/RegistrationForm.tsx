import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import type { RegisterBody } from '@app/shared';
import { registrationSchema } from '@app/shared';

import { useAuth } from '@/contexts/AuthContext';

import Button from '../Button';
import FormLayout from '../FormLayout';
import FormContainer from '../forms/FormContainer';

const API_URL = import.meta.env.VITE_API_URL;

export default function RegistrationForm() {
  const [errorRegistration, setErrorRegistration] = useState<string>();
  const { setIsLoggedIn } = useAuth();

  // Get the navigate function from the router
  const navigate = useNavigate();

  // Destructure the useForm hook
  // Use zodResolver to validate the form
  const { register, handleSubmit, formState } = useForm<RegisterBody>({
    resolver: zodResolver(registrationSchema),
  });

  // Destructure the formState object
  const { isValid, errors } = formState;

  // onSubmit function to handle form submission
  const onSubmit: SubmitHandler<RegisterBody> = async (data) => {
    try {
      if (isValid) {
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

        setIsLoggedIn(true);

        // Navigate to the success page if the form is valid with useNavigate
        navigate('/registration/success');
      }
    } catch {
      setErrorRegistration(
        'ⓘ An error occurred during registration. Try again!',
      );
    }
  };

  return (
    <FormLayout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex h-full flex-col items-center justify-between py-[15%]'
      >
        <FormContainer title='Create a new account'>
          <p className='pb-8'>
            {'Your email and password are required to create an account.'}
          </p>

          <div className='flex h-full w-full flex-col justify-between gap-6'>
            {/* Email input */}
            <div className='flex flex-col gap-1'>
              <label htmlFor='email' className='text-secondary text-sm'>
                {'Email'}
                <span className='text-primary'>{'*'}</span>
              </label>
              <input
                type='text'
                id='email'
                placeholder='your-email@example.fr'
                className='border-primary bg-light h-5 w-full rounded-md border px-2 py-6 text-lg focus:outline-none lg:text-xl'
                {...register('email')}
              />

              {errors.email && errors.email.message !== undefined ? (
                <p className='text-primary text-xs'>{errors.email.message}</p>
              ) : undefined}
            </div>

            {/* Password input */}
            <div className='flex flex-col gap-1'>
              <label htmlFor='password' className='text-secondary mt-2 text-sm'>
                {'Password'}
                <span className='text-primary'>{'*'}</span>
              </label>
              <input
                type='password'
                id='password'
                placeholder='Write your password...'
                className='border-primary bg-light h-5 w-full rounded-md border px-2 py-6 text-lg focus:outline-none lg:text-xl'
                {...register('password')}
              />
              <p className='text-placeholder text-sm'>{`minimum 8 characters`}</p>
            </div>
          </div>

          {errors.password && errors.password.message !== undefined ? (
            <p className='text-primary text-xs'>{errors.password.message}</p>
          ) : undefined}

          {Boolean(errorRegistration) && (
            <p className='text-primary text-xs'>{errorRegistration}</p>
          )}
        </FormContainer>

        <Button type='submit' isOutline={false}>
          {'Validate'}
        </Button>
      </form>
    </FormLayout>
  );
}
