import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import type { UserTable } from '@app/types';

import FormName from '@/components/FormName';
import FormTest from '@/components/FormTest';

interface FormData extends UserTable {}

export default function FormProfile() {
  const [page, setPage] = useState(0);
  const methods = useForm<FormData>();
  const { handleSubmit, getValues, control, formState } = methods;

  const handleClick = () => {
    console.log('Valeur stocké:', getValues());
    setPage(page + 1);
  };

  const goBack = () => {
    if (page > 0) {
      setPage(page - 1);
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
      <form
        className='bg-light-hard m-auto mt-32 flex h-56 w-72 flex-col rounded-md p-8 shadow-md'
        onSubmit={handleClick}
      >
        {page === 0 ? <FormName /> : ''}
        {page === 1 ? <FormTest /> : ''}
        {page > 0 ? (
          <button onClick={goBack} type='button'>
            {'Back'}
          </button>
        ) : (
          ''
        )}
        {page < 1 ? (
          <button
            onClick={handleClick}
            className='bg-primary rounded-md'
            type='submit'
          >
            {'Next'}
          </button>
        ) : (
          ''
        )}
        {page === 1 ? (
          <button
            onClick={handleSubmit(formSubmit)}
            className='bg-primary rounded-md'
            type='submit'
          >
            {'Valider'}
          </button>
        ) : (
          ''
        )}
      </form>
    </FormProvider>
  );
}
