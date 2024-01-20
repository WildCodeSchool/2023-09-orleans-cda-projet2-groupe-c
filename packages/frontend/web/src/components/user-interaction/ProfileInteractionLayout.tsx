import { AnimatePresence, motion } from 'framer-motion';

import ProfileCard from '@/components/user-interaction/ProfileCard';
import ProfileHeader from '@/components/user-interaction/ProfileHeader';
import useUsersInteractions from '@/hooks/use-users-interactions';

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 200,
  },
  visible: (value: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      duration: 0.5,
      delay: value * 0.1,
    },
  }),
  exit: (value: number) => ({
    opacity: 0,
    y: 200,
    transition: {
      type: 'spring',
      duration: 0.5,
      delay: value * 0.1,
    },
  }),
};

export default function ProfileInteractionLayout() {
  const { interactionsSent, isVisible, handleClick } = useUsersInteractions();

  return (
    <section className='lg:mx-auto lg:max-w-[1200px]'>
      <ProfileHeader handleClick={handleClick} isVisible={isVisible} />

      <div className='mx-5 my-10'>
        <AnimatePresence mode='popLayout'>
          {isVisible && interactionsSent.length > 0 ? (
            <motion.div
              key='interactionsSent' // AnimatePresence need this unique key to detecte entry and exit animation
              className='font-base grid grid-cols-2 gap-2 text-white md:grid-cols-3 lg:grid-cols-4'
            >
              {interactionsSent.map((interaction, index) => (
                <motion.div
                  key={interaction.id}
                  variants={cardVariants}
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                  custom={index % interactionsSent.length}
                >
                  <ProfileCard interaction={interaction} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p>{`No interactions.`}</p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
