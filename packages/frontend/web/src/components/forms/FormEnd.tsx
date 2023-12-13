import CheckIcon from '../icons/CheckIcon';

export default function FormEnd() {
  return (
    <div className='font-base w-full pt-40'>
      <div className='text-primary font-title mb-8 flex text-2xl lg:justify-center lg:text-3xl'>
        <h1 className=''>{'PROFILE COMPLETE !'}</h1>
      </div>
      <div className='bg-light text-secondary flex flex-col items-center gap-8 rounded-md px-7 pb-12 pt-5 text-center text-sm shadow-md'>
        <CheckIcon className='text-primary mt-5 h-14' />
        <h2 className='w-64 text-xl lg:text-2xl'>
          {'Your Tindev profile is completed!'}
        </h2>
        <span className='text-sm md:text-base'>
          {
            'You can now take full advantage of the Tindev application! We wish you a pleasant experience!'
          }
        </span>
      </div>
    </div>
  );
}
