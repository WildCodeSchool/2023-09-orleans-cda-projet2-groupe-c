import { StatusBar } from 'react-native';

import { useTheme } from '../contexts/ThemeContext';

export default function StatusBarMobile() {
  const { colorTheme } = useTheme();

  return (
    <StatusBar
      barStyle={colorTheme === 'dark' ? 'light-content' : 'dark-content'}
    />
  );
}
