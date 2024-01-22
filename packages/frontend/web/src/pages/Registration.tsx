import { Navigate, Outlet } from 'react-router-dom';

import Loading from '@/components/Loading';
import { useAuth } from '@/contexts/AuthContext';

export default function Registration() {
  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (isLoggedIn) {
    return <Navigate to='/' />;
  }

  return (
    <main className='text-light h-screen w-screen overflow-hidden p-5'>
      <Outlet />
    </main>
  );
}
