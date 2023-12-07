import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import type { UserTable } from '@app/types';

import FormIAm from '@/components/FormIAm';
import FormName from '@/components/FormName';
import FormTest from '@/components/FormTest';

interface FormData extends UserTable {}

export default function FormProfile() {
  const [page, setPage] = useState<number>(0);
  const methods = useForm<FormData>();
  const { handleSubmit, getValues, formState } = methods;
  const { isDirty, isValid } = formState;

  console.log(isDirty, isValid);
  console.log(page);

  const handleClick = () => {
    console.log('Valeur stocké:', getValues());
    if (page < 5) {
      setPage((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  const formSubmit = async (data: FormData) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log('Valeur d envoie:', getValues()); //get value me sert seulement pour le console log des données stocké
    } catch (error) {
      throw new Error(`${String(error)}`);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleClick}>
        {page === 0 ? <FormName /> : ''}
        {page === 1 ? <FormIAm /> : ''}
        {page === 2 ? <FormTest /> : ''}
        <div className='m-auto mt-4 flex w-[500px] flex-col gap-2'>
          <button
            onClick={page < 2 ? handleClick : handleSubmit(formSubmit)}
            className='bg-primary rounded-md'
            type='submit'
            disabled={!isDirty || !isValid}
          >
            {page < 2 ? 'Next' : 'Valider'}
          </button>
          {page > 0 ? (
            <button
              className='border-primary rounded-md border-2'
              onClick={goBack}
              type='button'
            >
              {'Back'}
            </button>
          ) : (
            ''
          )}
        </div>
      </form>
    </FormProvider>
  );
}
