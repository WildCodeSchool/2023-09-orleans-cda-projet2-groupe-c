import { useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import {
  type FormItemsValidation,
  type HobbyBody,
  formItemsSchema,
} from '@app/shared';

import FormContainer from './FormContainer';

type ValueType = { id: number; order: number };

export default function FormHobby() {
  // State to store hobbies
  const [hobbies, setHobbies] = useState<HobbyBody[]>([]);

  const { formState, control } = useFormContext<FormItemsValidation>();

  // Destructure the errors from the formState
  const { errors } = formState;

  const { field } = useController({
    control,
    name: 'hobbies',
    rules: {
      // Use zod schema to validate the form field
      validate: (value) => {
        const result = formItemsSchema.shape['hobbies'].safeParse(value);
        if (!result.success) {
          return result.error.errors[0].message;
        }
        return true;
      },
    },
  });

  const [value, setValue] = useState<ValueType[]>(
    Boolean(field.value) ? field.value : [],
  );

  // Function to handle checkbox change when the user selects or unselects an item
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = Number(event.target.value);
    const isChecked = event.target.checked;

    if (isChecked) {
      // Add the selected item to the array
      setValue((prev) => {
        const newValue = [...prev, { id: targetValue, order: prev.length + 1 }];
        field.onChange(newValue);

        return newValue;
      });
    } else {
      // Remove the unselected item from the array
      setValue((prev) => {
        const newValue = prev
          .filter((item) => item.id !== targetValue)
          .map((item, index) => ({
            ...item,
            order: index + 1,
          }));
        field.onChange(newValue);

        return newValue;
      });
    }
  };

  // Fetch data from the API
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      const response = await fetch(`/api/hobbies`, {
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
    <FormContainer title='I love...'>
      <span className='flex justify-start pb-5 '>
        {'You can choose a maximum of 6 hobbies.'}
      </span>

      {/* Hobbies */}
      <div className='flex max-h-[30vh] w-full flex-col gap-6 overflow-y-auto py-3 md:max-h-[40vh]'>
        {hobbies.map((category) => (
          <div key={category.category_name} className='flex flex-col gap-4'>
            <div className='border-divider flex justify-start border-b'>
              <h1 className='flex gap-2'>
                <img src={category.logo_path} alt={category.logo_path} />
                {category.category_name.charAt(0).toUpperCase() +
                  category.category_name.slice(1)}
              </h1>
            </div>
            <div className='flex w-full flex-wrap gap-2'>
              {category.hobbies.map((hobby) => (
                <div
                  key={hobby.hobby_id}
                  className={`border-primary hover:bg-primary cursor-pointer rounded-lg border px-2 py-1 ${
                    value.some(
                      (item) => Number(item.id) === Number(hobby.hobby_id),
                    )
                      ? 'bg-primary text-light'
                      : 'text-secondary'
                  }`}
                >
                  <label htmlFor={hobby.hobby_name}>{hobby.hobby_name}</label>
                  <input
                    {...field}
                    hidden
                    disabled={
                      value.length >= 6 &&
                      !value.some(
                        (selectedItem) => selectedItem.id === hobby.hobby_id,
                      )
                    }
                    value={hobby.hobby_id}
                    id={hobby.hobby_name}
                    onChange={handleCheckboxChange}
                    type='checkbox'
                    checked={value.some((val) => val.id === hobby.hobby_id)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Error message */}
      <div className='text-primary absolute bottom-4'>
        {value.length >= 6 && (
          <p className='text-primary text-base'>
            {'ⓘ You have already selected 6 !'}
          </p>
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
