import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import {
  type RequestPreferencesBody,
  requestPreferencesSchema,
} from '@app/shared';

import { usePreference } from '@/contexts/PreferenceContext';

import BulletBase from '../BulletBase';
import Button from '../Button';
import FilterIcon from '../icons/FilterIcon';
import { FilterAgeForm } from './FilterAgeForm';
import FilterDistanceForm from './FilterDistanceForm';
import FilterGenderForm from './FilterGenderForm';
import FilterLanguagesForm from './FilterLanguagesForm';
import FilterLine from './FilterLine';

const modalVariant = {
  hidden: {
    opacity: 0,
    x: '100%',
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 150,
    },
  },
};

export default function Filter() {
  // State to store the error message
  const [error, setError] = useState<string>();

  // Destructuring custom hook usePreference to get the function updatePreferences
  const { updatePreferences } = usePreference();

  const { setIsVisibleFilter } = usePreference();

  // Destructuring the hook useForm
  const { register, handleSubmit, formState, watch, setValue } =
    useForm<RequestPreferencesBody>({
      resolver: zodResolver(requestPreferencesSchema), // Form validation
    });

  // Destructuring the formState to get the isValid property
  const { isValid } = formState;

  // Function to handle the form submission
  const onSubmit: SubmitHandler<RequestPreferencesBody> = (data) => {
    try {
      if (isValid) {
        updatePreferences(data);
      }

      if (window.innerWidth < 1024) {
        setIsVisibleFilter(false);
      }
    } catch {
      setError('ⓘ An error occurred while updating preferences. Try again!');
    }
  };

  return (
    <motion.div
      variants={modalVariant}
      initial='hidden'
      animate='visible'
      className='mx-auto flex h-[calc(100vh-56px)] max-h-[calc(100vh-56px)] w-full max-w-[500px] flex-col gap-4 px-3 pb-4 pt-3 lg:mx-0 lg:max-w-full'
    >
      <header className='flex items-center gap-2'>
        <BulletBase size='8'>
          <FilterIcon className='fill-secondary' />
        </BulletBase>
        <h2 className='font-base text-secondary'>{`Preferences`}</h2>
        <p className='text-primary font-base mt-1'>{error}</p>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex w-full grow flex-col justify-between gap-5 overflow-hidden pb-2'
      >
        <div className='flex grow flex-col gap-2 overflow-y-auto pb-1'>
          {/* Gender Filter */}
          <FilterLine title='Show me'>
            <FilterGenderForm register={register} watch={watch} />
          </FilterLine>

          {/* Distance Filter */}
          <FilterLine title='Age'>
            <FilterAgeForm setValue={setValue} />
          </FilterLine>

          {/* Distance Filter */}
          <FilterLine title='Distance'>
            <FilterDistanceForm register={register} />
          </FilterLine>

          {/* Language Filter */}
          <FilterLine title='Language'>
            <FilterLanguagesForm register={register} watch={watch} />
          </FilterLine>
        </div>
        <Button type='submit' isOutline={false}>{`Apply`}</Button>
      </form>
    </motion.div>
  );
}
