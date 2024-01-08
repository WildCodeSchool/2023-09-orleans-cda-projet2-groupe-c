import { useEffect, useState } from 'react';

// import { useAuth } from '@/contexts/AuthContext';

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

export default function Message() {
  const [conversations, setConversations] = useState<Conversation[]>();
  const [messagesCount, setMessagesCount] = useState<number>(0);
  const [date, setDate] = useState<Date>();

  //   const { userId } = useAuth();
  const userId = 341;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchConversations = async () => {
      const res = await fetch(`${API_URL}/users/${userId}/messages`, {
        signal,
      });

      const data = await res.json();

      setConversations(data);
    };

    fetchConversations().catch((error) => {
      throw new Error(`Failed to fetch messages: ${String(error)}`);
    });

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (conversations !== undefined) {
      setMessagesCount(conversations.length);
    }
  }, [conversations]);

  if (conversations !== undefined) {
    console.log(conversations[0].receiver[0]);
    return (
      <div className='font-base text-secondary bg-light-medium absolute left-0 top-0 z-50 h-full w-full'>
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
          {conversations.map((conversation) => {
            return (
              <div
                key={conversation.conversation_id}
                className='bg-light flex items-center justify-between px-2 py-4'
              >
                <div className='flex items-center gap-4'>
                  <div className='h-12 w-12 overflow-hidden rounded-full'>
                    <img src={conversation.receiver[0].picture_path} alt='' />
                    {/* <img
                      src='/images/avatar-placeholder.png'
                      alt=''
                      className='h-full w-full object-cover'
                    /> */}
                  </div>
                  <p className='text-sm'>{conversation.messages[0].content}</p>
                </div>
                <div>
                  <p className='text-sm'>{conversation.messages[0].sent_at}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
