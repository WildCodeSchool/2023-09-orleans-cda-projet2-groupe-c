/* eslint-disable react/jsx-closing-bracket-location */

/* eslint-disable @typescript-eslint/naming-convention */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeMobile from './components/home/HomeMobile';
import { ThemeContext, useTheme } from './contexts/ThemeContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeContext>
      <MyComponent />
    </ThemeContext>
  );
}

function MyComponent() {
  const { colors, colorTheme } = useTheme();

  const theme = {
    dark: colorTheme === 'dark',
    colors: {
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.notification,
    },
  };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name='Home' component={HomeMobile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
