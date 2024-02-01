import { useConversation } from '@/contexts/ConversationContext';
import BulletBase from './BulletBase';
import ThemeSwitcher from './ThemeSwitcher';
import FilterIcon from './icons/FilterIcon';
import LikeIcon from './icons/LikeIcon';
import LogoIcon from './icons/LogoIcon';
import MessageIcon from './icons/MessageIcon';
import UserIcon from './icons/UserIcon';

const dataIcon = [
  {
    id: 'user',
    icon: <UserIcon className='fill-secondary h-5 w-5' />,
  },
  {
    id: 'like',
    icon: <LikeIcon className='fill-primary h-5 w-5' />,
  },
  {
    id: 'message',
    icon: <MessageIcon className='fill-secondary h-5 w-5' />,
    lgHidden: true,
    onClick: true
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

function NavBar() {

  const {handleClick} = useConversation()
  return (
    <nav className='bg-light-hard relative flex w-full items-center p-3 shadow-md'>
      <div className='absolute flex items-center gap-2 pl-2'>
        <LogoIcon className='text-secondary w-clamp fill-primary' />
        <div className='mt-1 text-xl md:text-3xl'>
          <span className='text-secondary font-title'>{'TIN'}</span>
          <span className='text-primary font-title'>{'DEV'}</span>
        </div>
      </div>
      <div className='flex grow justify-end gap-2 sm:gap-4 lg:justify-center lg:gap-52'>
        {dataIcon.map(({ id, icon, lgHidden, onClick }) => (
          <BulletBase size='8' key={id} lgHidden={lgHidden} onClick={Boolean(onClick) ? handleClick : undefined}>
            {icon}
          </BulletBase>
        ))}
      </div>
    </nav>
  );
}

export default NavBar;
