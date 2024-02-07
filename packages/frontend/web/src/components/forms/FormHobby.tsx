import { useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import {
  type FormCategoryValidation,
  type HobbyBody,
  formArrayStringSchema,
} from '@app/shared';

import FormContainer from './FormContainer';

const API_URL = import.meta.env.VITE_API_URL;

export default function FormHobby() {
  // State to store hobbies
  const [hobbies, setHobbies] = useState<HobbyBody[]>([]);

  const { formState, control } = useFormContext<FormCategoryValidation>();

  // Destructure the errors from the formState
  const { errors } = formState;

  const { field } = useController({
    control,
    name: 'hobbies',
    rules: {
      validate: (value) => {
        const result = formArrayStringSchema.shape['hobbies'].safeParse(value);
        return result.success ? true : result.error.errors[0]?.message;
      },
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions
  const [value, setValue] = useState(field.value || []);

  // Function to handle checkbox change when the user selects or unselects an item
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = Number(event.target.value);
    const isChecked = event.target.checked;

    if (isChecked) {
      // Add the selected item to the array
      setValue((prev) => [
        ...prev,
        { id: targetValue, order: prev.length + 1 },
      ]);
    } else {
      // Remove the unselected item from the array
      setValue((prev) => {
        const updatedArray = prev.filter((item) => item.id !== targetValue);

        // Reassign the order of the items
        return updatedArray.map((item, index) => ({
          ...item,
          order: index + 1,
        }));
      });
    }

    // Update the form field value
    field.onChange(value);
  };

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
    <FormContainer title='MY HOBBIES'>
      <div className='pb-16'>
        <span className='flex justify-start pb-5 '>
          {'You can choose a maximum of 6 hobbies.'}
        </span>

        {/* Hobbies */}
        <div className='flex max-h-[21rem] w-full flex-col gap-6 overflow-y-auto py-3'>
          {hobbies.map((category) => (
            <div key={category.category_name} className='flex flex-col gap-4'>
              <div className='border-divider flex justify-start border-b'>
                <h1 className='flex gap-2'>
                  <img src={category.logo_path} alt={category.logo_path} />
                  {category.category_name.charAt(0).toUpperCase() +
                    category.category_name.slice(1)}
                </h1>
              </div>
              <div className='flex flex-wrap gap-3'>
                {category.hobbies.map((hobby) => (
                  <label
                    htmlFor={hobby.hobby_name}
                    key={hobby.hobby_id}
                    className={`border-primary hover:bg-primary cursor-pointer rounded-lg border px-2 py-1 ${
                      value.some(
                        (item) => Number(item.id) === Number(hobby.hobby_id),
                      )
                        ? 'bg-primary text-light'
                        : 'text-secondary'
                    }`}
                  >
                    {hobby.hobby_name}
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
                  </label>
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
      </div>
    </FormContainer>
  );
}
