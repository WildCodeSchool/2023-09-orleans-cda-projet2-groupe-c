/* eslint-disable react/jsx-closing-bracket-location */

/* eslint-disable @typescript-eslint/naming-convention */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StatusBarMobile from '../../components/StatusBarMobile';
import HomeMobile from '../../components/home/HomeMobile';
import { useTheme } from '../../contexts/ThemeContext';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
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
      <StatusBarMobile />
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name='Home' component={HomeMobile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
