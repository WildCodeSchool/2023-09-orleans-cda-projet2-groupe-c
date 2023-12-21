import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import FormContainer from './FormContainer';

interface Hobby {
  hobby_id: number;
  hobby_name: string;
}

interface Category {
  id: number;
  logo_path: string;
  category_name: string;
  hobbies: Hobby[];
}

interface FormValues extends Category {}

export default function FormHobby() {
  const { register, watch } = useFormContext<FormValues>();
  const [hobbies, setHobbies] = useState<Array<Category>>([]);
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
            <div className='border-secondary mb-5 flex justify-start border-b'>
              <h1 className='flex gap-2'>
                <img src={category.logo_path} alt='' />
                {category.category_name.charAt(0).toUpperCase() +
                  category.category_name.slice(1)}
              </h1>
            </div>
            <div className='flex flex-wrap gap-3'>
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
                    {...register('hobbies', { required: true })}
                    onChange={handleCheckboxChange}
                    className='sr-only'
                  />
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </FormContainer>
  );
}
