import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  type FormItemsBodyValidation,
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

export default function LanguageAndTechnology({
  apiUrl,
  formTitle,
  subtitle,
  fieldName,
}: SelectionFormProps) {
  const [items, setItems] = useState<FormItemsBodyValidation[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItemBody[]>([]);
  const { register, formState } = useFormContext<FormItemsValidation>();
  const { errors } = formState;

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Convert Json to JS object
    const targetValue = JSON.parse(event.target.value);
    // Get Id from the value
    const targetId = targetValue.id;

    let newItems = selectedItems;

    if (selectedItems.some((item) => item.id === targetId)) {
      newItems = selectedItems.filter((item) => item.id !== targetId);
    } else if (selectedItems.length < 6) {
      newItems = [
        ...selectedItems,
        { id: targetId, order: selectedItems.length + 1 },
      ];
    }
    setSelectedItems(newItems);
    localStorage.setItem(fieldName, JSON.stringify(newItems));
  };

  useEffect(() => {
    const savedItems = localStorage.getItem(fieldName);
    if (savedItems) {
      setSelectedItems(JSON.parse(savedItems));
    }
    const controller = new AbortController();

    (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/${apiUrl}`,
        {
          signal: controller.signal,
        },
      );

      const data = await response.json();
      setItems(data);
    })();

    return () => {
      controller.abort();
    };
  }, [apiUrl]);

  let firstSelectedItems;

  if (apiUrl === 'languages' && selectedItems.length > 0) {
    firstSelectedItems = items.find(
      (language) => language.id === selectedItems[0].id,
    );
  }

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
                <label className='text-[12px]' htmlFor={item.name}>
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
                  value={JSON.stringify({
                    id: item.id,
                    order:
                      selectedItems.findIndex(
                        (selectedItem) => selectedItem.id === item.id,
                      ) + 1,
                  })}
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
                  disabled={
                    selectedItems.length >= 6 &&
                    !selectedItems.some(
                      (selectedItem) => selectedItem.id === item.id,
                    )
                  }
                  className='sr-only'
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
