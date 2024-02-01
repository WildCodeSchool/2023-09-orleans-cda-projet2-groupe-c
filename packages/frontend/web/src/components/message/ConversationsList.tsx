import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

import { useConversation } from '@/contexts/ConversationContext';

import DateComponent from './DateComponent';

const API_URL = import.meta.env.VITE_API_URL;

interface Conversation {
  conversation_id: number;
  messages: {
    id: number;
    content: string;
    sent_at: string;
  }[];
  receiver: {
    id: number;
    picture_path: string;
    receiver_name: string;
  }[];
  sender: {
    id: number;
    picture_path: string;
    sender_name: string;
  }[];
}

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
/*   const [selectedId, setSelectedId] = useState<number>();

  const selectedConversation = (index: number,) => {
    if (conversationsList !== undefined) {
      setSelectedId(conversationsList[index].conversation_id);
    }
  }; */

  const {
    userId,
    isVisible,
    setIsVisible,
    selectedConversation, 
    conversationsList,
    messagesCount
  } = useConversation();

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
                conversationsList.map((conversation, index) => {
                  return (

                    <div
                      key={conversation.conversation_id}
                      onClick={() => {
                        selectedConversation(index);
                      }}
                      className='bg-light flex w-full items-stretch justify-between gap-4 p-4'
                    >
                      <div className='flex w-full items-center gap-2 overflow-hidden'>
                        <div className='h-14 w-14 shrink-0 overflow-hidden rounded-full'>
                          <img
                            src={conversation.receiver[0].picture_path}
                            alt={`Picture of ${conversation.receiver[0].receiver_name}`}
                          />
                        </div>
                        <div className='flex grow flex-col gap-2 overflow-hidden'>
                          <p className='text-primary truncate text-lg'>
                            {conversation.receiver[0].receiver_name}
                          </p>
                          <div className='w-full'>
                            <p className='truncate text-sm'>
                              {conversation.messages[0].content}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='flex w-24 items-end justify-end '>
                        <div className='self shrink-0 text-right text-sm'>
                          <DateComponent
                            date={conversation.messages[0].sent_at}
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
