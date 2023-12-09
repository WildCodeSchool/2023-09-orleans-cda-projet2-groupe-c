import { useFormContext } from 'react-hook-form';

type DefaultValues = {
  name: string;
};

export default function FormName() {
  const { register, formState } = useFormContext<DefaultValues>();

  const { errors } = formState;

  return (
    <div className='font-base w-full flex-col items-center pt-40'>
      <h1 className='text-primary font-title mb-4 text-2xl lg:text-3xl'>
        {'MY NAME IS...'}
      </h1>
      <div className='bg-light text-secondary h-full rounded-md px-7 pb-12 pt-5 text-sm shadow-md lg:text-base'>
        <span className='flex justify-start pb-8'>
          {'The maximum allowed number of character is 100.'}
        </span>
        <label htmlFor='name'>{'Username *'}</label>
        <input
          type='text'
          id='name'
          placeholder='name'
          {...register('name', {
            required: {
              value: true,
              message: 'le nom pelo',
            },
          })}
          className='border-primary bg-light mt-2 h-5 w-full rounded-md border px-2 py-6 text-lg focus:outline-none lg:text-xl'
        />
        <p>{errors.name?.message}</p>
      </div>
    </div>
  );
}
