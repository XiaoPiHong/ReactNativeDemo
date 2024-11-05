/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Text, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Icon from "@/components/Icon";

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>Settings!</Text>
    </View>
  );
}

const HomeIcon = ({focused}) => {
  return <Icon name={"home"} />;
};

const SettingsIcon = ({focused}) => {
  return <Icon name={"settings"} />;
};

function App(): React.JSX.Element {
  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator>
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
    </SafeAreaProvider>
  );
}

export default App;
