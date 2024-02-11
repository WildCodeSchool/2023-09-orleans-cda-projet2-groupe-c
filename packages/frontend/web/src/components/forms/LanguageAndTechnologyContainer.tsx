import { useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { type FormItemsValidation, formItemsSchema } from '@app/shared';

import FormContainer from './FormContainer';

interface SelectionFormProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly apiUrl: string;
  readonly formTitle: string;
  readonly subtitle: string;
  readonly fieldName: 'languages' | 'technologies';
}

const API_URL = import.meta.env.VITE_API_URL;

interface ItemsBody {
  id: number;
  name: string;
  logo_path: string;
}

export default function LanguageAndTechnology({
  apiUrl,
  formTitle,
  subtitle,
  fieldName,
}: SelectionFormProps) {
  // State to store items
  const [items, setItems] = useState<ItemsBody[]>([]);

  // State to store the first selected item
  const [firstSelectedItems, setFirstSelectedItems] = useState<ItemsBody>();

  // Desctructure the useFormContext hook to get the formState and control
  const { formState, control } = useFormContext<FormItemsValidation>();

  // Get errors from the formState object
  const { errors } = formState;

  // Get the field from the useController hook
  // Use useController to control the form field
  const { field } = useController({
    control,
    name: fieldName,
    // Add rules to validate the form field with zod
    rules: {
      validate: (value) => {
        const key = apiUrl === 'languages' ? 'languages' : 'technologies';
        const result = formItemsSchema.shape[key].safeParse(value);
        return result.success || result.error.errors[0]?.message;
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
          <div className='mt-2 flex flex-col items-center justify-center gap-3'>
            <div className='outline-primary my-2 flex h-14 w-14 items-center justify-center rounded-md outline outline-offset-2'>
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

        {/* Items and Inputs */}
        <div className='flex justify-center'>
          <div
            className={`mt-5 grid max-w-[26rem] grid-cols-4 gap-x-4 gap-y-4 overflow-y-auto px-5 py-3 md:px-10 ${apiUrl === 'languages' ? 'max-h-[20vh] md:max-h-[30vh]' : 'max-h-[35vh] md:max-h-[42vh]'}`}
          >
            {items.map((item) => (
              <div
                className='flex flex-col items-center text-center duration-200 hover:scale-105'
                key={item.id}
              >
                <label
                  htmlFor={item.name}
                  className={`hover:outline-primary cursor-pointer text-[12px] hover:rounded-md hover:outline hover:outline-offset-2 lg:h-16 lg:w-16 ${
                    value.some((selectedItem) => selectedItem.id === item.id)
                      ? 'outline-primary rounded-sm outline outline-offset-2'
                      : ''
                  }`}
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
                    <div className='h-full max-h-12 w-full max-w-12'>
                      <img
                        className='h-full w-full object-cover object-center'
                        src={item.logo_path}
                      />
                    </div>
                  </div>
                </label>

                <p className='mt-1'>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </p>
                <input
                  id={item.name}
                  type='checkbox'
                  hidden
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

      {/* Errors messages */}
      <div className='text-secondary mt-2'>
        {value.length >= 6 && (
          <p className='text-primary text-base'>
            {'ⓘ You have already selected 6 !'}
          </p>
        )}
        {errors[fieldName] ? (
          <p className='text-primary mt-2'>{errors[fieldName]?.message}</p>
        ) : undefined}
      </div>
    </FormContainer>
  );
}
