import { Fragment, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

import type { ProfileForm, SelectedItemBody } from '@app/shared';

import Button from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import FormBio from '@/components/forms/FormBio';
import FormBirthDate from '@/components/forms/FormBirthDate';
import FormCity from '@/components/forms/FormCity';
import FormEnd from '@/components/forms/FormEnd';
import FormGender from '@/components/forms/FormGender';
import FormGitHub from '@/components/forms/FormGitHub';
import FormHobby from '@/components/forms/FormHobby';
import FormLanguage from '@/components/forms/FormLanguage';
import FormName from '@/components/forms/FormName';
import FormTechnology from '@/components/forms/FormTechnology';
import { useAuth } from '@/contexts/AuthContext';

const PAGES = [
  { currentPage: 6, component: <FormName /> },
  { currentPage: 1, component: <FormBirthDate /> },
  { currentPage: 2, component: <FormGender /> },
  { currentPage: 3, component: <FormCity /> },
  { currentPage: 4, component: <FormLanguage /> },
  { currentPage: 5, component: <FormTechnology /> },
  { currentPage: 0, component: <FormHobby /> },
  { currentPage: 7, component: <FormBio /> },
  { currentPage: 8, component: <FormGitHub /> },
  { currentPage: 9, component: <FormEnd /> },
];

export default function FormProfile() {
  // const navigate = useNavigate();

  const [page, setPage] = useState<number>(0);

  // const { isLoggedIn } = useAuth();

  //I use the const methods to send all useForm properties to my child elements
  const methods = useForm<ProfileForm>({
    shouldFocusError: false,
  });

  const { handleSubmit, formState, getValues } = methods;

  // console.log('getValues :', getValues());
  console.log('errors :', formState.errors);
  console.log('value :', getValues());
  const formSubmit = (data: ProfileForm) => {
    console.log('data :', data);
    // // If the current page is less than 10, move to the next page
    if (page < PAGES.length - 1) {
      setPage(page + 1);
    }
    //   // Otherwise, attempt to submit the form data
    // } else {
    //   try {
    //     // This function transforms an array of string into an array of objects
    //     const transformArray = (array: string[]): SelectedItemBody[] =>
    //       array.map((item: string) => JSON.parse(item) as SelectedItemBody);

    //     // Use the transformArray function to transform the languages, technologies, and hobbies object
    //     const transformedData = {
    //       ...data,
    //       languages: data.languages,
    //       // technologies: data.technologies,
    //       // hobbies: transformArray(data.hobbies),
    //     };

    //     await fetch(`${import.meta.env.VITE_API_URL}/register`, {
    //       method: 'POST',
    //       credentials: 'include',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(transformedData),
    //     });

    //     navigate('/');
    //   } catch (error) {
    //     throw new Error(`${String(error)}`);
    //   }
    // }
  };

  // if (!isLoggedIn) {
  //   return <Navigate to='/registration' />;
  // }

  return (
    <FormProvider {...methods}>
      <div className='mx-auto w-full max-w-[500px]'>
        <ProgressBar percentage={60} />
      </div>
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
                  <Fragment key={currentPage}>{component}</Fragment>
                ),
            )}
            <div className='mb-5 flex w-full flex-col gap-6 md:mb-32'>
              <Button isOutline={false} type='submit'>
                {page >= 9 ? 'Start matching' : 'Next'}
              </Button>
              {page > 0 && page < 9 ? (
                <Button
                  isOutline
                  type='button'
                  onClick={() => {
                    setPage(page - 1);
                  }}
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
