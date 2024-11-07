import React from "react";
import {Text, View} from "react-native";
import Layout from "@/layout";

function SettingsScreen() {
  return (
    <Layout>
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>Settings!</Text>
      </View>
    </Layout>
  );
}

export default SettingsScreen;
