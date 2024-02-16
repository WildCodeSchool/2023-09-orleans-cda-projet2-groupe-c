import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { useConversation } from '@/contexts/ConversationContext';

import DateComponent from './DateComponent';

const modalVariant = {
  hidden: {
    opacity: 0,
    x: '-100%',
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 150,
    },
  },
  exit: {
    opacity: 0,
    x: '-100%',
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 150,
      duration: 1,
    },
  },
};

export default function ConversationsList() {
  const {
    isVisible,
    setIsVisible,
    conversationsList,
    messagesCount,
    selectedConversation,
  } = useConversation();

  const { userId } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setIsVisible]);

  return (
    <div>
      <AnimatePresence mode='wait'>
        {isVisible ? (
          <motion.div
            initial='hidden'
            animate='visible'
            exit='exit'
            key='modal-message'
            variants={modalVariant}
            className='font-base text-secondary bg-light-medium border-divider absolute left-0 top-0 z-50 h-full w-full lg:block lg:w-[25%] lg:border-r'
          >
            <div className='my-5 flex justify-center'>
              <h2 className='font-title text-primary text-2xl'>{`Conversation`}</h2>
            </div>
            <div className='flex items-center gap-1'>
              <p className='pl-4'>{`Messages`}</p>
              <span className='bg-primary flex h-4 w-4 items-center justify-center rounded-full text-sm text-white'>
                {messagesCount}
              </span>
            </div>
            <div className='mx-4 my-3 flex flex-col gap-[2px] overflow-hidden rounded-lg shadow-lg'>
              {conversationsList && conversationsList.length > 0 ? (
                conversationsList.map((conversation) => {
                  return (
                    <div
                      key={conversation.conversation_id}
                      onClick={() => {
                        selectedConversation(conversation.conversation_id);
                      }}
                      className='bg-light flex w-full items-stretch justify-between gap-4 p-4'
                    >
                      <div className='flex w-full items-center gap-2 overflow-hidden'>
                        <div className='h-14 w-14 shrink-0 overflow-hidden rounded-full'>
                          <img
                            src={
                              userId === conversation.user_1.id
                                ? conversation.user_2.picture_path
                                : conversation.user_1.picture_path
                            }
                            // alt={`Picture of ${conversation.receiver[0].receiver_name}`}
                          />
                        </div>
                        <div className='flex grow flex-col gap-2 overflow-hidden'>
                          <p className='text-primary truncate text-lg'>
                            {userId === conversation.user_1.id
                              ? conversation.user_2.name
                              : conversation.user_1.name}
                          </p>
                          <div className='w-full'>
                            <p className='truncate text-sm'>
                              {Boolean(conversation.messages)
                                ? conversation.messages.content
                                : "Aucun message pour l'instant. Lancez-vous et envoyez le premier message !"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='flex w-24 items-end justify-end '>
                        <div className='self shrink-0 text-right text-sm'>
                          <DateComponent
                            date={
                              conversation.messages
                                ? conversation.messages.sent_at
                                : ''
                            }
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className='p-4 text-sm'>{`You have no messages.`}</p>
              )}
            </div>
          </motion.div>
        ) : undefined}
      </AnimatePresence>
    </div>
  );
}
