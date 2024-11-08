import React, {useMemo} from "react";
import {StyleSheet, Text, View, useWindowDimensions} from "react-native";
import {useNetInfo} from "@react-native-community/netinfo";
import {useSafeAreaInsets} from "react-native-safe-area-context";

// Full Screen component to show No internet message
const NoInternet = () => {
  const netInfo = useNetInfo();
  const insets = useSafeAreaInsets();
  // netInfo.isConnected init is null
  const isConnected = useMemo(
    () => netInfo.isConnected ?? true,
    [netInfo.isConnected],
  );
  if (!isConnected) {
    return (
      <View
        style={[
          styles.fullOfflineContainer,
          {
            top: insets.top,
            left: insets.left,
            right: insets.right,
            bottom: insets.bottom,
          },
        ]}>
        <Text style={[styles.fullOfflineTitle, {color: "red"}]}>网络异常</Text>
        <Text style={{color: "red"}}>请检查你的网络</Text>
      </View>
    );
  }
  return null;
};

export default NoInternet;

// Component (tiny) for showing No Intenet message at bottom the app
export const NoInternetToast = () => {
  const netInfo = useNetInfo();
  const {width} = useWindowDimensions();
  const isConnected = useMemo(
    () => netInfo.isConnected ?? true,
    [netInfo.isConnected],
  );
  if (!isConnected) {
    return (
      <View style={[styles.offlineContainer, {width}]}>
        <Text style={styles.offlineText}>网络异常</Text>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  fullOfflineContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  fullOfflineTitle: {
    marginBottom: 10,
  },
  offlineContainer: {
    backgroundColor: "#d70015",
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    zIndex: 10,
  },
  offlineText: {fontSize: 11, color: "#fff"},
});
