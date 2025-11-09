/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

// constants/theme.ts

export const Colors = {
  light: {
    background: "#FFFFFF",
    text: "#0B0F26",
    primary: "#00BFFF", // bright blue
    secondary: "#005A70", // deeper teal-blue
    muted: "#6C6C6C", // placeholder / inactive text
    card: "#F7F9FB",
    border: "#E0E0E0",

    // Functional / UI
    success: "#59BC6C", // general success
    error: "#CE395F", // general error or danger
    accept: "#6EDC58",
    deny: "#EA5555",
    highlight: "#4CB2D5", // accent / highlight color
  },

  dark: {
    background: "#0C1025",
    text: "#FFFFFF",
    primary: "#00BFFF",
    secondary: "#4CB2D5",
    muted: "#6C6C6C",
    card: "#0B0F26",
    border: "#1F243A",

    // Functional / UI
    success: "#59BC6C",
    error: "#CE395F",
    accept: "#6EDC58",
    deny: "#EA5555",
    highlight: "#00BFFF",
  },
} as const;

export const Typography = {
  fontFamily: {
    inter: "Inter",
    sfpro: "SF Pro Display", // iOS system default
  },
  fontSize: {
    xs: 10,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 28,
    title: 36,
  },
  fontWeight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;


// export const Colors = {
//   light: {
//     text: '#11181C',
//     background: '#fff',
//     tint: tintColorLight,
//     icon: '#687076',
//     tabIconDefault: '#687076',
//     tabIconSelected: tintColorLight,
//   },
//   dark: {
//     text: '#ECEDEE',
//     background: '#151718',
//     tint: tintColorDark,
//     icon: '#9BA1A6',
//     tabIconDefault: '#9BA1A6',
//     tabIconSelected: tintColorDark,
//   },
// };

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
