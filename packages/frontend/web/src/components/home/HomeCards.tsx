import { useEffect, useState } from 'react';

import type { User } from '@app/shared';

import Loading from '../Loading';
import Card from './Card';

const API_URL = import.meta.env.VITE_API_URL;

export default function HomeCards({
  userId,
}: {
  readonly userId: number | undefined;
}) {
  const [selectedUser, setSelectedUser] = useState<User>();

  // Fetch the user
  useEffect(() => {
    if (userId === undefined) {
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchUsers = async () => {
      const res = await fetch(`${API_URL}/users/${userId}`, {
        signal,
      });

      const data = await res.json();

      setSelectedUser(data[0]);
    };

    fetchUsers().catch((error) => {
      throw new Error(`Failed to fetch users: ${String(error)}`);
    });

    return () => {
      controller.abort();
    };
  }, [userId]);

  if (!selectedUser) {
    return <Loading />;
  }

  return (
    <div className='font-base mx-auto flex h-[calc(100vh-55px)] w-full max-w-[500px] flex-col justify-between gap-5 overflow-y-auto px-5 py-10 text-white'>
      <Card user={selectedUser} />
      <div className='h-[100px] bg-red-500'>
        <p>{`Buttons`}</p>
      </div>
    </div>
  );
}
