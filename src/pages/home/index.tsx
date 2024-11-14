import React, {useEffect} from "react";
import {Text, View, Button} from "react-native";
import {SERVER_URL} from "@env";
import Layout from "@/layout";
import {useSelector} from "react-redux";
import {TRootState} from "@/store/store";
import * as storageUtil from "@/utils/storage";

function HomeScreen() {
  const username = useSelector((state: TRootState) => state.user.username);
  storageUtil.local.tokenType.set("Bearer");

  const onPress = async () => {
    const tokenType = await storageUtil.local.tokenType.get();
    console.log(tokenType);
  };
  return (
    <Layout>
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>Home!</Text>
        <Text>{SERVER_URL}</Text>
        <Text>{username}</Text>
        <Button title="获取tokenType" onPress={onPress} />
      </View>
    </Layout>
  );
}

export default HomeScreen;
