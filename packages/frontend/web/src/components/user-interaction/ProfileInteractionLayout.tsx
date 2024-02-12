/* eslint-disable unicorn/no-nested-ternary */
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ProfileCard from '@/components/user-interaction/ProfileCard';
import ProfileHeader from '@/components/user-interaction/ProfileHeader';
import { useAuth } from '@/contexts/AuthContext';
import { useUsersInteractions } from '@/contexts/UsersInteractionsContext';

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
};

export default function ProfileInteractionLayout() {
  // Get the states and function from the context "UsersInteractionsContext"
  const { interactionsSent, interactionsReceived, isVisible, handleClick } =
    useUsersInteractions();

  // Get the user id JWT from the context
  const { userId } = useAuth();

  // Get the profile id from the URL
  const { profileId } = useParams();

  // Hook to navigate to another page
  const navigate = useNavigate();

  // Check if the user is allowed to see this page
  useEffect(() => {
    if (userId !== Number(profileId)) {
      navigate('/error');
    }
  }, [userId, profileId, navigate]);

  return (
    <section className='h-full w-full'>
      <ProfileHeader handleClick={handleClick} isVisible={isVisible} />

      <div className='mx-auto my-10 px-5 lg:max-w-[1000px] lg:px-0'>
        <div className='font-base grid grid-cols-2 gap-2 text-white md:grid-cols-3 lg:grid-cols-4'>
          {/* If is visible, display the interactions sent */}
          {isVisible ? (
            // If there is at least one interaction, display the interactions sent to users
            interactionsSent.length > 0 ? (
              interactionsSent.map((interaction, index) => (
                <motion.div
                  key={interaction.id}
                  variants={cardVariants}
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                  custom={index % interactionsSent.length}
                >
                  <ProfileCard
                    interaction={interaction}
                    isVisible={isVisible}
                  />
                </motion.div>
              ))
            ) : (
              // If there is no interaction sent, display a message
              <p className='text-secondary absolute'>{`You have interacted with no users.`}</p>
            )
          ) : // Else display the interactions received
          // If there is at least one interaction, display the interactions received from users
          interactionsReceived.length > 0 ? (
            interactionsReceived.map((interaction, index) => (
              <motion.div
                key={interaction.id}
                variants={cardVariants}
                initial='hidden'
                animate='visible'
                custom={index % interactionsSent.length}
              >
                <ProfileCard interaction={interaction} isVisible={isVisible} />
              </motion.div>
            ))
          ) : (
            // If there is no interaction received, display a message
            <p className='text-secondary absolute'>{`No users have interacted with you.`}</p>
          )}
        </div>
      </div>
    </section>
  );
}
