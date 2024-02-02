import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  type FormCategoryValidation,
  type HobbyBody,
  type SelectedItemBody,
  hobbySchema,
} from '@app/shared';

import FormContainer from './FormContainer';

const API_URL = import.meta.env.VITE_API_URL;

export default function FormHobby() {
  // State to store hobbies
  const [hobbies, setHobbies] = useState<HobbyBody[]>([]);

  const { register, formState, watch } =
    useFormContext<FormCategoryValidation>();

  // Destructure the errors from the formState
  const { errors } = formState;

  // Watch the hobbies
  const watchHobby = watch('hobbies');

  // Convert the selectedHobbies to an array of objects
  // Used to add class
  const objectSelectedHobbies = Boolean(watchHobby)
    ? watchHobby.map((hobby) => JSON.parse(String(hobby)) as SelectedItemBody)
    : [];

  // Fetch data from the API
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      const response = await fetch(`${API_URL}/hobbies`, {
        signal,
      });

      const data = await response.json();
      setHobbies(data);
    })();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <FormContainer title='MY HOBBY'>
      <span className='flex justify-start pb-5 '>
        {'You can choose a maximum of 6 hobbies.'}
      </span>

      {/* Hobbies */}
      <div className='max-h-96 w-full overflow-y-auto py-3'>
        {hobbies.map((category) => (
          <div key={category.category_name}>
            <div className='border-divider flex justify-start border-b'>
              <h1 className='flex gap-2'>
                <img src={category.logo_path} alt={category.logo_path} />
                {category.category_name.charAt(0).toUpperCase() +
                  category.category_name.slice(1)}
              </h1>
            </div>
            <div className='flex flex-wrap gap-3 py-6'>
              {category.hobbies.map((hobby) => (
                <label
                  htmlFor={hobby.hobby_name}
                  key={hobby.hobby_id}
                  className={`border-primary hover:bg-primary cursor-pointer rounded-lg border px-2 py-1 ${
                    objectSelectedHobbies.some(
                      (item) => Number(item.id) === Number(hobby.hobby_id),
                    )
                      ? 'bg-primary text-light'
                      : 'text-secondary'
                  }`}
                >
                  {hobby.hobby_name}
                  <input
                    disabled={Boolean(watchHobby) && watchHobby.length >= 6}
                    value={JSON.stringify({
                      id: hobby.hobby_id,
                      order:
                        objectSelectedHobbies.findIndex(
                          (selectedHobby) =>
                            selectedHobby.id === hobby.hobby_id,
                        ) + 1,
                    })}
                    id={hobby.hobby_name}
                    type='checkbox'
                    {...register('hobbies', {
                      validate: (value) => {
                        const result = hobbySchema.safeParse(value);
                        return result.success
                          ? true
                          : result.error.errors[0]?.message;
                      },
                    })}
                    className='absolute h-0 w-0 opacity-0 focus:hidden'
                  />
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Error message */}
      <div className='text-primary absolute bottom-4'>
        {Boolean(watchHobby) && watchHobby.length >= 6 && (
          <p className='text-base'>{'ⓘ You have already selected 6!'}</p>
        )}
        {errors.hobbies ? (
          <p className='text-primary text-base'>{errors.hobbies.message}</p>
        ) : (
          ''
        )}
      </div>
    </FormContainer>
  );
}
