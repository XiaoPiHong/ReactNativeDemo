import React from "react";
import {themes, TTheme} from "@/theme";

// Types
export interface IThemeContext {
  theme: TTheme;
  setTheme: (value: TTheme) => void;
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
      {children}
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
