import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

type DefaultValues = {
  gender: string;
};

export default function FormIAm() {
  const { register } = useFormContext<DefaultValues>();

  const [selectedOption, setSelectedOption] = useState('');

  const handleClick = (option: string) => {
    setSelectedOption((prev) => (prev === option ? '' : option));
  };

  return (
    <div className='font-base w-full flex-col items-center pt-40'>
      <h1 className='text-primary font-title mb-4 justify-start text-2xl lg:text-3xl'>
        {'I AM...'}
      </h1>
      <div className='bg-light-light  text-secondary flex flex-col gap-3 rounded-md px-7 pb-12 pt-5 text-sm shadow-md lg:text-base'>
        <span className='flex justify-start pb-5 '>
          {'Your sexe will be visible to everyone.'}
        </span>
        <div className='flex items-center justify-center'>
          <label
            className={`border-primary flex w-full cursor-pointer items-center justify-center rounded-lg border py-3 text-xl ${
              selectedOption === 'man' ? 'bg-primary text-light-hard' : ''
            }`}
            htmlFor='man'
            onClick={() => {
              handleClick('man');
            }}
          >
            {'Man'}
          </label>
          <input
            className='sr-only'
            type='radio'
            id='man'
            {...register('gender')}
            value={'man'}
          />
        </div>
        <div className='flex items-center justify-center'>
          <label
            className={`border-primary flex w-full cursor-pointer items-center justify-center rounded-lg border py-3 text-xl ${
              selectedOption === 'woman' ? 'bg-primary text-light-hard' : ''
            }`}
            htmlFor='woman'
            onClick={() => {
              handleClick('woman');
            }}
          >
            {'woman'}
          </label>
          <input
            className='sr-only'
            type='radio'
            id='woman'
            {...register('gender')}
            value={'woman'}
          />
        </div>
        <div className='flex items-center justify-center'>
          <label
            className={`border-primary flex w-full cursor-pointer items-center justify-center rounded-lg border py-3 text-xl ${
              selectedOption === 'other' ? 'bg-primary text-light-hard' : ''
            }`}
            htmlFor='other'
            onClick={() => {
              handleClick('other');
            }}
          >
            {'non binary'}
          </label>
          <input
            className='sr-only checked:bg-black'
            type='radio'
            id='other'
            {...register('gender')}
            value={'non-binary'}
          />
        </div>
      </div>
    </div>
  );
}
