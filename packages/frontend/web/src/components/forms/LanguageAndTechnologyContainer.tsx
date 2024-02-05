import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

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

  // State to store selected items
  const [selectedItems, setSelectedItems] = useState<SelectedItemBody[]>([]);
  // console.log('selected items :', selectedItems);

  // State to store the first selected item
  const [firstSelectedItems, setFirstSelectedItems] = useState<CategoryHobby>();

  const { register, formState, setValue, getValues, watch } =
    useFormContext<FormItemsValidation>();

  const { errors } = formState;

  const watchField = watch(fieldName);
  console.log('watchField :', watchField);

  // Function to handle checkbox change
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Convert JSON to JS object
    const targetValue = Number(event.target.value);

    // Check if the id from the target value is already in the selected items
    if (selectedItems.some((item) => item.id === targetValue)) {
      // Update the selected items
      setSelectedItems((prevItems) => {
        // Filter the selected items to remove the target id
        const newItems = prevItems.filter((item) => item.id !== targetValue);

        // Reassigns the order of the remaining items
        const reorderedItems = newItems.map((item, index) => ({
          ...item,
          order: index + 1,
        }));

        // setValue(fieldName, selectedItems, {
        //   shouldDirty: true,
        // });

        return reorderedItems;
      });

      //   // If the selected items length is less than 6
    } else if (selectedItems.length < 6) {
      // Add the selected items to the state
      setSelectedItems((prevItems) => {
        const newItems = [
          ...prevItems,
          { id: targetValue, order: prevItems.length + 1 },
        ];

        // setValue(fieldName, selectedItems, {
        //   shouldDirty: true,
        // });

        return newItems;
      });
    }

    // Update the form value
    setValue(fieldName, selectedItems, {
      shouldDirty: true,
    });
  };

  console.log(fieldName, getValues(fieldName));
  console.log('selectedItems :', selectedItems);

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
    if (apiUrl === 'languages' && selectedItems.length > 0) {
      setFirstSelectedItems(
        items.find((language) => language.id === selectedItems[0].id),
      );
    }
  }, [apiUrl, items, selectedItems]);

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
                    {selectedItems.some(
                      (selectedItem) => selectedItem.id === item.id,
                    ) ? (
                      <div className='bg-primary absolute right-0 top-0 flex h-5 w-5 translate-x-2 translate-y-[-8px] items-center justify-center rounded-full'>
                        <p className='text-white'>
                          {selectedItems.findIndex(
                            (selectedItem) => selectedItem.id === item.id,
                          ) + 1}
                        </p>
                      </div>
                    ) : (
                      ''
                    )}

                    <img
                      className={`hover:outline-primary h-12 w-12 hover:rounded-md hover:outline hover:outline-offset-2 lg:h-16 lg:w-16 ${
                        selectedItems.some(
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
                  value={item.id}
                  // value={JSON.stringify({
                  //   id: item.id,
                  //   order: index + 1,
                  // })}
                  id={item.name}
                  type='checkbox'
                  {...register(fieldName, {
                    validate: (value) => {
                      const key =
                        apiUrl === 'languages' ? 'languages' : 'technologies';
                      const result =
                        formArrayStringSchema.shape[key].safeParse(value);
                      return result.success
                        ? true
                        : result.error.errors[0]?.message;
                    },
                  })}
                  onChange={handleCheckboxChange}
                  checked={selectedItems.some(
                    (selectedItem) => selectedItem.id === item.id,
                  )}
                  disabled={
                    selectedItems.length >= 6 &&
                    !selectedItems.some(
                      (selectedItem) => selectedItem.id === item.id,
                    )
                  }
                  // className='absolute opacity-0'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='text-secondary absolute bottom-4'>
        {selectedItems.length >= 6 && (
          <p className='text-base'>{'ⓘ You have already selected 6 !'}</p>
        )}
        {errors[fieldName] ? <p>{errors[fieldName]?.message}</p> : undefined}
      </div>
    </FormContainer>
  );
}
