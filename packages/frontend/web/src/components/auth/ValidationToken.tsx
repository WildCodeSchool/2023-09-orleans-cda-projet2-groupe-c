import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

import { type ActivationCode, activationCodeSchema } from '@app/shared';

import Button from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

export default function ValidationToken() {
  // State to store the user's code
  const [code, setCode] = useState<string>();

  // Get the navigate function from the router
  const navigate = useNavigate();

  // Get states from the AuthContext
  const { isLoggedIn, userId } = useAuth();

  // Desctructure the useForm hook
  const { register, handleSubmit, formState } = useForm<ActivationCode>({
    resolver: zodResolver(activationCodeSchema),
  });

  // Desctructure the formState object
  const { isValid, errors } = formState;

  const onSubmit: SubmitHandler<ActivationCode> = async (data) => {
    try {
      if (isValid) {
        const res = await fetch(`${API_URL}/auth/registration/validation`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(data),
        });

        const resData = (await res.json()) as {
          ok: boolean;
          isLoggedIn: boolean;
        };

        if (resData.isLoggedIn) {
          navigate('/');
        }
      }
    } catch {
      throw new Error('ⓘ Token is incorrect');
    }
  };

  // This useEffect hook will fetch the user's code from the database
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchCode = async () => {
      const res = await fetch(
        `${API_URL}/auth/registration/users/${userId}/code`,
        {
          signal,
          credentials: 'include',
          headers: { 'content-type': 'application/json' },
        },
      );

      const data = await res.json();

      // Set the code state
      setCode(data[0].activation_code);
    };

    fetchCode().catch((error) => {
      throw new Error(error);
    });

    return () => {
      controller.abort();
    };
  }, [userId]);

  if (!isLoggedIn) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='p-8'>
      <h1 className='font-title text-primary mb-5 mt-24 text-xl'>
        {'Validate my account'}
      </h1>
      <div className='bg-light-light flex h-[13rem] flex-col items-center gap-2 rounded-lg px-2 shadow-md'>
        <div className='text-start'>
          <p className='text-secondary my-2 mb-4 align-top text-xs'>
            {
              'To activate your account, please enter the 6 characters you received in the confirmation email.'
            }
          </p>
        </div>
        <div>
          <p className='text-secondary my-2 mb-4 align-top text-xs'>
            {`Activation code: ${code}`} {/* Display the user's code */}
          </p>
        </div>
        <div className='mt-5 flex flex-col'>
          <form
            className='flex flex-col gap-3'
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className='border-primary bg-light-light text-secondary focus:outline-secondary w-100 rounded-lg border p-2 text-center transition-all focus:outline'
              type='text'
              {...register(
                'activation_code',
              )} /* The user has to type the shown code as a captcha to complete the validation */
            />
            <p>{errors.activation_code?.message}</p>
            <div className='flex flex-col items-center'>
              <Button isOutline={false} type='submit'>
                {'Validate'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
