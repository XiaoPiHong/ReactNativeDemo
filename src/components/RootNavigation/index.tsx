import React from "react";
import {useTheme} from "@/context/useThemeContext";
import {
  createNavigationContainerRef,
  DefaultTheme as NaDefaultTheme,
  DarkTheme as NaDarkTheme,
  NavigationContainer,
} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Icon from "@/components/Icon";
import {typeVariants, themes} from "@/theme";
import HomeScreen from "@/pages/home";
import SettingsScreen from "@/pages/settings";
import LoginScreen from "@/pages/login";
import {useSelector} from "react-redux";
import {TRootState} from "@/store/store";
import {adaptNavigationTheme} from "react-native-paper";
import ListHeaderLeft from "@/components/ListHeaderLeft";

const HomeIcon = ({focused}) => {
  const {theme} = useTheme();
  return <Icon name={"home"} color={focused ? theme.colors.primary : void 0} />;
};

const SettingsIcon = ({focused}) => {
  const {theme} = useTheme();
  return (
    <Icon name={"settings"} color={focused ? theme.colors.primary : void 0} />
  );
};

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const navigationRef = createNavigationContainerRef();

const HomeTabsScreen = () => {
  const {theme} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.surfaceVariant,
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: theme.colors.surfaceVariant,
          height: 50,
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: typeVariants.titleLarge.fontFamily,
          fontSize: 18,
          color: theme.colors.primary,
          fontWeight: "bold",
        },
        headerLeft: props => <ListHeaderLeft />,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{tabBarIcon: HomeIcon, tabBarLabel: "Home"}}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{tabBarIcon: SettingsIcon, tabBarLabel: "Settings"}}
      />
    </Tab.Navigator>
  );
};

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NaDefaultTheme,
  reactNavigationDark: NaDarkTheme,
  materialLight: themes.light,
  materialDark: themes.dark,
});

const RootNavigation = () => {
  const {theme} = useTheme();
  const user = useSelector((state: TRootState) => state.user);
  return (
    <NavigationContainer
      theme={
        theme.name === "dark"
          ? {
              ...DarkTheme,
              fonts: {...NaDarkTheme.fonts},
            }
          : {
              ...LightTheme,
              fonts: {...NaDefaultTheme.fonts},
            }
      }>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user.accessToken ? (
          <>
            <Stack.Screen name="HomeTabs" component={HomeTabsScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignOut" component={LoginScreen} />
          </>
        )}
        {/* <Stack.Group navigationKey={user.accessToken ? "user" : "guest"}>
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Group> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export {navigationRef};
export default RootNavigation;
