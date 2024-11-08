/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React, {useEffect} from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";
import ReduxProvider from "@/store";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ThemeProvider, {useTheme} from "@/context/useThemeContext";
import {NoInternetToast} from "@/components/NoInternet";
import Icon from "@/components/Icon";
import {typeVariants} from "@/theme";
import HomeScreen from "@/pages/home";
import SettingsScreen from "@/pages/settings";
import SplashScreen from "react-native-splash-screen";
import LoginScreen from "@/pages/login";
import {useSelector} from "react-redux";
import {TRootState} from "@/store/store";

const HomeIcon = ({focused}) => {
  const {theme} = useTheme();
  return <Icon name={"home"} color={focused ? theme.primary : void 0} />;
};

const SettingsIcon = ({focused}) => {
  const {theme} = useTheme();
  return <Icon name={"settings"} color={focused ? theme.primary : void 0} />;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {
  const {theme} = useTheme();
  const user = useSelector((state: TRootState) => state.user);

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <SafeAreaProvider>
      <ReduxProvider>
        <ThemeProvider>
          <NavigationContainer>
            {user.token ? (
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
            ) : (
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}>
                <Stack.Screen name="Login" component={LoginScreen} />
              </Stack.Navigator>
            )}
          </NavigationContainer>
          <NoInternetToast />
        </ThemeProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  );
}

export default App;
