/* eslint-disable unicorn/prefer-module */

/* eslint-disable @typescript-eslint/no-require-imports */
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, type TextProps, View } from 'react-native';

import { useTheme } from '../contexts/ThemeContext';

interface TitleProps extends TextProps {
  readonly children: React.ReactNode;
  readonly size?: number;
}

export default function Title({ children, size }: TitleProps) {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    title: {
      color: colors.text,
      fontSize: size,
      fontFamily: 'heavitas',
    },
  });

  // Load the font
  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        heavitas: require('../../assets/fonts/Heavitas.ttf'),
      });

      setIsFontLoaded(true);
    };

    loadFont().catch((error) => {
      throw new Error(error);
    });
  }, []);

  if (!isFontLoaded) {
    return <View />;
  }

  return <Text style={styles.title}>{children}</Text>;
}
