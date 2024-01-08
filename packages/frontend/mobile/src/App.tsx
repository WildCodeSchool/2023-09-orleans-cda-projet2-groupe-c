import HomeStack from './components/home/HomeStack';
import { ThemeContext } from './contexts/ThemeContext';

export default function App() {
  return (
    <ThemeContext>
      <HomeStack />
    </ThemeContext>
  );
}
