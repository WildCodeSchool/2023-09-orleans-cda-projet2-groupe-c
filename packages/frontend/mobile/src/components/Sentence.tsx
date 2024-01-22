/* eslint-disable @typescript-eslint/no-require-imports */

/* eslint-disable unicorn/prefer-module */
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, type TextProps, View } from 'react-native';

import { useTheme } from '../contexts/ThemeContext';

interface TitleProps extends TextProps {
  readonly children: React.ReactNode;
  readonly size?: number;
}

export default function Sentence({ children, size }: TitleProps) {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    text: {
      color: colors.text,
      fontSize: size,
      fontFamily: 'poppins',
      textAlign: 'center',
    },
  });

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
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

  return <Text style={styles.text}>{children}</Text>;
}
