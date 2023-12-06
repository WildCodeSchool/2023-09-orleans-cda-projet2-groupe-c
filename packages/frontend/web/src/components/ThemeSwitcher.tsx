import { useTheme } from '@/contexts/ThemeContext';

import MoonIcon from './icons/MoonIcon';
import SunIcon from './icons/SunIcon';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  return (
    <div onClick={toggleDarkMode} className='flex h-full items-center'>
      <MoonIcon className='text-secondary scale-moon h-4 w-4 md:h-5 md:w-5' />
      <SunIcon className='text-secondary scale-sun absolute h-4 w-4 md:h-5 md:w-5' />
    </div>
  );
}
