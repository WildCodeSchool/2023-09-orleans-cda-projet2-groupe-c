import { motion } from 'framer-motion';

import { useInteraction } from '../../contexts/InteractionContext';
import BulletBase from '../BulletBase';
import LikeIcon from '../icons/LikeIcon';
import NextIcon from '../icons/NextIcon';
import SuperLikeIcon from '../icons/SuperLikeIcon';

const interactionVariants = {
  visible: {
    scale: [1, 1.15, 1.15, 1.15, 1],
    rotate: [0, -5, 5, -5, 0],
    transition: {
      duration: 1,
      ease: 'easeInOut',
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: 2,
    },
  },
};

export default function Interactions() {
  const { handleInteraction, superLikesCount } = useInteraction();

  return (
    <div className='flex justify-center'>
      <div className='flex w-full max-w-[500px] items-center justify-between px-5'>
        <BulletBase
          size='20'
          onClick={() => {
            handleInteraction('next');
          }}
        >
          <NextIcon className='fill-next w-10' />
        </BulletBase>

        <BulletBase
          size='16'
          onClick={() => {
            handleInteraction('superlike');
          }}
          disabled={superLikesCount > 0 ? false : true} // Disable the button if superLikesCount is 0
        >
          <motion.div
            variants={interactionVariants}
            animate={superLikesCount > 0 ? 'visible' : undefined} // Disable the animation if superLikesCount is 0
            className='relative flex items-center justify-center'
          >
            <SuperLikeIcon className='w-10 fill-[#59C3FF]' />
            <p className='font-title text-light absolute translate-y-[4px] text-sm font-black'>
              {superLikesCount}
            </p>
          </motion.div>
        </BulletBase>

        <BulletBase
          size='20'
          onClick={() => {
            handleInteraction('like');
          }}
        >
          <LikeIcon className='fill-primary w-12' />
        </BulletBase>
      </div>
    </div>
  );
}
