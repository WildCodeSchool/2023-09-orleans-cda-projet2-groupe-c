/* import { useEffect, useState } from 'react'; */
import MoonIcon from './icons/MoonIcon';
import SunIcon from './icons/SunIcon';

export default function ThemeSwitcher() {
  return (
    <>
      <MoonIcon className='text-secondary scale-moon h-4 w-4 md:h-5 md:w-5' />
      <SunIcon className='text-secondary scale-sun absolute h-4 w-4 md:h-5 md:w-5' />
    </>
  );
}
