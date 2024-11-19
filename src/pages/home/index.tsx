import React, {useState} from "react";
import {View, Button} from "react-native";
import Layout from "@/layout";
import {useSelector} from "react-redux";
import {TRootState} from "@/store/store";
// import * as storageUtil from "@/utils/storage";
import * as envUtil from "@/utils/env";
import * as apisAuth from "@/apis/auth/auth";
import {useTheme} from "@/context/useThemeContext";
import {Text} from "react-native-paper";

function HomeScreen() {
  const username = useSelector((state: TRootState) => state.user.username);
  const {BASE_API_URL, SERVER_URL} = envUtil.getEnvConfig();
  const {toggleTheme} = useTheme();
  const onPressTest = async () => {
    // storageUtil.local.accessToken.set("Bearer");
    // const accessToken = await storageUtil.local.accessToken.get();
    // console.log(accessToken);
    apisAuth.postAuthSignup({});
  };
  const [dark, setDark] = useState(false);
  const onPressTheme = () => {
    const flag = !dark;
    toggleTheme(flag);
    setDark(flag);
  };
  return (
    <Layout>
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>Home!</Text>
        <Text>{SERVER_URL}</Text>
        <Text>{BASE_API_URL}</Text>
        <Text>{username}</Text>
        <Button title="testHttp" onPress={onPressTest} />
        <Button title="theme" onPress={onPressTheme} />
      </View>
    </Layout>
  );
}

export default HomeScreen;
