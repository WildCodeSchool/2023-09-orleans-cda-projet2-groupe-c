import { useFormContext } from 'react-hook-form';

type DefaultValues = {
  username: string;
};

export default function FormName() {
  const { register, formState } = useFormContext<DefaultValues>();

  const { errors } = formState;

  return (
    <div className='m-auto w-[500px] flex-col items-center'>
      <h1 className='text-primary font-title mb-4 mt-40 justify-start text-2xl'>
        {'MY NAME IS...'}
      </h1>
      <div className='bg-light-light h-64 rounded-md p-8 py-14 shadow-md'>
        <label className='text-secondary' htmlFor='username'>
          {'Username *'}
        </label>
        <input
          type='text'
          id='username'
          placeholder='Username'
          {...register('username', {
            required: {
              value: true,
              message: 'le nom pelo',
            },
          })}
          className='hover:border-primary border-primary mt-2 h-5 w-full rounded-md border-2 px-2 py-4 focus:outline-none'
        />
        <p>{errors.username?.message}</p>
      </div>
    </div>
  );
}
