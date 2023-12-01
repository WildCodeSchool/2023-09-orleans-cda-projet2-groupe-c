import { useTheme } from '@/components/ThemeProvider';

import MoonIcon from './icons/MoonIcon';
import SunIcon from './icons/SunIcon';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className='flex h-10 w-10 items-center justify-center'
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }}
    >
      <MoonIcon className='text-secondary scale-moon h-4 w-4 md:h-5 md:w-5' />
      <SunIcon className='text-secondary scale-sun absolute h-4 w-4 md:h-5 md:w-5' />
    </div>
  );
}
