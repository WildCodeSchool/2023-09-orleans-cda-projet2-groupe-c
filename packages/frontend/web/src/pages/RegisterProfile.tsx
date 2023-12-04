import { useForm } from 'react-hook-form';

import type { UserTable } from '@app/types';

export default function RegisterProfile() {
  interface FormData extends UserTable {}

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      throw new Error(`${String(error)}`);
    }
  };

  return (
    <div className='mt-32 flex items-center justify-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-light-light text-light-hard flex w-56 flex-col gap-2'
      >
        <label className='text-secondary'>{'First Name'}</label>
        <input
          type='text'
          placeholder='test'
          className='bg-dark-ulta-light flex flex-col'
          {...register('name')}
        />
        <label className='text-secondary'>{'Birthdate'}</label>
        <input
          type='date'
          className='bg-dark-ulta-light flex flex-col'
          {...register('birthdate')}
        />
        <label className='text-secondary'>{'Who are you'}</label>
        <select className='text-secondary' {...register('gender')}>
          <option value='female'>{'female'}</option>
          <option value='man'>{'man'}</option>
          <option value='non-binary'>{'non-binary'}</option>
        </select>
        <label className='text-secondary'>{'Byographie'}</label>
        <input
          type='textarea'
          className='bg-dark-ulta-light flex flex-col'
          {...register('biography')}
        />
        <label className='text-secondary'>{'Email'}</label>
        <input
          type='email'
          className='bg-dark-ulta-light flex flex-col'
          {...register('email')}
        />
        <label className='text-secondary'>{'Password'}</label>
        <input
          type='password'
          className='bg-dark-ulta-light flex flex-col'
          {...register('password')}
        />
        <button className='bg-primary rounded-md' type='submit'>
          {"S'inscrire"}
        </button>
      </form>
    </div>
  );
}
