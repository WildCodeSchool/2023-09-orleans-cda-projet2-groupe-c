import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ZodError } from 'zod';

import type { FormCategoryValidation } from '@app/shared';
import { formHobbiesShema } from '@app/shared';

import FormContainer from './FormContainer';

export default function FormHobby() {
  const { register, watch, formState } =
    useFormContext<FormCategoryValidation>();
  const { errors } = formState;
  const [hobbies, setHobbies] = useState<FormCategoryValidation[]>([]);
  const [selectedHobby, setSelectedHobby] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hobby = event.target.id;

    if (selectedHobby.includes(hobby)) {
      setSelectedHobby(selectedHobby.filter((lang) => lang !== hobby));
    } else if (selectedHobby.length < 6) {
      setSelectedHobby([...selectedHobby, hobby]);
    }
  };

  console.log(watch('hobbies'));

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/hobbies`, {
        signal: abortController.signal,
      });
      const data = await response.json();
      setHobbies(data);
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <FormContainer title='MY HOBBY'>
      <span className='flex justify-start pb-5 '>
        {'You can choose a maximum of 6 hobbies.'}
      </span>
      <div className='max-h-60 w-full overflow-y-auto py-3'>
        {hobbies.map((category) => (
          <div key={category.category_name}>
            <div className='border-secondary flex justify-start border-b'>
              <h1 className='flex gap-2'>
                <img src={category.logo_path} alt='' />
                {category.category_name.charAt(0).toUpperCase() +
                  category.category_name.slice(1)}
              </h1>
            </div>
            <div className='flex flex-wrap gap-3 py-6'>
              {category.hobbies.map((hobby) => (
                <label
                  htmlFor={hobby.hobby_name}
                  key={hobby.hobby_id}
                  className={`border-primary text-secondary hover:bg-primary cursor-pointer rounded-lg border px-2 py-1 ${
                    selectedHobby.includes(hobby.hobby_name) ? 'bg-primary' : ''
                  }`}
                >
                  {hobby.hobby_name}
                  <input
                    value={hobby.hobby_id}
                    id={hobby.hobby_name}
                    type='checkbox'
                    {...register('hobbies', {
                      validate: (value) => {
                        try {
                          formHobbiesShema.shape.hobbies.parse(value);
                          return true;
                        } catch (error: unknown) {
                          if (error instanceof ZodError) {
                            return 'ⓘ Select at least one hobby';
                          }
                          return 'An error occurred';
                        }
                      },
                    })}
                    onChange={handleCheckboxChange}
                    className='sr-only'
                  />
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      {errors.hobbies ? (
        <p className='error-message'>{errors.hobbies.message}</p>
      ) : (
        ''
      )}
    </FormContainer>
  );
}
