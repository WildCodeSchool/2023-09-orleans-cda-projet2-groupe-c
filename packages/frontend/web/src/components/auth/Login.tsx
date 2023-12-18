import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import type { AuthBody } from '@app/shared';
import { authSchema } from '@app/shared';

import { useAuth } from '@/contexts/AuthContext';

import Button from '../Button';
import Loading from '../Loading';
import PasswordIcon from '../icons/PasswordIcon';
import UserIcon from '../icons/UserIcon';
import VisiblePassword from './VisiblePassword';

const API_URL = import.meta.env.VITE_API_URL;

// Variant animation for the container
const containerVariants = {
  hidden: {
    opacity: 0,
    y: 200,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      delay: 0.3,
      damping: 12,
      stiffness: 150,
    },
  },
};

export default function Login() {
  // State to show or hide the password
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Get the navigate function from the router
  const navigate = useNavigate();

  // Get states from the AuthContext
  const { isLoading, isLoggedIn, setIsLoggedIn } = useAuth();

  // Desctructure the useForm hook
  const { register, handleSubmit, formState } = useForm<AuthBody>({
    resolver: zodResolver(authSchema),
  });

  // Desctructure the formState object
  const { isValid, errors } = formState;

  // Submit the login form
  const onSubmit: SubmitHandler<AuthBody> = async (data) => {
    try {
      // Validation of user entered data using a validation schema

      if (isValid) {
        // Send the login request to the server
        const res = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          credentials: 'include', // Send cookies
          headers: {
            'content-type': 'application/json',
          },
          // Convert the JS object to a JSON string
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        });

        // Get the result from the server as a JS object JSON
        const resData = (await res.json()) as {
          isLoggedIn: boolean;
        };

        // If the user is logged in, redirect to the home page
        if (resData.isLoggedIn) {
          setIsLoggedIn(true);
          navigate('/');
        }
      }
    } catch {
      throw new Error('ⓘ Email or password is incorrect');
    }
  };

  // If the user is already logged in, redirect to the home page
  if (isLoggedIn) {
    return <Navigate to='/' />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='mb-10 flex w-full flex-col items-center gap-8 lg:mb-24'
    >
      <div className='w-full max-w-[500px]'>
        {/* Login form with hook useForm */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col items-start gap-4'
        >
          <div className='mb-5 flex w-full flex-col gap-4'>
            <div>
              <label htmlFor='email'>
                <div className='flex items-center gap-2'>
                  <UserIcon className='h-[18px] w-[15px]' />
                  <p className='text-base'>{`Email*`}</p>
                </div>
              </label>
              <input
                {...register('email')}
                name='email'
                type='email'
                id='email'
                className='accent-primary mt-1 w-full appearance-none rounded-lg border border-white bg-white/30 px-2 py-2 text-xl'
              />
              {errors.email && errors.email.message !== undefined ? (
                <p className='mt-1 flex'>{errors.email.message}</p>
              ) : undefined}
            </div>
            <div className='w-full'>
              <label htmlFor='password'>
                <div className='flex items-center gap-2'>
                  <PasswordIcon className='h-[18px] w-[15px] fill-white' />
                  <p className='text-base'>{`Password*`}</p>
                </div>
              </label>
              <div className='relative'>
                <input
                  {...register('password')}
                  name='password'
                  type={isVisible ? 'text' : 'password'}
                  id='password'
                  className='accent-primary mt-1 w-full appearance-none rounded-lg border border-white bg-white/30 px-2 py-2 text-xl'
                />
                <div className='absolute right-3 top-1/2 translate-y-[-30%]'>
                  <VisiblePassword
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                  />
                </div>
              </div>
              {errors.password && errors.password.message !== undefined ? (
                <p className='mt-1 flex'>{errors.password.message}</p>
              ) : undefined}
            </div>
            <div className='mt-5 w-full'>
              <p>{`You don't have an account ?`}</p>

              <Link
                to='/registration'
                className='text-primary font-semibold underline'
              >
                {`Create now`}
              </Link>
            </div>
          </div>
          <Button type='submit' isOutline={false}>{`Login`}</Button>
        </form>
      </div>
    </motion.div>
  );
}
