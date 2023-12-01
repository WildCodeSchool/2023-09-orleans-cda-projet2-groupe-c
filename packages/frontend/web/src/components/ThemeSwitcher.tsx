import { useEffect, useState } from 'react';

import MoonIcon from './icons/MoonIcon';
import SunIcon from './icons/SunIcon';

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
      className='bg-light-light active:shadow-divider-dark flex h-8 w-8 items-center justify-center rounded-full shadow-md duration-200 active:translate-y-[2px] active:shadow-inner md:h-10 md:w-10'
      onClick={toggleDarkMode}
    >
      <MoonIcon className='text-secondary scale-moon h-4 w-4 md:h-5 md:w-5' />

      <SunIcon className='text-secondary scale-sun absolute h-4 w-4 md:h-5 md:w-5' />
    </div>
  );
}
