/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// const tintColorLight = '#0a7ea4';
const tintColorLight = '#286752';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#000',
    textSecondary: '#grey',
    background: '#fff',
    backgroundSecondary: '#F3FAF8',
    tint: tintColorLight,
    tintComplimentary: '#bf9b30',
    icon: '#286752',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    border: '#eee',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
