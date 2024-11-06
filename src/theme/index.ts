// Types
interface TSpacing {
  borderRadius: number;
  layoutPaddingH: number;
  containerPaddingV: number;
  cardMarginB: number;
}

interface TTypeSizes {
  FONT_SIZE_SMALL: number;
  FONT_SIZE_MEDIUM: number;
  FONT_SIZE_LARGE: number;
  FONT_WEIGHT_LIGHT: number;
  FONT_WEIGHT_MEDIUM: number;
  FONT_WEIGHT_HEAVY: number;
}

export interface TTheme {
  name: string;
  color: string;
  primary: string;
  layoutBg: string;
  cardBg: string;
  cardBorderColor: string;
  accent: string;
  error: string;
}

interface TThemes {
  light: TTheme;
  dark: TTheme;
}

// Spacing:- Common margins and paddings
const spacing: TSpacing = {
  borderRadius: 16,
  layoutPaddingH: 16,
  containerPaddingV: 22,
  cardMarginB: 16,
};

// Type Sizes:- Font sizes and weights
const typeSizes: TTypeSizes = {
  FONT_SIZE_LARGE: 16,
  FONT_SIZE_MEDIUM: 14,
  FONT_SIZE_SMALL: 12,
  FONT_WEIGHT_LIGHT: 200,
  FONT_WEIGHT_MEDIUM: 600,
  FONT_WEIGHT_HEAVY: 700,
};

// Type Variants:- Font families
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

const themes: TThemes = {
  light: {
    name: "light",
    color: "#695D5D",
    primary: "#2bbca2",
    layoutBg: "#e0eeec",
    cardBg: "#ffffff",
    cardBorderColor: "#EEECEC",
    accent: "#0071ff",
    error: "#B00020",
  },
  dark: {
    name: "dark",
    color: "#ffffff",
    primary: "#2bbca2",
    layoutBg: "#121212",
    cardBg: "#1e1e1e",
    cardBorderColor: "#1A1A1A",
    accent: "#0071ff",
    error: "#B00020",
  },
};

export {spacing, typeSizes, typeVariants, themes};
