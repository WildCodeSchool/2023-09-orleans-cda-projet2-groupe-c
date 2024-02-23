import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

import Button from '../Button';
import BackgroundCircleIcon from '../icons/BackgroundCircleIcon';
import CrossIcon from '../icons/CrossIcon';
import MatchingIcon from '../icons/MatchingIcon';

const moveVariant = {
  hidden: {
    opacity: 0,
    scale: [0, 0],
  },
  visible: (value: number) => ({
    opacity: 1,
    scale: [0, 1.5, 1],
    transition: {
      delay: value * 0.5,
      duration: 0.8,
      type: 'spring',
      bounce: 0.5,
      stiffness: 700,
      damping: 8.5,
    },
  }),
};

export default function MatchingCard() {
  return (
    <div className={`absolute z-50 h-[calc(100vh-56px)] w-full`}>
      <div className='absolute z-40'>
        <Confetti />
      </div>
      <div className='bg-gradient relative h-full w-full overflow-hidden'>
        <button
          type='button'
          className='absolute right-5 top-5 z-50 cursor-pointer'
        >
          <CrossIcon className='w-8' />
        </button>
        <div className='absolute left-1/2 top-[28rem] h-[2500px] w-[2500px] origin-center -translate-x-1/2 -translate-y-[60%]'>
          <BackgroundCircleIcon className='animate-spin-infinite z-30 h-full  w-full fill-slate-50 opacity-10' />
        </div>
        <div className='relative z-30 mx-auto flex h-full w-full max-w-[500px] flex-col justify-between px-3 pb-14 pt-28'>
          <div className='flex w-full flex-col items-center'>
            <motion.img
              src='../../public/images/users-pictures/man-1.webp'
              alt=''
              className='h-48 w-48 rounded-full shadow-md'
              variants={moveVariant}
              initial='hidden'
              animate='visible'
              custom='1.2'
            />
            <div className='relative z-30 -translate-y-20'>
              <motion.div
                variants={moveVariant}
                initial='hidden'
                animate='visible'
                custom='1.4'
              >
                <MatchingIcon className='fill-white' />
              </motion.div>
            </div>
            <div className='w-full -translate-y-40'>
              <motion.div
                className='bg-light font-base flex h-44 w-full flex-col items-center justify-center gap-2 rounded-lg p-7 shadow-md'
                variants={moveVariant}
                initial='hidden'
                animate='visible'
                custom='1.6'
              >
                <h2 className='text-secondary'>{'You have a matching with'}</h2>
                <h2 className='text-secondary text-3xl'>{'Maria'}</h2>
              </motion.div>
            </div>
          </div>
          <div className='relative z-40 flex w-full justify-center'>
            <Button type='submit' isOutline={false}>{`Send a message`}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
