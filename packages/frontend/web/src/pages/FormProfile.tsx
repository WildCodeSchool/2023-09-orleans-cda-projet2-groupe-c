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
import FormLanguage from '@/components/forms/FormLanguage';
import FormName from '@/components/forms/FormName';
import FormTechnology from '@/components/forms/FormTechnology';
import FormTest from '@/components/forms/FormTest';
import FormTest1 from '@/components/forms/FormTest1';

interface FormData extends UserTable {}

export default function FormProfile() {
  const [page, setPage] = useState<number>(0);
  const methods = useForm<FormData>();
  const { handleSubmit, getValues, formState } = methods;

  console.log(page);

  const goBack = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  const formSubmit = async (data: FormData) => {
    console.log('Valeur stocké:', getValues());
    if (page < 7) {
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
      {/* <NavBar /> */}
      <div className='w-full overflow-y-hidden px-5'>
        <form
          onSubmit={handleSubmit(formSubmit)}
          className='flex h-screen flex-col items-center justify-between'
        >
          <div className='flex h-full w-full max-w-[500px] flex-col justify-between'>
            {page === 9 ? <FormName /> : ''}
            {page === 1 ? <FormBirthDate /> : ''}
            {page === 2 ? <FormIAm /> : ''}
            {page === 3 ? <FormBio /> : ''}
            {page === 4 ? <FormCity /> : ''}
            {page === 5 ? <FormGitHub /> : ''}
            {page === 7 ? <FormEnd /> : ''}
            {/* {page === 0 ? <FormLanguage /> : ''} */}
            {page === 8 ? <FormTest1 /> : ''}
            {page === 0 ? <FormTechnology /> : ''}

            {page === 6 ? <FormTest /> : ''}
            <div className='flex w-full flex-col gap-6 pb-5 md:pb-40'>
              <Button isOutline={false} type='submit' color='text-light-hard'>
                {page >= 7 ? 'Start matching' : 'Next'}
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
