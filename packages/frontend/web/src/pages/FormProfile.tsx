import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import type { UserTable } from '@app/types';

import FormBirthDate from '@/components/Forms/FormBirthDate';
import FormCity from '@/components/Forms/FormCity';
import FormIAm from '@/components/Forms/FormIAm';
import FormName from '@/components/Forms/FormName';
import FormTest from '@/components/Forms/FormTest';

interface FormData extends UserTable {}

export default function FormProfile() {
  const [page, setPage] = useState<number>(0);
  const methods = useForm<FormData>();
  const { handleSubmit, getValues, formState } = methods;
  const { isDirty, isValid } = formState;

  console.log(isDirty, isValid);
  console.log(page);

  const goBack = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  const formSubmit = async (data: FormData) => {
    console.log('Valeur stocké:', getValues());
    if (page < 4) {
      setPage((prev) => prev + 1);
    } else {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      } catch (error) {
        throw new Error(`${String(error)}`);
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <div className='w-full px-5'>
        <form
          onSubmit={handleSubmit(formSubmit)}
          className='flex h-screen flex-col items-center justify-between'
        >
          <div className='flex h-full w-full max-w-[500px] flex-col justify-between'>
            {page === 0 ? <FormName /> : ''}
            {page === 1 ? <FormBirthDate /> : ''}
            {page === 2 ? <FormIAm /> : ''}
            {page === 3 ? <FormCity /> : ''}

            {page === 4 ? <FormTest /> : ''}
            <div className='flex w-full flex-col gap-2 pb-40'>
              <button
                className='bg-primary text-light-hard rounded-md py-2'
                type='submit'
                disabled={!isDirty || !isValid}
              >
                {page < 4 ? 'Next' : 'Valider'}
              </button>
              {page > 0 ? (
                <button
                  className='border-primary text-primary w-full rounded-md border py-1'
                  onClick={goBack}
                  type='button'
                >
                  {'Back'}
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
