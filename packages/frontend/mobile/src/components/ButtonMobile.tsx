/* eslint-disable react/jsx-closing-bracket-location */
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../contexts/ThemeContext';
import { lightModeColors, themeColors } from '../themes/theme';

interface ButtonProps {
  readonly children: React.ReactNode;
  readonly isOutline?: boolean;
  readonly navigation?: () => void;
}

export default function ButtonMobile({
  children,
  isOutline,
  navigation,
}: ButtonProps) {
  const { colors, colorTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'flex-end',
      minHeight: 50.5,
    },
    button: {
      width: '100%',
      maxWidth: 500,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 10,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: themeColors.primaryDark,
    },
    outline: {
      backgroundColor: 'transparent',
    },
    filled: {
      backgroundColor: colors.primary,
    },
    text: {
      fontSize: 20,
      color:
        isOutline ?? false
          ? // eslint-disable-next-line unicorn/no-nested-ternary
            colorTheme === 'light'
            ? lightModeColors.primary
            : lightModeColors.notification
          : lightModeColors.notification,
    },
  });

  return (
    <View style={styles.container}>
      <Pressable
        onPress={navigation}
        style={({ pressed }) => [
          {
            borderBottomWidth: pressed ? 1 : 5,
          },
          styles.button,
          isOutline ?? false ? styles.outline : styles.filled,
        ]}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
}
