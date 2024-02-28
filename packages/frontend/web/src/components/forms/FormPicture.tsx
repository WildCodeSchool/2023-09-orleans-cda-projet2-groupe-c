import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { type PictureBody, pictureBodySchema } from '@app/shared';

import AddIcon from '../icons/AddIcon';
import FormContainer from './FormContainer';

interface FormPictureBody {
  picture_1: FileList;
  picture_2: FileList;
  picture_3: FileList;
  picture_4: FileList;
  picture_5: FileList;
  picture_6: FileList;
}

const pictureInputs = [
  {
    register: 'picture_1',
  },
  {
    register: 'picture_2',
  },
  {
    register: 'picture_3',
  },
  {
    register: 'picture_4',
  },
  {
    register: 'picture_5',
  },
  {
    register: 'picture_6',
  },
];

export default function FormPicture() {
  const { register, formState } = useFormContext<FormPictureBody>();

  const { errors } = formState;

  // State to store the preview pictures
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // Function that creates a preview of the downloaded pictures
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.target.files && Boolean(event.target.files[0])) {
      // Create a URL for the file to display the picture in the navigator
      const url = URL.createObjectURL(event.target.files[0]);

      // Set the preview URL
      setPreviewUrls((prev) => {
        // Create a new array with the previous pictures
        const newUrls = [...prev];

        // Set the preview URL with the new picture
        newUrls[index] = url;

        return newUrls;
      });
    }
  };

  return (
    <FormContainer title='My photos...'>
      <p className='flex justify-start pb-8'>
        {'You must have a mandatory profile photo.'}
      </p>
      <div className='row-span-3 mx-auto mt-4 grid h-[89vw] max-h-[460px] w-full grid-cols-3 grid-rows-3 gap-2'>
        {pictureInputs.map((input, index) => {
          // Disable the input if the previous picture is not uploaded
          const isDisabled = index > 0 && !previewUrls[index - 1];

          return (
            <div
              key={input.register}
              className={`border-primary relative rounded-md border ${input.register === 'picture_1' ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'} ${isDisabled ? 'opacity-20' : 'opacity-100'}`}
            >
              {input.register === 'picture_1' ? (
                <p className='font-base text-secondary absolute -top-6 left-1/2 -translate-x-1/2'>{`Profile photo`}</p>
              ) : undefined}

              <AddIcon className='absolute left-1/2 top-1/2 z-20 w-10 -translate-x-1/2 -translate-y-1/2' />
              <p
                className={`font-title text-placeholder/50 absolute bottom-0 z-20 translate-y-2 ${input.register === 'picture_1' ? 'right-5 text-9xl' : 'right-0 w-12 overflow-hidden text-8xl'}`}
              >
                {index + 1}
              </p>

              {/* Preview Picture */}
              {Boolean(previewUrls[index]) ? (
                <div className='absolute z-30 h-full w-full overflow-hidden rounded-md'>
                  <img
                    src={previewUrls[index]}
                    alt='Preview'
                    className='h-full w-full object-cover'
                  />
                </div>
              ) : undefined}

              {/* 6 picture inputs */}
              <input
                {...register(input.register as PictureBody, {
                  validate: (value) => {
                    const result =
                      pictureBodySchema.shape[
                        input.register as PictureBody
                      ].safeParse(value);

                    if (!result.success) {
                      return result.error.errors[0].message;
                    }

                    return true;
                  },
                })}
                type='file'
                accept='.jpg, .jpeg, .webp, .png'
                name={input.register}
                className='relative z-40 h-full w-full opacity-0'
                onChange={(event) => {
                  handleFileChange(event, index);
                }}
                disabled={isDisabled}
              />
            </div>
          );
        })}
      </div>

      {/* Errors Messages */}
      {pictureInputs.map((input) => {
        return Boolean(errors[input.register as PictureBody]) ? (
          <p className='text-primary mt-2' key={input.register}>
            {errors[input.register as PictureBody]?.message}
          </p>
        ) : undefined;
      })}
    </FormContainer>
  );
}
