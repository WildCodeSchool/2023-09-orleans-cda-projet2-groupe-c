/* eslint-disable react/jsx-closing-bracket-location */
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeButtons from './HomeButtons';
import Login from './Login';

// eslint-disable-next-line @typescript-eslint/naming-convention
const HomeStack = createNativeStackNavigator();

// Parent screen with children screens
export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName='HomeButtons'
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: 'transparent',
          justifyContent: 'flex-end',
        },
      }}
    >
      <HomeStack.Screen name='HomeButtons' component={HomeButtons} />
      <HomeStack.Screen
        name='Login'
        component={Login}
        options={{
          animation: 'slide_from_bottom',
          animationDuration: 500,
        }}
      />
    </HomeStack.Navigator>
  );
}
