import { useFormContext } from 'react-hook-form';
import { ZodError } from 'zod';

import type { FormIamValidation } from '@app/shared';
import { formIamShema } from '@app/shared';

import FormContainer from './FormContainer';

export default function FormIAm() {
  const { register, watch, setValue, formState } =
    useFormContext<FormIamValidation>();
  const { errors } = formState;

  const selectedOption = watch('gender');

  const handleClick = () => {
    setValue('gender', selectedOption);
  };

  const genderOptions = [
    { id: 'man', label: 'Man', value: 'man' },
    { id: 'woman', label: 'Woman', value: 'woman' },
    { id: 'non-binary', label: 'Non Binary', value: 'non-binary' },
  ];

  return (
    <FormContainer title='I AM...'>
      <span className='flex justify-start pb-5 '>
        {'Your sexe will be visible to everyone.'}
      </span>
      <div className='flex flex-col gap-3'>
        {genderOptions.map((option) => (
          <div key={option.id} className='flex items-center justify-center'>
            <label
              className={`border-primary hover:bg-primary hover:text-light-hard flex w-full cursor-pointer items-center justify-center rounded-lg border  py-3 text-xl ${
                selectedOption === option.id ? 'bg-primary text-light-hard' : ''
              }`}
              htmlFor={option.id}
              onClick={handleClick}
            >
              {option.label}
            </label>
            <input
              className='sr-only'
              type='radio'
              id={option.id}
              {...register('gender', {
                validate: (value) => {
                  try {
                    formIamShema.shape.gender.parse(value);
                    return true;
                  } catch (error: unknown) {
                    if (error instanceof ZodError) {
                      return 'ⓘ Gender is required.';
                    }
                    return 'An error occurred';
                  }
                },
              })}
              value={option.value}
            />
          </div>
        ))}
      </div>
      {errors.gender ? (
        <p className='error-message'>{errors.gender.message}</p>
      ) : (
        ''
      )}
    </FormContainer>
  );
}
