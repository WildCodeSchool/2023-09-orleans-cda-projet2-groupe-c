import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/contexts/AuthContext';

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
  const { userId } = useAuth();
  const [conversation, setConversation] = useState<Conversation>();
  const { register, handleSubmit, getValues } = useForm();
  console.log(getValues('content'));

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userId}/conversations/38`,
        {
          signal: controller.signal,
          credentials: 'include',
        },
      );
      const data = await response.json();
      setConversation(data[0]);
    })();

    return () => {
      controller.abort();
    };
  }, [userId]);

  const formSubmit = async (data: Message) => {
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userId}/conversations/38/message`,
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
  };

  return (
    <div className='bg-light-medium absolute right-0 z-50 ml-auto flex h-[calc(100vh-56px)] w-[75%]'>
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
            <CrossIcon className='h-5 cursor-pointer fill-white' />
          </div>
        </div>
        <div className='flex h-[calc(100%-3.5rem)] w-full flex-col gap-5'>
          <div className='h-full w-full overflow-y-auto'>
            <div className={`flex h-full flex-col gap-6 overflow-y-auto pb-2 `}>
              {conversation?.messages.map((message) => (
                <div
                  key={message.id}
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
              ))}
            </div>
          </div>

          <form
            /*   onSubmit={handleSubmit(formSubmit)} */
            action=''
            className='relative mb-5 flex h-10 w-full items-center px-7'
          >
            <textarea
              className='text-secondary bg-light flex h-full w-full resize-none items-center rounded-l-full border-none pl-4 pt-2 shadow-md outline-none'
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
