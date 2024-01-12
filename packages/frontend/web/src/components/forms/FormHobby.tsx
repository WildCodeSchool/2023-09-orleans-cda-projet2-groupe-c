import { useFormContext } from 'react-hook-form';

import {
  type FormCategoryValidation,
  formArrayStringSchema,
} from '@app/shared';

import useSelectedItems from '@/hooks/use-selected-items';

import FormContainer from './FormContainer';

export default function FormHobby() {
  const { register, formState } = useFormContext<FormCategoryValidation>();
  const { errors } = formState;
  const { items, selectedItems, fieldNameItems, handleCheckboxChange } =
    useSelectedItems({ apiUrlItems: 'hobbies', fieldNameItems: 'hobbies' });

  return (
    <FormContainer title='MY HOBBY'>
      <span className='flex justify-start pb-5 '>
        {'You can choose a maximum of 6 hobbies.'}
      </span>
      <div className='max-h-60 w-full overflow-y-auto py-3'>
        {items.map((category) => (
          <div key={category.category_name}>
            <div className='border-secondary flex justify-start border-b'>
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
                  className={`border-primary text-secondary hover:bg-primary cursor-pointer rounded-lg border px-2 py-1 ${
                    selectedItems.some(
                      (selectedItem) => selectedItem.id === hobby.hobby_id,
                    )
                      ? 'bg-primary'
                      : ''
                  }`}
                >
                  {hobby.hobby_name}
                  <input
                    value={JSON.stringify({
                      id: hobby.hobby_id,
                      order:
                        selectedItems.findIndex(
                          (selectedItem) => selectedItem.id === hobby.hobby_id,
                        ) + 1,
                    })}
                    id={hobby.hobby_name}
                    type='checkbox'
                    {...register(fieldNameItems, {
                      validate: (value) => {
                        const result =
                          formArrayStringSchema.shape.hobbies.safeParse(value);
                        return result.success
                          ? true
                          : result.error.errors[0]?.message;
                      },
                    })}
                    onChange={handleCheckboxChange}
                    className='absolute opacity-0'
                  />
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      {selectedItems.length >= 6 && (
        <p className='text-base'>{'ⓘ You have already selected 6 !'}</p>
      )}
      {errors.hobbies ? (
        <p className='error-message'>{errors.hobbies.message}</p>
      ) : (
        ''
      )}
    </FormContainer>
  );
}
