import { type SubmitHandler, useForm } from 'react-hook-form';

const API_URL = import.meta.env.VITE_API_URL;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface FormPictureBody {
  picture: FileList;
}

const onSubmit: SubmitHandler<FormPictureBody> = (data) => {
  //
  const formData = new FormData();
  formData.append('picture', data.picture[0]);

  const uploadPicture = async () => {
    await fetch(`${API_URL}/registration/upload`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
  };

  uploadPicture().catch(() => {
    throw new Error('Fail to upload picture.');
  });
};

export default function FormPicture() {
  const { register, handleSubmit } = useForm<FormPictureBody>();

  return (
    <div>
      <img
        src={`${BACKEND_URL}/uploads/a014d44c-56a1-4ef1-9f91-1a0476f284ac-20231209_131738.jpg`}
        alt='photo test'
        className='h-40 w-40'
      />
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
