import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import type { UserTable } from '@app/types';

import Button from '@/components/Button';
import FormBio from '@/components/forms/FormBio';
import FormBirthDate from '@/components/forms/FormBirthDate';
import FormCity from '@/components/forms/FormCity';
import FormEnd from '@/components/forms/FormEnd';
import FormGitHub from '@/components/forms/FormGitHub';
import FormHobby from '@/components/forms/FormHobby';
import FormIAm from '@/components/forms/FormIAm';
import FormLanguage from '@/components/forms/FormLanguage';
import FormName from '@/components/forms/FormName';
import FormTechnology from '@/components/forms/FormTechnology';
import FormTest from '@/components/forms/FormTest';

interface FormData extends UserTable {
  languages: number[];
  technologies: number[];
  hobbies: number[];
}

export default function FormProfile() {
  const [page, setPage] = useState<number>(0);
  const methods = useForm<FormData>();
  const { handleSubmit, getValues } = methods;

  console.log(page);

  const goBack = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  const formSubmit = async (data: FormData) => {
    console.log('Valeur stocké:', getValues());
    if (page < 10) {
      setPage((prev) => prev + 1);
    } else {
      try {
        const transformedData = {
          ...data,
          languages: data.languages.map((langages: number, index: number) => ({
            id: langages,
            order: index + 1,
          })),
          technologies: data.technologies.map(
            (technologies: number, index: number) => ({
              id: technologies,
              order: index + 1,
            }),
          ),
          hobbies: data.hobbies.map((hobbies: number, index: number) => ({
            id: hobbies,
            order: index + 1,
          })),
        };

        await fetch(`${import.meta.env.VITE_API_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(transformedData),
        });
      } catch (error) {
        throw new Error(`${String(error)}`);
      }
    }
  };

  return (
    <FormProvider {...methods}>
      {/* <NavBar /> */}
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
            {page === 4 ? <FormLanguage /> : ''}
            {page === 5 ? <FormTechnology /> : ''}
            {page === 6 ? <FormHobby /> : ''}
            {page === 7 ? <FormBio /> : ''}
            {page === 8 ? <FormGitHub /> : ''}
            {page === 9 ? <FormTest /> : ''}
            {page === 10 ? <FormEnd /> : ''}

            <div className='flex w-full flex-col gap-6 pb-5 md:pb-40'>
              <Button isOutline={false} type='submit' color='text-light-hard'>
                {page >= 10 ? 'Start matching' : 'Next'}
              </Button>
              {page > 0 && page < 10 ? (
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
