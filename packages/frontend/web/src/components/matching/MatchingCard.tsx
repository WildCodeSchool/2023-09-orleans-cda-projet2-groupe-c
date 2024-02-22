import BackgroundCircleIcon from '../icons/BackgroundCircleIcon';

export default function MatchingCard() {
  return (
    <div className={`absolute z-[99] h-full w-full`}>
      <div className="relative h-full w-full items-center overflow-hidden bg-[url('../../public/images/matching/background.png')] bg-cover bg-center">
        <div className='relative z-50 mx-auto mt-24 flex h-[70%] w-full max-w-[500px] justify-center'>
          <img
            src='../../public/images/users-pictures/man-1.webp'
            alt=''
            className='h-56 w-56 rounded-full'
          />
        </div>
        <div className='-translate-x-[4625px] -translate-y-[65%] h-[5000px] w-[5000px]'>
          <BackgroundCircleIcon className='absolute left-1/2 top-56 z-40 h-full w-full  fill-gray-400 opacity-40 animate-spin-infinite' />
        </div>
      </div>
    </div>
  );
}
