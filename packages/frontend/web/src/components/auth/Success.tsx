import { Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';

import Button from '../Button';
import FormLayout from '../FormLayout';
import FormContainer from '../forms/FormContainer';
import CheckIcon from '../icons/CheckIcon';

export default function Success() {
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/registration/validation');
  };

  // If the user is not logged in, redirect to the login page
  if (!isLoggedIn) {
    return <Navigate to='/login' />;
  }

  return (
    <FormLayout>
      <div className='flex h-full flex-col items-center justify-between py-[15%]'>
        <FormContainer title='Registration complete !'>
          <div className='my-10 flex flex-col'>
            <div className='mx-auto'>
              <CheckIcon />
            </div>

            <h3 className='text-secondary my-6 text-center align-top text-xl'>
              {'Your TinDev account has been created !'}
            </h3>
            <p className='text-secondary text-center text-base'>
              {
                'To fully enjoy the application, you will receive an activation code to activate your user account.'
              }
            </p>
          </div>
        </FormContainer>

        <Button type='button' onClick={handleClick} isOutline={false}>
          {'Activate my account'}
        </Button>
      </div>
    </FormLayout>
  );
}
