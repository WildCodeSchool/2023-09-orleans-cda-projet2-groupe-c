import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

const API_URL = import.meta.env.VITE_API_URL;
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
      const res = await fetch(`${API_URL}/registration/upload`, {
        method: 'POST',
        credentials: 'include',
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
    <div>
      <img
        src={`${BACKEND_URL}/uploads/5feaa783-1b2b-44d7-a886-16b9fcad55d6-20231209_131738 (1).jpg`}
        alt='photo test'
        className='h-40 w-40'
      />
      <p className='text-red-500'>{error}</p>
      <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
        <input
          {...register('picture')}
          type='file'
          accept='.jpg, .jpeg, .webp, .png'
          name='picture'
        />
        <button type='submit'>{`Submit`}</button>
      </form>
    </div>
  );
}
