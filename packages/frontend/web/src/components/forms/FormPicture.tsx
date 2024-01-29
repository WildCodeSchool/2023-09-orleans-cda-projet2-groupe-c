import { type SubmitHandler, useForm } from 'react-hook-form';

const API_URL = import.meta.env.VITE_API_URL;

interface FormPictureBody {
  picture: FileList;
}

export default function FormPicture() {
  const { register, handleSubmit, getValues } = useForm<FormPictureBody>();

  console.log('value :', getValues());

  const onSubmit: SubmitHandler<FormPictureBody> = (data) => {
    console.log('data :', data.picture[0].name);

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

  return (
    <div>
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
