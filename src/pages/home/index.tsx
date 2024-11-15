import React from "react";
import {Text, View, Button} from "react-native";
import Layout from "@/layout";
import {useSelector} from "react-redux";
import {TRootState} from "@/store/store";
// import * as storageUtil from "@/utils/storage";
import * as envUtil from "@/utils/env";
import * as apisAuth from "@/apis/auth/auth";

function HomeScreen() {
  const username = useSelector((state: TRootState) => state.user.username);
  const {BASE_API_URL, SERVER_URL} = envUtil.getEnvConfig();

  const onPress = async () => {
    // storageUtil.local.accessToken.set("Bearer");
    // const accessToken = await storageUtil.local.accessToken.get();
    // console.log(accessToken);
    apisAuth.postAuthSignup({});
  };
  return (
    <Layout>
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>Home!</Text>
        <Text>{SERVER_URL}</Text>
        <Text>{BASE_API_URL}</Text>
        <Text>{username}</Text>
        <Button title="testHttp" onPress={onPress} />
      </View>
    </Layout>
  );
}

export default HomeScreen;
