import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import type { UserTable } from '@app/types';

import Button from '@/components/Button';
import NavBar from '@/components/NavBar';
import FormBio from '@/components/forms/FormBio';
import FormBirthDate from '@/components/forms/FormBirthDate';
import FormCity from '@/components/forms/FormCity';
import FormEnd from '@/components/forms/FormEnd';
import FormGitHub from '@/components/forms/FormGitHub';
import FormIAm from '@/components/forms/FormIAm';
import FormName from '@/components/forms/FormName';
import FormTest from '@/components/forms/FormTest';

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
    if (page < 6) {
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
      <NavBar />
      <div className='w-full px-5'>
        <form
          onSubmit={handleSubmit(formSubmit)}
          className='flex h-screen flex-col items-center justify-between'
        >
          <div className='flex h-full w-full max-w-[500px] flex-col justify-between'>
            {page === 0 ? <FormName /> : ''}
            {page === 1 ? <FormBirthDate /> : ''}
            {page === 2 ? <FormIAm /> : ''}
            {page === 3 ? <FormBio /> : ''}
            {/*  {page === 4 ? <FormCity /> : ''} */}
            {page === 4 ? <FormGitHub /> : ''}
            {page === 5 ? <FormEnd /> : ''}

            {page === 6 ? <FormTest /> : ''}
            <div className='flex w-full flex-col gap-6 pb-40'>
              <Button isOutline={false} type='submit' color='text-light-hard'>
                {page >= 6 ? 'Start matching' : 'Next'}
              </Button>
              {page > 0 && page < 7 ? (
                <Button
                  isOutline
                  type='button'
                  onClick={goBack}
                  color='text-primary'
                >
                  {'Back'}
                </Button>
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
