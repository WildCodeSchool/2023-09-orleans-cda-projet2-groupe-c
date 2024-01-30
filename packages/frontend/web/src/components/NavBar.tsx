import { Link, useLocation, useNavigate } from 'react-router-dom';

import BulletBase from '@/components/BulletBase';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import FilterIcon from '@/components/icons/FilterIcon';
import LikeIcon from '@/components/icons/LikeIcon';
import LogoIcon from '@/components/icons/LogoIcon';
import MessageIcon from '@/components/icons/MessageIcon';
import UserIcon from '@/components/icons/UserIcon';
import { useAuth } from '@/contexts/AuthContext';

interface NavigationBody {
  id: string;
  icon: JSX.Element;
  lgHidden?: boolean;
  onClick?: () => void;
}

export default function NavBar() {
  const { userId } = useAuth();

  // Check if the user is on the home page
  // Using to add a class to the navbar
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navigate = useNavigate();

  const dataIcon: NavigationBody[] = [
    {
      id: 'user',
      icon: <UserIcon className='fill-secondary h-5 w-5' />,
    },
    {
      id: 'like',
      icon: <LikeIcon className='fill-primary h-5 w-5' />,
      onClick: () => {
        navigate(`/profile/${userId}/interactions`);
      },
    },
    {
      id: 'message',
      icon: <MessageIcon className='fill-secondary h-5 w-5' />,
      lgHidden: true,
    },
    {
      id: 'filter',
      icon: <FilterIcon className='fill-secondary h-4 w-4' />,
      lgHidden: true,
    },
    {
      id: 'theme',
      icon: <ThemeSwitcher />,
    },
  ];

  return (
    <nav
      className={`bg-light-hard sticky top-0 z-50 flex w-full items-center p-3 ${
        isHomePage && 'shadow-md'
      }`}
    >
      <Link to='/' className='absolute flex items-center gap-2 pl-2'>
        <LogoIcon className='text-secondary w-clamp fill-primary' />
        <div className='mt-1 text-xl md:text-3xl'>
          <span className='text-secondary font-title'>{'TIN'}</span>
          <span className='text-primary font-title'>{'DEV'}</span>
        </div>
      </Link>
      <div className='flex grow justify-end gap-2 sm:gap-4 lg:justify-center lg:gap-52'>
        {dataIcon.map(({ id, icon, lgHidden, onClick }) => (
          <BulletBase size='8' key={id} lgHidden={lgHidden} onClick={onClick}>
            {icon}
          </BulletBase>
        ))}
      </div>
    </nav>
  );
}
