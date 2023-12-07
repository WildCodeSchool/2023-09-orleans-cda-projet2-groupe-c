import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import type { RegisterBody } from '@app/types';

const API_URL = import.meta.env.VITE_API_URL;

export default function Registration() {
  const { register, handleSubmit } = useForm<RegisterBody>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterBody> = async (data) => {
    const email = data.email;
    const password = data.password;

    // Send the login request to the server
    try {
      const res = await fetch(`${API_URL}/auth/registration`, {
        method: 'POST',
        credentials: 'include', // Send cookies
        headers: {
          'content-type': 'application/json',
        },
        // Convert the JS object to a JSON string
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log(res);

      const resData = (await res.json()) as {
        ok: boolean;
      };

      console.log(resData);

      if (resData.ok) {
        navigate('/registration/success');
      }
    } catch (error) {
      throw new Error(String(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='email'>{`Email`}</label>
      <input
        {...register('email')}
        name='email'
        type='email'
        id='email'
        className='text-dark-medium'
      />

      <label htmlFor='password'>{`Password`}</label>
      <input
        {...register('password')}
        name='password'
        type='password'
        id='password'
        className='text-dark-medium'
      />

      <button type='submit'>{`Register`}</button>
    </form>
  );
}
