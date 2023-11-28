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
      className='dark:bg-dark-ulta-light bg-light-light active:shadow-secondary dark:active:shadow-dark-medium flex h-8 w-8 items-center justify-center rounded-full shadow-md duration-200 active:translate-y-[2px] active:shadow-inner md:h-10 md:w-10'
      onClick={toggleDarkMode}
    >
      <DarkIcone className='text-light-light h-4 w-4 md:h-5 md:w-5' />

      <LightIcon className='text-secondary absolute h-4 w-4 dark:text-transparent md:h-5 md:w-5' />
    </div>
  );
}
