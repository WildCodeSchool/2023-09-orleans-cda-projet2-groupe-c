import { useEffect, useState } from 'react';

import DarkIcon from './icons/DarkIcon';
import LightIcon from './icons/LightIcon';

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
      <DarkIcon className='text-secondary scale-moon h-4 w-4 md:h-5 md:w-5' />

      <LightIcon className='text-secondary scale-sun absolute h-4 w-4 md:h-5 md:w-5' />
    </div>
  );
}
