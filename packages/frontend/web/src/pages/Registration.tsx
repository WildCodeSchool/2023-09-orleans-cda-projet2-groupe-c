import { Outlet } from 'react-router-dom';

import Loading from '@/components/Loading';
import { useAuth } from '@/contexts/AuthContext';

export default function Registration() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className='text-light h-screen w-screen overflow-hidden p-5'>
      <Outlet />
    </main>
  );
}
