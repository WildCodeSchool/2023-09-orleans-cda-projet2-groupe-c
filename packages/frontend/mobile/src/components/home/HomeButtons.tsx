/* eslint-disable react/jsx-closing-bracket-location */
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import ButtonMobile from '../ButtonMobile';

export default function HomeButtons() {
  // Hook navigation to redirect
  const navigation = useNavigation();
  const navigate = navigation.navigate as (screen: string) => void;

  // Redirection
  const handlePress = (routeName: string) => {
    navigate(routeName);
  };

  return (
    <View style={{ gap: 10 }}>
      <ButtonMobile
        navigation={() => {
          handlePress('Login');
        }}
        isOutline={false}
      >
        {`Login`}
      </ButtonMobile>
      <ButtonMobile isOutline>{`Register`}</ButtonMobile>
    </View>
  );
}
