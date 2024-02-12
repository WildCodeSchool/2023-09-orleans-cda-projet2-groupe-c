import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

import {
  type ActivationTokenFormBody,
  activationCodeFormSchema,
} from '@app/shared';

import Button from '@/components/Button';
import FormLayout from '@/components/FormLayout';
import FormContainer from '@/components/forms/FormContainer';
import { useAuth } from '@/contexts/AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

type CodeKey = 'code_1' | 'code_2' | 'code_3' | 'code_4' | 'code_5' | 'code_6';

// Create an array of 6 elements with an unique register key
// Used to map through the inputs
const inputsActivationCode = Array.from({ length: 6 }, (_, index) => ({
  register: `code_${index + 1}` as CodeKey,
}));

export default function ValidationToken() {
  // State to store the user's code
  const [code, setCode] = useState<string>();

  // State to store the error message
  const [errorRegistration, setErrorRegistration] = useState<string>();

  // Get the navigate function from the router
  const navigate = useNavigate();

  // Get the login states from the AuthContext
  const { userId, setIsActived, isLoggedIn } = useAuth();

  // Desctructure the useForm hook
  const { register, handleSubmit, formState } =
    useForm<ActivationTokenFormBody>({
      resolver: zodResolver(activationCodeFormSchema),
    });

  // Desctructure the formState object
  const { isValid } = formState;

  // onSubmit function to handle form submission
  const onSubmit: SubmitHandler<ActivationTokenFormBody> = async (data) => {
    try {
      if (isValid) {
        // Send a POST request to the API to activate the user's account
        const res = await fetch(`${API_URL}/auth/registration/validation`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            activation_code: `${data.code_1}${data.code_2}${data.code_3}${data.code_4}${data.code_5}${data.code_6}`,
          }),
        });

        const resData = (await res.json()) as {
          isLoggedIn: boolean;
          isActived: boolean;
        };

        // If the user is logged in, redirect to the home page
        if (resData.isLoggedIn) {
          setIsActived(resData.isActived);
          navigate('/registration/profile');
        }
      }
    } catch {
      setErrorRegistration(
        'ⓘ An error occurred while activating your account. Try Again!',
      );
    }
  };

  // Fetch the user's activation code
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

  // If the user is not logged in, redirect to the login page
  if (!isLoggedIn) {
    return <Navigate to='/login' />;
  }

  // If the account is not activated
  return (
    <FormLayout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex h-full flex-col items-center justify-between py-[15%]'
      >
        <FormContainer title='Activate your account'>
          <p className='text-secondary align-top text-sm'>
            {'To activate your account, please enter the 6 characters.'}
          </p>

          {/* Display code */}
          <p className='text-primary font-title mx-auto my-10 align-top text-2xl tracking-widest'>
            {code}
          </p>

          {/* Inputs activation code */}
          <div className='mx-auto grid h-full min-h-[40px] max-w-[300px] grid-cols-6 gap-2'>
            {inputsActivationCode.map((input, index) => (
              <input
                key={input.register}
                className='border-primary bg-light h-full w-full rounded-lg border p-2 text-center text-lg uppercase focus:outline-none lg:text-xl'
                type='text'
                maxLength={1}
                {...register(input.register)}
                onChange={(event) => {
                  // Convert the input value to uppercase
                  event.target.value = event.target.value.toUpperCase();

                  // Check if the input value is not empty and if the next input exists
                  if (
                    event.target.value &&
                    Boolean(inputsActivationCode[index + 1])
                  ) {
                    // Get the next input
                    const nextInput = document.querySelector(
                      `input[name="${inputsActivationCode[index + 1].register}"]`,
                    ) as HTMLInputElement;

                    // Focus on the next input
                    nextInput.focus();
                  }
                }}
              />
            ))}
          </div>

          {/* Error message */}
          {Boolean(errorRegistration) && (
            <p className='text-primary mt-2'>{errorRegistration}</p>
          )}
        </FormContainer>

        <Button isOutline={false} type='submit'>
          {'Validate'}
        </Button>
      </form>
    </FormLayout>
  );
}
