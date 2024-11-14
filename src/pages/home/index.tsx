import React from "react";
import {Text, View} from "react-native";
import {SERVER_URL} from "@env";
import Layout from "@/layout";
import {useSelector} from "react-redux";
import {TRootState} from "@/store/store";
// import * as storageUtil from "@/utils/storage";

function HomeScreen() {
  const username = useSelector((state: TRootState) => state.user.username);

  // const onPress = async () => {
  //   storageUtil.local.accessToken.set("Bearer");
  //   const accessToken = await storageUtil.local.accessToken.get();
  //   console.log(accessToken);
  // };
  return (
    <Layout>
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>Home!</Text>
        <Text>{SERVER_URL}</Text>
        <Text>{username}</Text>
      </View>
    </Layout>
  );
}

export default HomeScreen;
