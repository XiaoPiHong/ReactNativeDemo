/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React, {useEffect} from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";
import ReduxProvider from "@/store";
import ThemeProvider from "@/context/useThemeContext";
import {NoInternetToast} from "@/components/NoInternet";
import SplashScreen from "react-native-splash-screen";
import RootNavigation from "@/components/RootNavigation";

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <SafeAreaProvider>
      <ReduxProvider>
        <ThemeProvider>
          <RootNavigation />
          <NoInternetToast />
        </ThemeProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  );
}

export default App;
