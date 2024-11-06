/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Text, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Icon from "@/components/Icon";
import ThemeProvider, {useTheme} from "@/context/useThemeContext";
import {typeVariants} from "@/theme";
import Layout from "@/layout";
import NoInternet, {NoInternetToast} from "@/components/NoInternet";
import {SERVER_URL} from "@env";

function HomeScreen() {
  return (
    <Layout>
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>Home!</Text>
        <Text>{SERVER_URL}</Text>
      </View>
    </Layout>
  );
}

function SettingsScreen() {
  return (
    <Layout>
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>Settings!</Text>
      </View>
    </Layout>
  );
}

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
        <NoInternet />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
