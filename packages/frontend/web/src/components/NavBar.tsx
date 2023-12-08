import { Outlet } from 'react-router-dom';

import ThemeSwitcher from './ThemeSwitcher';
import FilterIcon from './icons/FilterIcon';
import LikeIcon from './icons/LikeIcon';
import LogoIcon from './icons/LogoIcon';
import MessageIcon from './icons/MessageIcon';
import UserIcon from './icons/UserIcon';

const dataIcon = [
  {
    id: 'user',
    icon: <UserIcon className='text-secondary h-4 w-4 md:h-6 md:w-6' />,
  },
  {
    id: 'like',
    icon: <LikeIcon className='text-primary h-5 w-5 md:h-6 md:w-6' />,
  },
  {
    id: 'message',
    icon: <MessageIcon className='text-secondary h-4 w-4 md:h-5 md:w-5' />,
    lgHidden: true,
  },
  {
    id: 'filter',
    icon: <FilterIcon className='text-secondary h-3 w-3 md:h-4 md:w-4' />,
    lgHidden: true,
  },
  {
    id: 'theme',
    icon: <ThemeSwitcher />,
  },
];

function NavBar() {
  return (
    <nav className='bg-light-hard relative flex w-full items-center p-3 shadow-md'>
      <div className='absolute flex items-center gap-2 pl-2'>
        <LogoIcon className='text-secondary w-clamp fill-primary' />
        <div className='mt-1 text-xl md:text-3xl'>
          <span className='text-secondary font-title'>{'TIN'}</span>
          <span className='text-primary font-title'>{'DEV'}</span>
        </div>
      </div>
      <div className='flex grow justify-end lg:justify-center'>
        {dataIcon.map(({ id, icon, lgHidden }) => (
          <div
            key={id}
            className={`flex items-center px-1 md:px-2 lg:px-24 ${
              lgHidden ?? false ? 'lg:hidden' : ''
            }`}
          >
            <div className='bg-light active:shadow-divider-dark flex h-8 w-8 cursor-pointer items-center justify-center rounded-full shadow-md duration-200 active:translate-y-[2px] active:shadow-inner md:h-10 md:w-10'>
              {icon}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}

export default NavBar;
