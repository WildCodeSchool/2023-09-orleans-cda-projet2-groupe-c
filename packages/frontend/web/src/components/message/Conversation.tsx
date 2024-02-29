import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { type MessageValidation, messageSchema } from '@app/shared';

import { useConversation } from '@/contexts/ConversationContext';

import CrossIcon from '../icons/CrossIcon';
import SendIcon from '../icons/SendIcon';
import BulletConversation from './BulletConversation';

export default function Conversation() {
  const {
    userId,
    conversation,
    setIsVisibleConversation,
    selectedConversation,
    fetchMessage,
    scrollToBottom,
    messagesEndReference,
  } = useConversation();

  const { register, handleSubmit, reset } = useForm<MessageValidation>({
    resolver: zodResolver(messageSchema),
  });

  const [error, setError] = useState<string>();

  const navigate = useNavigate();

  const handleCloseConversation = () => {
    if (window.innerWidth < 1024) {
      setIsVisibleConversation(true);
      navigate('/');
    } else {
      navigate('/');
    }
  };

  const formSubmit = useCallback(
    async (data: MessageValidation) => {
      try {
        await fetch(
          `/api/users/${userId}/conversations/${conversation?.conversation_id}/message`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          },
        );
      } catch {
        setError('An error occurent when you send messages');
      } finally {
        reset();
      }
    },
    [conversation?.conversation_id, reset, userId],
  );

  // Fetch all messages from a conversation with a interval
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    void fetchMessage({ signal });

    const interval = setInterval(() => {
      fetchMessage({ signal }).catch((error) => {
        throw new Error(`${String(error)}`);
      });
    }, 1100);

    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, [fetchMessage]);

  useEffect(() => {
    setTimeout(scrollToBottom, 50);
  }, [scrollToBottom, selectedConversation]);

  // Get the current user
  const currentUser =
    conversation?.user_1.id === userId
      ? conversation?.user_1
      : conversation?.user_2;

  return (
    <div className='bg-light-medium ml-auto flex h-[calc(100vh-56px)] w-full lg:w-[75%]'>
      <div className='h-full w-full flex-grow'>
        <div className='flex h-14 w-full items-center justify-between bg-[#3f436a] p-3'>
          <div className='flex items-center gap-3 text-white'>
            <img
              src={
                userId === conversation?.user_1.id
                  ? conversation?.user_2.picture_path
                  : conversation?.user_1.picture_path
              }
              alt=''
              className='h-9 w-9 rounded-full shadow-md'
            />
            <p>
              {userId === conversation?.user_1.id
                ? conversation?.user_2.name
                : conversation?.user_1.name}
            </p>
          </div>
          <button type='button' onClick={handleCloseConversation}>
            <CrossIcon className='h-5 cursor-pointer fill-white' />
          </button>
        </div>
        <div className='flex h-[calc(100%-3.5rem)] w-full flex-col gap-5'>
          <div className='h-full w-full overflow-auto'>
            <div className='flex h-full flex-col justify-end'>
              <div className='flex flex-col gap-6 overflow-auto pb-2'>
                {Boolean(error) ? (
                  <p>{error}</p>
                ) : (
                  conversation?.messages.map((message, index, array) => (
                    <div
                      key={message.id}
                      ref={
                        index === array.length - 1
                          ? messagesEndReference
                          : undefined
                      }
                      className={`$ flex w-full items-end gap-3 px-7 ${message.sender_name === currentUser?.name ? 'flex-row-reverse' : ''}`}
                    >
                      <BulletConversation
                        imageUrl={
                          message.sender_name === conversation.user_1.name
                            ? conversation.user_1.picture_path
                            : conversation.user_2.picture_path
                        }
                        text={message.content}
                        date={new Date(message.sent_at)}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(formSubmit)}
            className='relative mb-5 flex h-10 w-full items-center px-7'
          >
            <input
              type='text'
              className='text-secondary bg-light flex h-full w-full resize-none items-center rounded-l-full pl-4 pt-1 shadow-md outline-none'
              placeholder='Aa'
              {...register('content')}
            />
            <div className='bg-light flex h-full w-12 items-center justify-center rounded-r-full shadow-md'>
              <button type='submit'>
                <SendIcon className='fill-light h-full cursor-pointer' />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
