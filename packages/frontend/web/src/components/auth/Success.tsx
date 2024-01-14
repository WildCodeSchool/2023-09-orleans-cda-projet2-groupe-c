import { Link, Navigate } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';

import Button from '../Button';
import CheckIcon from '../icons/CheckIcon';

export default function Success() {
  // Get the state isLoggedIn from the AuthContext
  const { isLoggedIn } = useAuth();

  // If the user is already logged in, redirect to the home page
  if (isLoggedIn) {
    return <Navigate to='/' />;
  }

  return (
    <>
      <div className='p-8'>
        <h1 className='font-title text-primary mb-5 mt-24 text-xl'>
          {'Registration complete !'}
        </h1>
        <div className='bg-light-light flex h-[18rem] flex-col items-center justify-center gap-2 rounded-lg px-2 shadow-md'>
          <div className='text-start'>
            <div className='flex flex-row justify-center'>
              <CheckIcon />
            </div>
            <p className='text-secondary my-4 mb-4 text-center align-top text-lg'>
              {'Your TinDev account has been created !'}
            </p>
            <p className='text-secondary text-center text-xs'>
              {
                'To fully enjoy the application, you will receive a confirmation email to activate your account.'
              }
            </p>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <Link to='/registration/validation'>
          <Button type='button' isOutline={false}>
            {'Validate'}
          </Button>
        </Link>
      </div>
    </>
  );
}
