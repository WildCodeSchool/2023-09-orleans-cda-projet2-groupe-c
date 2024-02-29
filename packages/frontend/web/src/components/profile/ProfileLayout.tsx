import { Outlet } from 'react-router-dom';

export default function ProfileLayout() {
  return (
    <div className='font-base text-md relative flex w-full flex-col items-center justify-between gap-12 px-5 py-10'>
      <Outlet />
    </div>
  );
}
