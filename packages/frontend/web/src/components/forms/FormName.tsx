import { useFormContext } from 'react-hook-form';

import FormContainer from './FormContainer';

type DefaultValues = {
  name: string;
};

export default function FormName() {
  const { register, formState } = useFormContext<DefaultValues>();

  const { errors } = formState;

  return (
    <FormContainer title='MY NAME IS...'>
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
    </FormContainer>
  );
}
