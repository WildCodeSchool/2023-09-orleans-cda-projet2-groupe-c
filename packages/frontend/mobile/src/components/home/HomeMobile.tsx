/* eslint-disable react/jsx-closing-bracket-location */

/* eslint-disable @typescript-eslint/no-require-imports */

/* eslint-disable unicorn/prefer-module */
import { Button, ImageBackground, StyleSheet, View } from 'react-native';

import { useTheme } from '../../contexts/ThemeContext';
import Title from '../Title';
import LogoIcon from '../icons/LogoIcon';
import HomeStackScreen from './HomeStackScreen';
import RandomSentence from './RandomSentence';

export default function HomeMobile() {
  const { colors, colorTheme, setColorTheme } = useTheme();

  const switchTheme = () => {
    setColorTheme(colorTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/background.webp')}
        style={styles.background}
      >
        <View style={styles.layout}>
          <View style={styles.containerLogo}>
            <LogoIcon color={colors.text} size={80} />
            <Title size={60}>{`Tindev`}</Title>

            {/* Generate random sentence */}
            <RandomSentence />
          </View>

          <Button title='Switch Theme' onPress={switchTheme} />

          {/* Outlet */}
          <HomeStackScreen />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  layout: {
    alignContent: 'center',
    justifyContent: 'space-between',
    height: '90%',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  containerLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});
