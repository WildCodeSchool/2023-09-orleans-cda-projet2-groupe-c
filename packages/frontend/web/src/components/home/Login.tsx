import { motion } from 'framer-motion';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';

import Button from '../Button';
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
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { isLoading, isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Submit the login form
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Send the request to the API
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include', // Send cookies
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Convert the response to json
      const data = (await res.json()) as {
        isLoggedIn: boolean;
      };

      // If the user is logged in, set the state to true and redirect to the home page
      if (data.isLoggedIn) {
        setIsLoggedIn(true);
        navigate('/');
      }
    } catch (error) {
      throw new Error(`Failed to login: ${String(error)}`);
    }
  };

  // If the user is already logged in, redirect to the home page
  if (isLoggedIn) {
    return <Navigate to='/' />;
  }

  return isLoading ? (
    <p>{`Loading...`}</p>
  ) : (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='mb-10 flex w-full flex-col items-center gap-8 lg:mb-24'
    >
      <div className='w-full max-w-[500px]'>
        <form onSubmit={onSubmit} className='flex flex-col items-start gap-4'>
          <div className='mb-5 flex w-full flex-col gap-4'>
            <div>
              <label htmlFor='email'>
                <div className='flex items-center gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='15'
                    height='18'
                    viewBox='0 0 15 18'
                    fill='none'
                  >
                    <path
                      d='M7.5 8.57143C9.86719 8.57143 11.7857 6.6529 11.7857 4.28571C11.7857 1.91853 9.86719 0 7.5 0C5.13281 0 3.21429 1.91853 3.21429 4.28571C3.21429 6.6529 5.13281 8.57143 7.5 8.57143ZM10.5 9.64286H9.94085C9.19754 9.98438 8.37054 10.1786 7.5 10.1786C6.62946 10.1786 5.8058 9.98438 5.05915 9.64286H4.5C2.01562 9.64286 0 11.6585 0 14.1429V15.5357C0 16.423 0.719866 17.1429 1.60714 17.1429H13.3929C14.2801 17.1429 15 16.423 15 15.5357V14.1429C15 11.6585 12.9844 9.64286 10.5 9.64286Z'
                      fill='white'
                    />
                  </svg>
                  <p className='text-base'>{`Email*`}</p>
                </div>
              </label>
              <input
                type='email'
                id='email'
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                value={email}
                className='bg-light-light/30 accent-primary border-light-light mt-1 w-full appearance-none rounded-lg border px-2 py-2 text-xl'
              />
            </div>
            <div className='w-full'>
              <label htmlFor='password'>
                <div className='flex items-center gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='15'
                    height='18'
                    viewBox='0 0 15 18'
                    fill='none'
                  >
                    <path
                      d='M13.3929 7.92871H12.5893V5.518C12.5893 2.71219 10.3058 0.428711 7.5 0.428711C4.6942 0.428711 2.41071 2.71219 2.41071 5.518V7.92871H1.60714C0.719866 7.92871 0 8.64858 0 9.53585V15.9644C0 16.8517 0.719866 17.5716 1.60714 17.5716H13.3929C14.2801 17.5716 15 16.8517 15 15.9644V9.53585C15 8.64858 14.2801 7.92871 13.3929 7.92871ZM9.91071 7.92871H5.08929V5.518C5.08929 4.18876 6.17076 3.10728 7.5 3.10728C8.82924 3.10728 9.91071 4.18876 9.91071 5.518V7.92871Z'
                      fill='white'
                    />
                  </svg>
                  <p className='text-base'>{`Password*`}</p>
                </div>
              </label>
              <div className='relative'>
                <input
                  type={isVisible ? 'text' : 'password'}
                  id='password'
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  value={password}
                  className='bg-light-light/30 accent-primary border-light-light mt-1 w-full appearance-none rounded-lg border px-2 py-2 text-xl'
                />

                <div className='absolute right-3 top-1/2 translate-y-[-30%]'>
                  <VisiblePassword
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                  />
                </div>
              </div>
            </div>
            <div className='mt-5 w-full'>
              <p>{`You don't have an account ?`}</p>

              {/* TODO : add link for register */}
              <Link to='/' className='text-primary font-semibold underline'>
                {`Create now`}
              </Link>
            </div>
          </div>

          <Button word='Connection' type='submit' isOutline={false} />
        </form>
      </div>
    </motion.div>
  );
}
