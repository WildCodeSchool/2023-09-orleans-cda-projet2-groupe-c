import { useFormContext } from 'react-hook-form';

import { type FormIamValidation, formIamSchema } from '@app/shared';

import FormContainer from './FormContainer';

const genderOptions = [
  { id: 'man', label: 'Man', value: 'man' },
  { id: 'woman', label: 'Woman', value: 'woman' },
  { id: 'non-binary', label: 'Non Binary', value: 'non-binary' },
];

export default function FormGender() {
  const { register, watch, setValue, formState } =
    useFormContext<FormIamValidation>();

  const { errors } = formState;

  const selectedOption = watch('gender');

  const handleClick = () => {
    setValue('gender', selectedOption);
  };

  return (
    <FormContainer title='I AM...'>
      <span className='flex justify-start pb-5'>{'Choose your gender.'}</span>
      <div className='mx-auto flex w-full max-w-[350px] flex-col gap-3'>
        {genderOptions.map((option) => (
          <div key={option.id} className='flex items-center justify-center'>
            <label
              className={`border-primary hover:bg-primary hover:text-light-hard flex w-full cursor-pointer items-center justify-center rounded-lg border py-3 text-xl ${
                selectedOption === option.id ? 'bg-primary text-light' : ''
              }`}
              htmlFor={option.id}
              onClick={handleClick}
            >
              {option.label}
            </label>
            <input
              hidden
              type='radio'
              id={option.id}
              {...register('gender', {
                validate: (value) => {
                  const result = formIamSchema.shape.gender.safeParse(value);
                  if (!result.success) {
                    return result.error.errors[0].message;
                  }
                  return true;
                },
              })}
              value={option.value}
            />
          </div>
        ))}
      </div>

      {errors.gender ? (
        <p className='text-primary mt-2'>{errors.gender.message}</p>
      ) : (
        ''
      )}
    </FormContainer>
  );
}
