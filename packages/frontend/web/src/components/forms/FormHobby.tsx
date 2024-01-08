import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  type CategoryHobby,
  type FormCategoryValidation,
  formHobbiesChooseShema,
} from '@app/shared';

import FormContainer from './FormContainer';

export default function FormHobby() {
  const { register, formState } = useFormContext<FormCategoryValidation>();
  const { errors } = formState;
  const [hobbies, setHobbies] = useState<CategoryHobby[]>([]);
  const [selectedHobby, setSelectedHobby] = useState<string[]>([]);

  console.log(selectedHobby);
  console.log(hobbies);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hobby = event.target.id;

    if (selectedHobby.includes(hobby)) {
      setSelectedHobby(selectedHobby.filter((lang) => lang !== hobby));
      //localStorage.setItem('selectedHobby', JSON.stringify(selectedHobby.filter((lang) => lang !== hobby)));
    } else if (selectedHobby.length < 6) {
      setSelectedHobby([...selectedHobby, hobby]);
      //localStorage.setItem('selectedHobby', JSON.stringify([...selectedHobby, hobby]));
    }
  };

  useEffect(() => {
    /*   const savedHobbies = localStorage.getItem('selectedHobby');
    if (savedHobbies) {
      setSelectedHobby(JSON.parse(savedHobbies));
    } */
    const controller = new AbortController();

    (async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/hobbies`, {
        signal: controller.signal,
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
                        const result =
                          formHobbiesChooseShema.shape.hobbies.safeParse(value);
                        return result.success
                          ? true
                          : result.error.errors[0]?.message;
                      },
                    })}
                    onChange={handleCheckboxChange}
                    className=''
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
