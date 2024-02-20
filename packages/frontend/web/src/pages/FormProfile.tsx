import { Fragment, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

import type { FormProfileBody } from '@app/shared';

import Button from '@/components/Button';
import FormLayout from '@/components/FormLayout';
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
  { index: 0, component: <FormName /> },
  { index: 1, component: <FormBirthDate /> },
  { index: 2, component: <FormGender /> },
  { index: 3, component: <FormCity /> },
  { index: 4, component: <FormLanguage /> },
  { index: 5, component: <FormTechnology /> },
  { index: 6, component: <FormHobby /> },
  { index: 7, component: <FormBio /> },
  { index: 8, component: <FormGitHub /> },
  { index: 9, component: <FormEnd /> },
];

export default function FormProfile() {
  // State to control the current page
  const [page, setPage] = useState<number>(0);

  // State to control the percentage of the progress bar
  const [percentage, setPercentage] = useState<number>(0);

  const navigate = useNavigate();

  const { setIsLoggedIn, isLoggedIn } = useAuth();

  // Use the const methods to send all useForm properties to my child elements
  const methods = useForm<FormProfileBody>({
    shouldFocusError: false,
  });

  const { handleSubmit } = methods;

  // Function to submit the form data
  const formSubmit = async (data: FormProfileBody) => {
    // If the current page is less than 10, move to the next page
    if (page < PAGES.length - 1) {
      setPage(page + 1);

      setPercentage(((page + 2) / PAGES.length) * 100);
      // Otherwise, attempt to submit the form data
    } else {
      try {
        // Get data year, month and day to create the birthdate
        const { year, month, day, ...rest } = data;
        const birthdate = `${year}-${month}-${day}`;

        // Create a new object with the birthdate and the rest of the data
        const newData = { ...rest, birthdate };

        await fetch(`/api/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
        });

        setIsLoggedIn(true);
        navigate('/');
      } catch (error) {
        throw new Error(`${String(error)}`);
      }
    }
  };

  // If the user is not logged in, redirect to the login page
  if (!isLoggedIn) {
    return <Navigate to='/login' />;
  }

  return (
    <FormLayout>
      <FormProvider {...methods}>
        {/* Progress bar */}
        <div className='pt-5'>
          <ProgressBar percentage={percentage} />
        </div>

        {/* Forms */}
        <form
          onSubmit={handleSubmit(formSubmit)}
          className='flex h-full flex-col items-center justify-between py-[10%]'
        >
          <div className='flex h-full w-full max-w-[500px] flex-col justify-between'>
            {/* Use react.Fragment because only <></> not work with key */}
            {PAGES.map(
              ({ index, component }) =>
                index === page && <Fragment key={index}>{component}</Fragment>,
            )}

            {/* Buttons Next and Back */}
            <div className='flex w-full flex-col gap-6'>
              <Button isOutline={false} type='submit'>
                {page >= PAGES.length ? 'Start matching' : 'Next'}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </FormLayout>
  );
}
