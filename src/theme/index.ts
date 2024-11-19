import {MD3Theme, MD3LightTheme, MD3DarkTheme} from "react-native-paper";

interface ISpacing {
  borderRadius: number;
  layoutPaddingH: number;
  containerPaddingV: number;
  cardMarginB: number;
}

interface ITypeSizes {
  FONT_SIZE_SMALL: number;
  FONT_SIZE_MEDIUM: number;
  FONT_SIZE_LARGE: number;
  FONT_WEIGHT_LIGHT: number;
  FONT_WEIGHT_MEDIUM: number;
  FONT_WEIGHT_HEAVY: number;
}

export interface ITheme extends MD3Theme {
  name: string;
}

interface IThemes {
  light: ITheme;
  dark: ITheme;
}

// Common margins and paddings
const spacing: ISpacing = {
  borderRadius: 16,
  layoutPaddingH: 16,
  containerPaddingV: 22,
  cardMarginB: 16,
};

// Font sizes and weights
const typeSizes: ITypeSizes = {
  FONT_SIZE_LARGE: 16,
  FONT_SIZE_MEDIUM: 14,
  FONT_SIZE_SMALL: 12,
  FONT_WEIGHT_LIGHT: 200,
  FONT_WEIGHT_MEDIUM: 600,
  FONT_WEIGHT_HEAVY: 700,
};

// Font families
const typeVariants = {
  titleLarge: {
    fontFamily: "Poppins-Bold",
    fontSize: typeSizes.FONT_SIZE_LARGE,
  },
  titleSmall: {
    fontFamily: "Poppins-Bold",
    fontSize: typeSizes.FONT_SIZE_SMALL,
  },
  bodyMedium: {
    fontFamily: "Poppins-Regular",
    fontSize: typeSizes.FONT_SIZE_MEDIUM,
  },
  bodySmall: {
    fontFamily: "Poppins-Regular",
    fontSize: typeSizes.FONT_SIZE_SMALL,
  },
};

const themes: IThemes = {
  light: {
    ...MD3LightTheme,
    name: "light",
    colors: {
      primary: "rgb(0, 107, 91)",
      onPrimary: "rgb(255, 255, 255)",
      primaryContainer: "rgb(118, 248, 220)",
      onPrimaryContainer: "rgb(0, 32, 26)",
      secondary: "rgb(75, 99, 92)",
      onSecondary: "rgb(255, 255, 255)",
      secondaryContainer: "rgb(205, 232, 223)",
      onSecondaryContainer: "rgb(6, 32, 26)",
      tertiary: "rgb(67, 98, 120)",
      onTertiary: "rgb(255, 255, 255)",
      tertiaryContainer: "rgb(200, 230, 255)",
      onTertiaryContainer: "rgb(0, 30, 46)",
      error: "rgb(186, 26, 26)",
      onError: "rgb(255, 255, 255)",
      errorContainer: "rgb(255, 218, 214)",
      onErrorContainer: "rgb(65, 0, 2)",
      background: "rgb(250, 253, 250)",
      onBackground: "rgb(25, 28, 27)",
      surface: "rgb(250, 253, 250)",
      onSurface: "rgb(25, 28, 27)",
      surfaceVariant: "rgb(219, 229, 224)",
      onSurfaceVariant: "rgb(63, 73, 70)",
      outline: "rgb(111, 121, 118)",
      outlineVariant: "rgb(191, 201, 196)",
      shadow: "rgb(0, 0, 0)",
      scrim: "rgb(0, 0, 0)",
      inverseSurface: "rgb(46, 49, 48)",
      inverseOnSurface: "rgb(239, 241, 239)",
      inversePrimary: "rgb(86, 219, 192)",
      elevation: {
        level0: "transparent",
        level1: "rgb(238, 246, 242)",
        level2: "rgb(230, 241, 237)",
        level3: "rgb(223, 237, 233)",
        level4: "rgb(220, 236, 231)",
        level5: "rgb(215, 233, 228)",
      },
      surfaceDisabled: "rgba(25, 28, 27, 0.12)",
      onSurfaceDisabled: "rgba(25, 28, 27, 0.38)",
      backdrop: "rgba(41, 50, 47, 0.4)",
    },
  },
  dark: {
    ...MD3DarkTheme,
    name: "dark",
    colors: {
      primary: "rgb(86, 219, 192)",
      onPrimary: "rgb(0, 56, 46)",
      primaryContainer: "rgb(0, 81, 68)",
      onPrimaryContainer: "rgb(118, 248, 220)",
      secondary: "rgb(177, 204, 196)",
      onSecondary: "rgb(29, 53, 47)",
      secondaryContainer: "rgb(51, 75, 69)",
      onSecondaryContainer: "rgb(205, 232, 223)",
      tertiary: "rgb(170, 203, 228)",
      onTertiary: "rgb(17, 52, 71)",
      tertiaryContainer: "rgb(42, 74, 95)",
      onTertiaryContainer: "rgb(200, 230, 255)",
      error: "rgb(255, 180, 171)",
      onError: "rgb(105, 0, 5)",
      errorContainer: "rgb(147, 0, 10)",
      onErrorContainer: "rgb(255, 180, 171)",
      background: "rgb(25, 28, 27)",
      onBackground: "rgb(224, 227, 225)",
      surface: "rgb(25, 28, 27)",
      onSurface: "rgb(224, 227, 225)",
      surfaceVariant: "rgb(63, 73, 70)",
      onSurfaceVariant: "rgb(191, 201, 196)",
      outline: "rgb(137, 147, 143)",
      outlineVariant: "rgb(63, 73, 70)",
      shadow: "rgb(0, 0, 0)",
      scrim: "rgb(0, 0, 0)",
      inverseSurface: "rgb(224, 227, 225)",
      inverseOnSurface: "rgb(46, 49, 48)",
      inversePrimary: "rgb(0, 107, 91)",
      elevation: {
        level0: "transparent",
        level1: "rgb(28, 38, 35)",
        level2: "rgb(30, 43, 40)",
        level3: "rgb(32, 49, 45)",
        level4: "rgb(32, 51, 47)",
        level5: "rgb(34, 55, 50)",
      },
      surfaceDisabled: "rgba(224, 227, 225, 0.12)",
      onSurfaceDisabled: "rgba(224, 227, 225, 0.38)",
      backdrop: "rgba(41, 50, 47, 0.4)",
    },
  },
};

export {spacing, typeSizes, typeVariants, themes};
