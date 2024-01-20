import { Outlet } from 'react-router-dom';

export default function HomeCards() {
  return (
    <div className='z-50'>
      <Outlet />
    </div>
  );
}
