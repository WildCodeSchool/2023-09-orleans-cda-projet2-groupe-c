import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import FormContainer from './FormContainer';

type DefaultValues = {
  gender: 'man' | 'woman' | 'other';
};

export default function FormIAm() {
  const { register } = useFormContext<DefaultValues>();

  const [selectedOption, setSelectedOption] = useState('');

  const handleClick = (option: string) => {
    setSelectedOption((prev) => (prev === option ? '' : option));
  };

  const genderOptions = [
    { id: 'man', label: 'Man', value: 'man' },
    { id: 'woman', label: 'Woman', value: 'woman' },
    { id: 'other', label: 'Non Binary', value: 'non-binary' },
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
              onClick={() => {
                handleClick(option.id);
              }}
            >
              {option.label}
            </label>
            <input
              className='sr-only'
              type='radio'
              id={option.id}
              {...register('gender')}
              value={option.value}
            />
          </div>
        ))}
      </div>
    </FormContainer>
  );
}
