import ThemeSwitcher from './ThemeSwitcher';
import FilterIcon from './icons/FilterIcon';
import LikeIcon from './icons/LikeIcon';
import Logo from './icons/Logo';
import MessageIcon from './icons/MessageIcon';
import UserIcon from './icons/UserIcon';

function NavBar() {
  return (
    <nav className='bg-light-hard dark:bg-dark-hard flex w-full items-center p-3 sm:p-6'>
      <div className='flex items-center gap-2'>
        <Logo className='text-secondary dark:text-light-light mb-1 h-8 w-8 sm:h-11 sm:w-11' />
        <div>
          <span className='text-secondary dark:text-light-light font-title text-xl sm:text-3xl'>
            {'TIN'}
          </span>
          <span className='text-primary font-title text-xl sm:text-3xl'>
            {'DEV'}
          </span>
        </div>
      </div>
      <div className='flex grow justify-end sm:justify-center sm:pr-5'>
        <div className='px-1 sm:px-8'>
          <div className='dark:bg-dark-ulta-light bg-light-light active:shadow-secondary dark:active:shadow-dark-medium relative inline-block h-8 w-8 rounded-full shadow-md duration-200 active:translate-y-[2px] active:shadow-inner sm:h-14 sm:w-14'>
            <UserIcon className='text-secondary dark:text-light-light absolute h-4 w-4 translate-x-[55%] translate-y-2 sm:h-6 sm:w-6 sm:translate-x-[72%] sm:translate-y-4' />
          </div>
        </div>
        <div className='px-1 sm:px-8'>
          <div className='dark:bg-dark-ulta-light bg-light-light active:shadow-secondary dark:active:shadow-dark-medium relative inline-block h-8 w-8 rounded-full shadow-md duration-200 active:translate-y-[2px] active:shadow-inner sm:h-14 sm:w-14'>
            <LikeIcon className='text-primary absolute h-5 w-5 translate-x-[35%] translate-y-[35%] sm:h-7 sm:w-7 sm:translate-x-[53%] sm:translate-y-4' />
          </div>
        </div>
        <div className='px-1 sm:px-0'>
          <div className='dark:bg-dark-ulta-light bg-light-light active:shadow-secondary dark:active:shadow-dark-medium relative inline-block h-8 w-8 rounded-full shadow-md duration-200 active:translate-y-[2px] active:shadow-inner sm:hidden sm:h-14 sm:w-14'>
            <MessageIcon className='text-secondary dark:text-light-light absolute h-4 w-4 translate-x-[55%] translate-y-2' />
          </div>
        </div>
        <div className='px-1 sm:px-0'>
          <div className='dark:bg-dark-ulta-light bg-light-light active:shadow-secondary dark:active:shadow-dark-medium relative inline-block h-8 w-8 rounded-full shadow-md duration-200 active:translate-y-[2px] active:shadow-inner sm:hidden sm:h-14 sm:w-14'>
            <FilterIcon className='text-secondary dark:text-light-light absolute h-3 w-3 translate-x-[85%] translate-y-[85%]' />
          </div>
        </div>
        <div className='px-1 sm:px-8'>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
