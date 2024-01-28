import { useEffect, useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';

import CrossIcon from '../icons/CrossIcon';
import SendIcon from '../icons/SendIcon';

export default function Conversation() {
  const { userId } = useAuth();
  const [users, setUsers] = useState();
  console.log(users);

  console.log(users?.receiver.name);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userId}/messages/1`,
        {
          signal: controller.signal,
          credentials: 'include',
        },
      );
      const data = await response.json();
      setUsers(data[0]);
    })();

    return () => {
      controller.abort();
    };
  }, [userId]);

  return (
    <div className='absolute right-0 z-50 ml-auto flex h-[calc(100vh-56px)] w-[75%] bg-red-700'>
      <div className='h-full w-full flex-grow bg-blue-600'>
        <div className='flex h-14 w-full items-center justify-between bg-[#3f436a] p-3'>
          <div className='flex items-center gap-3 text-white'>
            <img
              src={users?.receiver.picture_path}
              alt=''
              className='h-9 w-9 rounded-full'
            />
            <p>{users?.receiver?.name}</p>
          </div>
          <div>
            <CrossIcon className='h-5 fill-white' />
          </div>
        </div>
        <div className='flex h-[calc(100%-3.5rem)] w-full flex-col gap-5 bg-green-900 p-3'>
          <div className='h-full w-full overflow-y-auto bg-red-600'>
            <div
              className={`flex flex-col-reverse gap-6 overflow-y-auto bg-slate-500`}
            >
              <div className='h-12 w-1/2  bg-indigo-900' />
              <div className='h-12 w-1/2 bg-white' />
              <div className='h-12 w-1/2 bg-indigo-900' />
              <div className='h-12 w-1/2 bg-white' />
              <div className='h-12 w-1/2 bg-indigo-900' />
              <div className='h-12 w-1/2 bg-white' />
              <div className='h-12 w-1/2 bg-indigo-900' />
              <div className='h-12 w-1/2 bg-white' />
              <div className='h-12 w-1/2 bg-indigo-900' />
              <div className='h-12 w-1/2 bg-white' />
              <div className='h-12 w-1/2 bg-indigo-900' />
              <div className='h-12 w-1/2 bg-white' />
              <div className='h-12 w-1/2 bg-indigo-900' />
              <div className='h-12 w-1/2 bg-white' />
              <div className='h-12 w-1/2 bg-indigo-900' />
              <div className='h-12 w-1/2 bg-white' />
              <div className='h-12 w-1/2 bg-indigo-900' />
              <div className='h-12 w-1/2 bg-white' />
              <div className='h-12 w-1/2 bg-indigo-900' />
              <div className='h-12 w-1/2 bg-white' />
              <div className='h-12 w-1/2 bg-indigo-900' />

              {/* bullet  */}
              <div className='m-2 flex flex-row-reverse items-center gap-3'>
                <p>yolo</p>

                <div className='min-w-1/2 min-h-12 max-w-[75%] break-words rounded-2xl bg-white p-3'>
                  <p className=''>
                    yololllllllllllllllllllllllllllllllllll
                    llllllllllllllllllllllllllllllllllllllllllllllllllllll
                    lllllllllllllllllllllllllllllliiiiiiiiiiiiiiiiiiiiiiiiiiiii
                    iiiiiiiiiii iiiiiiiiiiiiiMMMMMMMMMMMMMMMM MMMMMMMMMMMMM
                    MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM MMMMMMMMMM
                    MMMMMMMMMMMMMMMMMMMMM
                  </p>
                  <div className='text-placeholder pt-1'>
                    <p>coucou</p>
                  </div>
                </div>
                {/* bullet  */}
              </div>
            </div>
          </div>

          {/*  text */}

          <form
            action=''
            className='relative flex h-10 w-full items-center bg-black'
          >
            <textarea
              className='flex h-full w-full resize-none items-center rounded-l-full border-none bg-white pl-4 pt-2 outline-none'
              placeholder='Aa'
            />
            <div className='bg-light flex h-full w-12 items-center justify-center rounded-r-full'>
              <SendIcon className='fill-light h-full' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
