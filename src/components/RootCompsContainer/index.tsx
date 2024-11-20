import React from "react";
import {StyleSheet} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useTheme} from "@/context/useThemeContext";

const RootCompsContainer = () => {
  const insets = useSafeAreaInsets();
  const {theme} = useTheme();
  return <></>;
};

const styles = StyleSheet.create({});

export default RootCompsContainer;
