import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useConversation } from '@/contexts/ConversationContext';

import CrossIcon from '../icons/CrossIcon';
import SendIcon from '../icons/SendIcon';
import BulletConversation from './BulletConversation';

interface User {
  id: number;
  name: string;
  picture_path: string;
}

interface Message {
  id: number;
  content: string;
  sent_at: Date;
  sender_name: string;
}

interface Conversation {
  conversation_id: number;
  sender: User;
  receiver: User;
  messages: Message[];
}

export default function Conversation() {
  const { userId, conversation, setIsVisible, error } = useConversation();

  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate();

  const messageEndReference = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messageEndReference.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const handleCloseConversation = () => {
    if (window.innerWidth < 1024) {
      setIsVisible(true);
    } else {
      navigate('/');
    }
  };
  const formSubmit = async (data: { content?: Message['content'] }) => {
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userId}/conversations/${conversation?.conversation_id}/message`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(data),
        },
      );
    } catch (error) {
      throw new Error(`${String(error)}`);
    }
    reset();
  };

  return (
    <div className='bg-light-medium ml-auto flex h-[calc(100vh-56px)] w-full lg:w-[75%]'>
      <div className='h-full w-full flex-grow'>
        <div className='flex h-14 w-full items-center justify-between bg-[#3f436a] p-3'>
          <div className='flex items-center gap-3 text-white'>
            <img
              src={conversation?.receiver.picture_path}
              alt=''
              className='h-9 w-9 rounded-full shadow-md'
            />
            <p>{conversation?.receiver.name}</p>
          </div>
          <div>
            <CrossIcon
              onClick={handleCloseConversation}
              className='h-5 cursor-pointer fill-white'
            />
          </div>
        </div>
        <div className='flex h-[calc(100%-3.5rem)] w-full flex-col gap-5'>
          <div className='h-full w-full overflow-y-auto'>
            <div className='flex h-full flex-col justify-end gap-6 overflow-y-auto pb-2'>
              {Boolean(error) ? (
                <p>{error}</p>
              ) : (
                conversation?.messages.map((message) => (
                  <div
                    key={message.id}
                    ref={messageEndReference}
                    className={`$ flex w-full items-end gap-3 px-7 ${message.sender_name === conversation.sender.name ? 'flex-row-reverse' : ''}`}
                  >
                    <BulletConversation
                      imageUrl={
                        message.sender_name === conversation.sender.name
                          ? conversation.sender.picture_path
                          : conversation.receiver.picture_path
                      }
                      texte={message.content}
                      date={new Date(message.sent_at)}
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          <form
            onSubmit={handleSubmit(formSubmit)}
            className='relative mb-5 flex h-10 w-full items-center px-7'
          >
            <input
              className='text-secondary bg-light flex h-full w-full resize-none items-center rounded-l-full pl-4 pt-2 shadow-md outline-none'
              placeholder='Aa'
              {...register('content')}
              required
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
