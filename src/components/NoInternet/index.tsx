import React, {useMemo} from "react";
import {StyleSheet, View, useWindowDimensions} from "react-native";
import {useNetInfo} from "@react-native-community/netinfo";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {ActivityIndicator, Text} from "react-native-paper";
import useI18n from "@/hooks/useI18n";

// Full Screen component to show No internet message
const NoInternet = () => {
  const {t} = useI18n();
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
        <Text style={[styles.fullOfflineTitle, {color: "red"}]}>
          {t("noInternet.networkAbnormality")}
        </Text>
        <Text style={{color: "red"}}>{t("noInternet.tips.networkCheck")}</Text>
        <ActivityIndicator size="small" color="#fff" />
      </View>
    );
  }
  return null;
};

export default NoInternet;

// Component (tiny) for showing No Intenet message at bottom the app
export const NoInternetToast = () => {
  const {t} = useI18n();
  const netInfo = useNetInfo();
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const isConnected = useMemo(
    () => netInfo.isConnected ?? true,
    [netInfo.isConnected],
  );
  if (!isConnected) {
    return (
      <View style={[styles.offlineContainer, {width, bottom: insets.bottom}]}>
        <Text style={styles.offlineText}>
          {t("noInternet.networkAbnormality")}
        </Text>
        <ActivityIndicator size="small" color="#fff" />
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
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    zIndex: 10,
  },
  offlineText: {fontSize: 11, color: "#fff"},
});
