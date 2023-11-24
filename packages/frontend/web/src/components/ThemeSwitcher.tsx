import { useEffect, useState } from 'react';

import DarkIcone from './icons/DarkIcone';
import LightIcon from './icons/LightIcone';

export default function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      className='dark:bg-dark-ulta-light bg-light-light active:shadow-secondary dark:active:shadow-dark-medium relative inline-block h-8 w-8 rounded-full duration-200 active:translate-y-[2px] active:shadow-inner sm:h-14 sm:w-14'
      onClick={toggleDarkMode}
    >
      <DarkIcone className='text-light-light absolute h-4 w-4 translate-x-[55%] translate-y-2 sm:h-6 sm:w-6 sm:translate-x-4 sm:translate-y-4' />

      <LightIcon className='text-secondary absolute h-4 w-4 translate-x-[55%] translate-y-2 dark:text-transparent sm:h-6 sm:w-6 sm:translate-x-[70%] sm:translate-y-4' />
    </div>
  );
}
