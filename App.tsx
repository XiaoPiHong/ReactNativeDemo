/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";
import ReduxProvider from "@/store";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ThemeProvider, {useTheme} from "@/context/useThemeContext";
import {NoInternetToast} from "@/components/NoInternet";
import Icon from "@/components/Icon";
import {typeVariants} from "@/theme";
import HomeScreen from "@/pages/home";
import SettingsScreen from "@/pages/settings";

const HomeIcon = ({focused}) => {
  const {theme} = useTheme();
  return <Icon name={"home"} color={focused ? theme.primary : void 0} />;
};

const SettingsIcon = ({focused}) => {
  const {theme} = useTheme();
  return <Icon name={"settings"} color={focused ? theme.primary : void 0} />;
};

function App(): React.JSX.Element {
  const Tab = createBottomTabNavigator();
  const {theme} = useTheme();
  return (
    <SafeAreaProvider>
      <ReduxProvider>
        <ThemeProvider>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={{
                tabBarStyle: {
                  backgroundColor: theme.cardBg,
                  borderTopColor: theme?.layoutBg,
                },
                tabBarInactiveTintColor: theme.color,
                tabBarActiveTintColor: theme.primary,
                headerStyle: {backgroundColor: theme.cardBg, height: 50},
                headerTitleAlign: "center",
                headerTitleStyle: {
                  fontFamily: typeVariants.titleLarge.fontFamily,
                  fontSize: 18,
                  color: theme.primary,
                  fontWeight: "bold",
                },
                tabBarShowLabel: false,
              }}>
              <Tab.Screen
                name="Home"
                options={{
                  tabBarIcon: HomeIcon,
                }}
                component={HomeScreen}
              />
              <Tab.Screen
                name="Settings"
                options={{
                  tabBarIcon: SettingsIcon,
                }}
                component={SettingsScreen}
              />
            </Tab.Navigator>
          </NavigationContainer>
          <NoInternetToast />
        </ThemeProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  );
}

export default App;
