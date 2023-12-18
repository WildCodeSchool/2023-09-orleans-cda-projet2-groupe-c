import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';

import { type ActivationCode, activationCodeSchema } from '@app/types';

const API_URL = import.meta.env.VITE_API_URL;

const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  const code = data.activation_code;

  // Fetching the API to validate the user's code
  await fetch(`${API_URL}/auth/registration/validation`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ activation_code: code }),
  });
};

export default function ValidationToken() {
  const { register, handleSubmit } = useForm<ActivationCode>({
    resolver: zodResolver(activationCodeSchema),
  });

  const [code, setCode] = useState('');

  // This useEffect hook will fetch the user's code from the database
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchCode = async () => {
      const res = await fetch(`${API_URL}/auth/registration/users/code`, {
        signal,
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
      });

      const data = await res.json();
      setCode(data[0].activation_code); // Set the code state to the retrieved user's code
    };
    fetchCode().catch((error) => {
      throw new Error(error);
    });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className='p-8'>
      <h1 className='font-title text-primary mb-5 mt-24 text-xl'>
        {'Validate my account'}
      </h1>
      <div className='bg-light-light flex h-[13rem] flex-col items-center gap-2 rounded-lg px-2 shadow-md'>
        <div className='text-start'>
          <p className='text-dark-light my-2 mb-4 align-top text-xs'>
            {
              'To activate your account, please enter the 6 characters you received in the confirmation email.'
            }
          </p>
        </div>
        <div>
          <p className='text-dark-light my-2 mb-4 align-top text-xs'>
            {`Activation code: ${code}`} {/* Display the user's code */}
          </p>
        </div>
        <div className='mt-5 flex flex-col'>
          <form
            className='flex flex-col gap-3'
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className='border-primary bg-light-light text-dark-light/70 focus:outline-secondary w-100 rounded-lg border p-2 text-center transition-all focus:outline'
              type='text'
              {...register(
                'activation_code',
              )} /* The user has to type the shown code as a captcha to complete the validation */
            />
            <div className='flex flex-col items-center'>
              <button
                className='text-light-light bg-primary border-primary-dark mt-52 rounded-lg p-2 px-12'
                type='submit'
              >
                {'Validate'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
