import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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
};

export default function ConversationsList() {
  const { conversationsList, messagesCount, selectedConversation } =
    useConversation();
  const navigate = useNavigate();

  const { userId } = useAuth();

  return (
    <motion.div
      variants={modalVariant}
      initial='hidden'
      animate='visible'
      className='text-secondary mx-auto flex h-[calc(100vh-56px)] max-h-[calc(100vh-56px)] w-full max-w-[500px] flex-col px-3 pb-4 pt-2 lg:mx-0 lg:max-w-full'
    >
      <div className='my-5 flex justify-center'>
        <h2 className='font-title text-primary text-2xl'>{`Conversation`}</h2>
      </div>
      <div className='flex items-center gap-1'>
        <p>{`Messages`}</p>
        <span className='bg-primary flex h-4 w-4 items-center justify-center rounded-full text-sm text-white'>
          {messagesCount}
        </span>
      </div>
      <div className='my-3 flex flex-col gap-[2px] overflow-hidden rounded-lg shadow-lg'>
        {conversationsList && conversationsList.length > 0 ? (
          conversationsList.map((conversation) => {
            return (
              <div
                key={conversation.conversation_id}
                onClick={() => {
                  selectedConversation(conversation.conversation_id);
                  navigate(
                    `/users/${userId}/conversations/${conversation.conversation_id}`,
                  );
                }}
                className='bg-light flex w-full items-stretch justify-between gap-4 px-4 py-2'
              >
                <div className='flex w-full items-center gap-2 overflow-hidden py-1'>
                  <div className='h-12 w-12 shrink-0 overflow-hidden rounded-full'>
                    <img
                      src={
                        userId === conversation.user_1.id
                          ? conversation.user_2.picture_path
                          : conversation.user_1.picture_path
                      }
                      alt={`Picture of user`}
                    />
                  </div>
                  <div className='flex grow flex-col overflow-hidden'>
                    <p className='text-primary truncate text-lg'>
                      {userId === conversation.user_1.id
                        ? conversation.user_2.name
                        : conversation.user_1.name}
                    </p>
                    <div className='w-full'>
                      <p className='w-full truncate text-sm'>
                        {Boolean(conversation.messages)
                          ? conversation.messages.content
                          : 'No message! Send the first message!'}
                      </p>
                    </div>
                  </div>
                </div>

                {Boolean(conversation.messages) ? (
                  <div className='mb-1 flex w-24 items-end justify-end'>
                    <div className='self shrink-0 text-right text-sm'>
                      <DateComponent
                        date={
                          Boolean(conversation.messages)
                            ? conversation.messages.sent_at
                            : ''
                        }
                      />
                    </div>
                  </div>
                ) : undefined}
              </div>
            );
          })
        ) : (
          <p className='bg-light p-4 text-sm'>{`You have no messages.`}</p>
        )}
      </div>
    </motion.div>
  );
}
