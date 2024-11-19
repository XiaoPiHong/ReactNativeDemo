import {PaperProvider} from "react-native-paper";
import React from "react";
import {themes, ITheme} from "@/theme";

// Types
export interface IThemeContext {
  theme: ITheme;
  setTheme: (value: ITheme) => void;
}

interface IThemeProvider {
  children: React.ReactNode;
}

// Context
const ThemeContext = React.createContext<IThemeContext>({
  theme: themes.light,
  setTheme: () => {},
});

// Provider to be used in index/App/or top of any parent
const ThemeProvider = ({children}: IThemeProvider): JSX.Element => {
  const [theme, setTheme] = React.useState(themes.light);

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};

// useTheme hook for easy access to theme and setTheme
export const useTheme = () => {
  const state = React.useContext(ThemeContext);

  const {theme, setTheme} = state;

  const toggleTheme = (v: boolean) => {
    setTheme(v ? themes.dark : themes.light);
  };

  return {theme, toggleTheme};
};

export default ThemeProvider;
