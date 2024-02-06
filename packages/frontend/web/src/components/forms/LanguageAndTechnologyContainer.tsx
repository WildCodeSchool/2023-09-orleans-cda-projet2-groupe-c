import { useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import {
  type CategoryHobby,
  type FormItemsValidation,
  type SelectedItemBody,
  formArrayStringSchema,
} from '@app/shared';

import FormContainer from './FormContainer';

interface SelectionFormProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly apiUrl: string;
  readonly formTitle: string;
  readonly subtitle: string;
  readonly fieldName: 'languages' | 'technologies';
}

const API_URL = import.meta.env.VITE_API_URL;

export default function LanguageAndTechnology({
  apiUrl,
  formTitle,
  subtitle,
  fieldName,
}: SelectionFormProps) {
  // State to store items
  const [items, setItems] = useState<CategoryHobby[]>([]);

  // State to store the first selected item
  const [firstSelectedItems, setFirstSelectedItems] = useState<CategoryHobby>();

  const { formState, control } = useFormContext<FormItemsValidation>();

  const { errors } = formState;

  const { field } = useController({
    control,
    name: fieldName,
    rules: {
      validate: (value) => {
        const key = apiUrl === 'languages' ? 'languages' : 'technologies';
        const result = formArrayStringSchema.shape[key].safeParse(value);
        return result.success ? true : result.error.errors[0]?.message;
      },
    },
  });

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
      const response = await fetch(`${API_URL}/${apiUrl}`, {
        signal,
      });

      const data = await response.json();
      setItems(data);
    })();

    return () => {
      controller.abort();
    };
  }, [apiUrl]);

  // Set the first selected item
  useEffect(() => {
    if (apiUrl === 'languages' && value.length > 0) {
      setFirstSelectedItems(
        items.find((language) => language.id === value[0].id),
      );
    }
  }, [apiUrl, items, value]);

  return (
    <FormContainer title={formTitle}>
      <span className='flex justify-start'>{subtitle}</span>
      <div className='mt-3 flex flex-col justify-center text-center'>
        {apiUrl === 'languages' ? (
          <div className='flex flex-col items-center justify-center gap-3'>
            <div className='outline-primary my-2 flex h-12 w-12 items-center justify-center rounded-md py-2 outline outline-offset-2 md:mt-4 md:h-16 md:w-16'>
              <img
                src={firstSelectedItems?.logo_path}
                alt={firstSelectedItems?.name}
              />
            </div>
            <span>{'This language will be displayed on your profile'}</span>
          </div>
        ) : (
          ''
        )}
        <div className='flex justify-center'>
          <div className='my-5 grid max-h-48 max-w-[26rem] grid-cols-4 gap-x-4 gap-y-2 overflow-y-auto px-5 py-3 md:max-h-56 md:px-10'>
            {items.map((item) => (
              <div
                className='flex flex-col items-center text-center duration-200 hover:scale-105'
                key={item.id}
              >
                <label
                  className='cursor-pointer text-[12px]'
                  htmlFor={item.name}
                >
                  <div className='relative flex justify-center'>
                    {value.some(
                      (selectedItem) => selectedItem.id === item.id,
                    ) ? (
                      <div className='bg-primary absolute right-0 top-0 flex h-5 w-5 translate-x-2 translate-y-[-8px] items-center justify-center rounded-full'>
                        <p className='text-white'>
                          {value.findIndex(
                            (selectedItem) => selectedItem.id === item.id,
                          ) + 1}
                        </p>
                      </div>
                    ) : (
                      ''
                    )}

                    <img
                      className={`hover:outline-primary h-12 w-12 hover:rounded-md hover:outline hover:outline-offset-2 lg:h-16 lg:w-16 ${
                        value.some(
                          (selectedItem) => selectedItem.id === item.id,
                        )
                          ? 'outline-primary rounded-md outline outline-offset-2'
                          : ''
                      }`}
                      src={item.logo_path}
                    />
                  </div>

                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </label>
                <input
                  id={item.name}
                  type='checkbox'
                  // {...register(fieldName, {
                  //   validate: (value) => {
                  //     const key =
                  //       apiUrl === 'languages' ? 'languages' : 'technologies';
                  //     const result =
                  //       formArrayStringSchema.shape[key].safeParse(value);
                  //     return result.success
                  //       ? true
                  //       : result.error.errors[0]?.message;
                  //   },
                  // })}
                  {...field}
                  onChange={handleCheckboxChange}
                  key={item.id}
                  checked={value.some((val) => val.id === item.id)}
                  value={item.id}
                  disabled={
                    value.length >= 6 &&
                    !value.some((selectedItem) => selectedItem.id === item.id)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='text-secondary absolute bottom-4'>
        {value.length >= 6 && (
          <p className='text-primary text-base'>
            {'ⓘ You have already selected 6 !'}
          </p>
        )}
        {errors[fieldName] ? (
          <p className='text-primary'>{errors[fieldName]?.message}</p>
        ) : undefined}
      </div>
    </FormContainer>
  );
}
