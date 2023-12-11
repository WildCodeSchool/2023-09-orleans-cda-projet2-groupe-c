import CheckIcon from '../icons/CheckIcon';

export default function FormEnd() {
  return (
    <div className='font-base w-full pt-40'>
      <div className='text-primary font-title mb-4 flex justify-center text-2xl lg:text-3xl'>
        <h1 className=''>{'PROFILE COMPLETE!'}</h1>
      </div>
      <div className='bg-light text-secondary flex flex-col items-center gap-8 rounded-md px-7 pb-12 pt-5 text-center text-sm shadow-md'>
        <CheckIcon className='text-primary h-14' />
        <h2 className='text-xl lg:text-3xl'>
          {'Your Tindev profile is completed!'}
        </h2>
        <span className='text-base md:text-xl'>
          {
            'You can now take full advantage of the Tindev application! We wish you a pleasant experience!'
          }
        </span>
      </div>
    </div>
  );
}
