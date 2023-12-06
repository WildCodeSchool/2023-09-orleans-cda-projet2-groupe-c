import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import type { UserTable } from '@app/types';

import FormName from '@/components/FormName';
import FormTest from '@/components/FormTest';

interface FormData extends UserTable {}

export default function FormProfile() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({});
  console.log(page);
  console.log(formData);

  /*   const handleClick = (data) => {
    setFormData({ ...formData, ...data });
    setPage(page + 1);
  }; */

  const goBack = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const methods = useForm<FormData>();
  const { handleSubmit } = methods;

  /*   const onSubmit = (data) => {
    setFormData({ ...formData, ...data });
  }; */

  const formSubmit = async (data: FormData) => {
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
  };

  return (
    <FormProvider {...methods}>
      <form>
        {/* <form onSubmit={handleSubmit(handleClick)}> */}
        {page === 0 ? <FormName /> : ''}
        {page === 1 ? <FormTest /> : ''}
      </form>
      <button onClick={goBack} type='button'>
        {'Back'}
      </button>
      <button className='bg-primary rounded-md' type='button'>
        {'Next'}
      </button>
      {/*  <button
        onClick={handleClick}
        className='bg-primary rounded-md'
        type='button'
      >
        {'Next'}
      </button> */}
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
    </FormProvider>
  );
}
