import { useFormContext } from 'react-hook-form';

import { type FormItemsValidation, formArrayStringSchema } from '@app/shared';

import useSelectedItems from '@/hooks/use-selected-items';

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
  const {
    items,
    apiUrlItems,
    selectedItems,
    fieldNameItems,
    handleCheckboxChange,
  } = useSelectedItems({ apiUrlItems: apiUrl, fieldNameItems: fieldName });
  const { register, formState } = useFormContext<FormItemsValidation>();
  const { errors } = formState;

  let firstSelectedItems;

  if (apiUrlItems === 'languages' && selectedItems.length > 0) {
    firstSelectedItems = items.find(
      (language) => language.id === selectedItems[0].id,
    );
  }

  return (
    <FormContainer title={formTitle}>
      <span className='flex justify-start'>{subtitle}</span>
      <div className='mt-3 flex flex-col justify-center text-center'>
        {apiUrlItems === 'languages' ? (
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
                  value={JSON.stringify({
                    id: item.id,
                    order:
                      selectedItems.findIndex(
                        (selectedItem) => selectedItem.id === item.id,
                      ) + 1,
                  })}
                  id={item.name}
                  type='checkbox'
                  {...register(fieldNameItems, {
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
                  className='absolute opacity-0'
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
