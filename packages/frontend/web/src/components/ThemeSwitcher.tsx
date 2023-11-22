import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <button type='button' onClick={toggleDarkMode}>
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
