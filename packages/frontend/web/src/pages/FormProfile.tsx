import React from 'react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import type { ProfileForm } from '@app/shared';

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

const PAGES = [
  { currentPage: 0, component: <FormName /> },
  { currentPage: 1, component: <FormBirthDate /> },
  { currentPage: 2, component: <FormIAm /> },
  { currentPage: 3, component: <FormCity /> },
  { currentPage: 4, component: <FormLanguage /> },
  { currentPage: 5, component: <FormTechnology /> },
  { currentPage: 6, component: <FormHobby /> },
  { currentPage: 7, component: <FormBio /> },
  { currentPage: 8, component: <FormGitHub /> },
  { currentPage: 9, component: <FormTest /> },
  { currentPage: 10, component: <FormEnd /> },
];

export default function FormProfile() {
  const [page, setPage] = useState<number>(0);
  //I use the const methods to send all useForm properties to my child elements
  const methods = useForm<ProfileForm>();
  const { handleSubmit, getValues } = methods;

  const formSubmit = async (data: ProfileForm) => {
    console.log('Valeur stocké:', getValues());
    // If the current page is less than 10, move to the next page
    if (page < 10) {
      setPage((prev) => prev + 1);
      // Otherwise, attempt to submit the form data
    } else {
      try {
        // This function transforms an array of numbers into an array of objects
        // Each object has two properties: id (the value of the number) and order (the index of the number + 1)
        const transformArray = (array: number[]) =>
          array.map((item: number, index: number) => ({
            id: item,
            order: index + 1,
          }));
        // Use the transformArray function to transform the languages, technologies, and hobbies arrays
        const transformedData = {
          ...data,
          languages: transformArray(data.languages),
          technologies: transformArray(data.technologies),
          hobbies: transformArray(data.hobbies),
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
      <div className='w-full px-5'>
        <form
          onSubmit={handleSubmit(formSubmit)}
          className='flex h-screen flex-col items-center justify-between'
        >
          <div className='flex h-full w-full max-w-[500px] flex-col justify-between'>
            {/*   i use react.Fragment because only <></> not work with key */}
            {PAGES.map(
              ({ currentPage, component }) =>
                currentPage === page && (
                  <React.Fragment key={currentPage}>{component}</React.Fragment>
                ),
            )}

            <div className='flex w-full flex-col gap-6 pb-5 md:pb-40'>
              <Button isOutline={false} type='submit' color='text-light-hard'>
                {page >= 10 ? 'Start matching' : 'Next'}
              </Button>
              {page > 0 && page < 10 ? (
                <Button
                  isOutline
                  type='button'
                  onClick={() => {
                    setPage(page - 1);
                  }}
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
