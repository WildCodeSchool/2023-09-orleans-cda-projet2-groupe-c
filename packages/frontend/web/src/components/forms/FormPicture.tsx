import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import FormLayout from '../FormLayout';
import AddIcon from '../icons/AddIcon';
import FormContainer from './FormContainer';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface FormPictureBody {
  picture: FileList;
}

export default function FormPicture() {
  const { register, handleSubmit } = useForm<FormPictureBody>();
  const [error, setError] = useState<string | undefined>();

  const onSubmit: SubmitHandler<FormPictureBody> = (data) => {
    //
    const formData = new FormData();
    formData.append('picture', data.picture[0]);

    const uploadPicture = async () => {
      const res = await fetch(`/api/registration/upload`, {
        method: 'POST',
        body: formData,
      });

      const resData = await res.json();

      if (!Boolean(resData.success)) {
        setError(resData.message);
      }
    };

    uploadPicture().catch(() => {
      setError('Fail to upload picture.');
    });
  };

  return (
    <FormLayout>
      <FormContainer title='Photo'>
        <p className='flex justify-start pb-8'>
          {'You must have a mandatory profile photo.'}
        </p>
        <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
          <div className='row-span-3 mx-auto mt-4 grid h-[89vw] max-h-[460px] w-full grid-cols-3 grid-rows-3 gap-2'>
            <div className='border-primary relative col-span-2 row-span-2 rounded-md border'>
              <p className='font-base text-secondary absolute -top-6 left-1/2 -translate-x-1/2'>{`Profile photo`}</p>
              <AddIcon className='absolute left-1/2 top-1/2 w-14 -translate-x-1/2 -translate-y-1/2' />
              <p className='font-title text-placeholder/50 absolute bottom-0 right-5 translate-y-2 text-9xl'>{`1`}</p>

              <input
                {...register('picture')}
                type='file'
                accept='.jpg, .jpeg, .webp, .png'
                name='picture'
                className='h-full w-full opacity-0'
              />
            </div>
            <div className='border-primary relative col-span-1 row-span-1 rounded-md border'>
              <AddIcon className='absolute left-1/2 top-1/2 w-14 -translate-x-1/2 -translate-y-1/2' />
              <p className='font-title text-placeholder/50 absolute bottom-0 right-0 w-12 translate-y-2 overflow-hidden text-8xl'>{`2`}</p>

              <input
                {...register('picture')}
                type='file'
                accept='.jpg, .jpeg, .webp, .png'
                name='picture'
                className='h-full w-full opacity-0'
              />
            </div>
            <div className='border-primary relative col-span-1 row-span-1 rounded-md border'>
              <AddIcon className='absolute left-1/2 top-1/2 w-14 -translate-x-1/2 -translate-y-1/2' />
              <p className='font-title text-placeholder/50 absolute bottom-0 right-0 w-12 translate-y-2 overflow-hidden text-8xl'>{`3`}</p>
              <input
                {...register('picture')}
                type='file'
                accept='.jpg, .jpeg, .webp, .png'
                name='picture'
                className='h-full w-full opacity-0'
              />
            </div>
            <div className='border-primary relative col-span-1 row-span-1 rounded-md border'>
              <AddIcon className='absolute left-1/2 top-1/2 w-14 -translate-x-1/2 -translate-y-1/2' />
              <p className='font-title text-placeholder/50 absolute bottom-0 right-0 order-1 w-12 translate-y-2 overflow-hidden text-8xl'>{`4`}</p>
              <input
                {...register('picture')}
                type='file'
                accept='.jpg, .jpeg, .webp, .png'
                name='picture'
                className='h-full w-full opacity-0'
              />
            </div>
            <div className='border-primary relative col-span-1 row-span-1 rounded-md border'>
              <AddIcon className='absolute left-1/2 top-1/2 w-14 -translate-x-1/2 -translate-y-1/2' />
              <p className='font-title text-placeholder/50 absolute bottom-0 right-0 w-12 translate-y-2 overflow-hidden text-8xl'>{`5`}</p>

              <input
                {...register('picture')}
                type='file'
                accept='.jpg, .jpeg, .webp, .png'
                name='picture'
                className='h-full w-full opacity-0'
              />
            </div>
            <div className='border-primary relative col-span-1 row-span-1 rounded-md border'>
              <AddIcon className='absolute left-1/2 top-1/2 w-14 -translate-x-1/2 -translate-y-1/2' />
              <p className='font-title text-placeholder/50 absolute bottom-0 right-0 order-2 w-12 translate-y-2 overflow-hidden text-8xl'>{`6`}</p>
              <input
                {...register('picture')}
                type='file'
                accept='.jpg, .jpeg, .webp, .png'
                name='picture'
                className='h-full w-full opacity-0'
              />
            </div>
          </div>
        </form>
      </FormContainer>
    </FormLayout>
  );
}
