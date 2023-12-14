import {
  useForm,
  type SubmitHandler,
} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { RegisterBody } from '@app/types';

const API_URL = import.meta.env.VITE_API_URL;

export default function Registration() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<RegisterBody>({
    criteriaMode: 'all',
  });
  const { isValid } = formState;

  const onSubmit: SubmitHandler<RegisterBody> = async (data) => {
    try {
      const email = data.email;
      const password = data.password;

      await fetch(`${API_URL}/auth/registration`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
    } catch (error) {
      throw new Error(`Failed to register. : ${String(error)}`);
    }
    if (isValid) {
      navigate('/registration/success');
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
            {
              'To activate your account, please enter the 6 characters you received in the confirmation email.'
            }
          </p>
        </div>
        <div className='flex flex-col items-center'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col justify-center gap-3'
          >
            <label htmlFor='email' className='text-secondary -mb-2 text-sm'>
              {'Email'}
              <span className='text-next'>{'*'}</span>
            </label>
            <input
              type='email'
              id='email'
              className='border-primary bg-light-light text-dark-light/70 focus:outline-secondary w-100 rounded-lg border p-2 text-center transition-all focus:outline'
              {...register('email', {
                required: {
                  value: true,
                  message: 'Ce champ est obligatoire >:-(((',
                },
              })}
            />
            <label
              htmlFor='password'
              className='text-secondary -mb-2 mt-2 text-sm'
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
            <button
              className='text-light-light bg-primary border-primary-dark mt-52 rounded-lg p-2 px-12'
              type='submit'
            >
              {'Validate'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
