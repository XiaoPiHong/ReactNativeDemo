import React from "react";
import {useTheme} from "@/context/useThemeContext";
import {
  createStaticNavigation,
  createNavigationContainerRef,
} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Icon from "@/components/Icon";
import {typeVariants} from "@/theme";
import HomeScreen from "@/pages/home";
import SettingsScreen from "@/pages/settings";
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

const HomeTabs = createBottomTabNavigator({
  screenOptions: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {theme} = useTheme();
    return {
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
    };
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        tabBarLabel: "Home",
        tabBarIcon: HomeIcon,
      },
    },
    Settings: {
      screen: SettingsScreen,
      options: {
        tabBarLabel: "Settings",
        tabBarIcon: SettingsIcon,
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  groups: {
    SignIn: {
      if: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const user = useSelector((state: TRootState) => state.user);
        return !!user.accessToken;
      },
      screens: {
        HomeTab: {
          screen: HomeTabs,
          options: {
            headerShown: false,
          },
        },
      },
    },
    SignOut: {
      if: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const user = useSelector((state: TRootState) => state.user);
        return !user.accessToken;
      },
      screens: {
        Login: {
          options: {
            headerShown: false,
          },
          screen: LoginScreen,
        },
      },
    },
    // screens: {
    //   Help: HelpScreen,
    // },
  },
});

const Navigation = createStaticNavigation(RootStack);

const navigationRef = createNavigationContainerRef();

const RootNavigation = Navigation;

export {navigationRef};
export default RootNavigation;
