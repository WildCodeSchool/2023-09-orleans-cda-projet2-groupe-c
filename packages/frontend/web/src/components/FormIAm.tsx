import { useFormContext } from 'react-hook-form';

type DefaultValues = {
  gender: string;
};
export default function FormIAm() {
  const { register, formState } = useFormContext<DefaultValues>();

  const { errors } = formState;

  return (
    <div className='m-auto w-[500px] flex-col items-center'>
      <h1 className='text-primary font-title mb-4 mt-40 justify-start text-2xl'>
        {'I AM...'}
      </h1>
      <div className='bg-light-light flex h-64 flex-col gap-3 rounded-md p-8 py-14 shadow-md'>
        <div className='border-primary inline-flex overflow-hidden rounded-sm border-2'>
          <label
            className='font-base text-secondary m-auto cursor-pointer p-2 checked:bg-black'
            htmlFor='man'
          >
            {'Man'}
          </label>
          <input
            className=' checked:bg-black'
            type='radio'
            id='man'
            {...register('gender')}
            value={'man'}
          />
        </div>
        <div className='border-primary inline-flex overflow-hidden rounded-sm border-2'>
          <label
            className={`font-base text-secondary m-auto cursor-pointer p-2`}
            htmlFor='woman'
          >
            {'Woman'}
          </label>
          <input
            className=' focus:bg-black'
            type='radio'
            id='woman'
            {...register('gender')}
            value={'woman'}
          />
        </div>
      </div>
    </div>
  );
}

{
  /* <div className='border-primary inline-flex overflow-hidden rounded-sm border-2'>
<label
  className="font-base text-secondary m-auto cursor-pointer p-2 checked:bg-black"
  htmlFor='man'
>
  {'Man'}
</label>
<input
  className='hidden checked:bg-black'
  type='radio'
  id='man'
  {...register('man', {
    required: 'Veuillez sélectionner votre genre',
  })}
/>
</div>
<div className='border-primary inline-flex overflow-hidden rounded-sm border-2'>
<label
  className={`font-base text-secondary m-auto cursor-pointer p-2`}
  htmlFor='woman'
>
  {'Woman'}
</label>
<input
  className='hidden focus:bg-black'
  type='radio'
  id='woman'
  {...register('woman', {
    required: 'Veuillez sélectionner votre genre',
  })}
/>
</div> */
}
