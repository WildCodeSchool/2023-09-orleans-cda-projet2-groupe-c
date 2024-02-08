import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import type { RegisterBody } from '@app/shared';
import { registrationSchema } from '@app/shared';

import { useAuth } from '@/contexts/AuthContext';

import Button from '../Button';
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

        // Navigate to the success page if the form is valid with useNavigate
        setIsLoggedIn(true);
        navigate('/registration/success');
      }
    } catch {
      setErrorRegistration(
        'ⓘ An error occurred during registration. Try again!',
      );
    }
  };

  return (
    <div className='mx-auto flex h-full w-full max-w-[500px] flex-col justify-between'>
      <FormContainer title='Create a new account'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex h-full flex-col items-center justify-between'
        >
          <div className='flex h-full w-full flex-col justify-between gap-6'>
            <div className='flex flex-col gap-1'>
              <label htmlFor='email' className='text-secondary text-sm'>
                {'Email'}
                <span className='text-primary'>{'*'}</span>
              </label>
              <input
                type='email'
                id='email'
                className='border-primary bg-light-light text-secondary focus:outline-secondary rounded-lg border p-2 text-center transition-all focus:outline'
                {...register('email')}
              />

              {errors.email && errors.email.message !== undefined ? (
                <p className='text-primary flex text-xs'>
                  {errors.email.message}
                </p>
              ) : undefined}
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor='password' className='text-secondary mt-2 text-sm'>
                {'Password'}
                <span className='text-primary'>{'*'}</span>
              </label>
              <input
                type='password'
                id='password'
                className='border-primary bg-light-light text-secondary focus:outline-secondary w-100 rounded-lg border p-2 text-center transition-all focus:outline'
                {...register('password')}
              />
            </div>
          </div>

          {errors.password && errors.password.message !== undefined ? (
            <p className='text-primary flex text-xs'>
              {errors.password.message}
            </p>
          ) : undefined}

          {Boolean(errorRegistration) && <p>{errorRegistration}</p>}

          <div className='mt-20 flex w-full flex-col pb-12'>
            <Button type='submit' isOutline={false}>
              {'Validate'}
            </Button>
          </div>
        </form>
      </FormContainer>
    </div>
  );
}
