import React, {ReactNode} from "react";
import {ViewStyle, StyleProp, ViewProps} from "react-native";
import {StatusBar, StyleSheet, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useTheme, IThemeContext} from "@/context/useThemeContext";

interface ILayoutProps extends ViewProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Layout = ({children, style, ...rest}: ILayoutProps) => {
  const {theme}: Partial<IThemeContext> = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
      {...rest}>
      <StatusBar
        animated
        backgroundColor={theme.cardBg}
        barStyle={theme?.name === "light" ? "dark-content" : "light-content"}
      />
      <View style={[styles.layout, {backgroundColor: theme?.layoutBg}, style]}>
        {children}
      </View>
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {flex: 1},
  layout: {
    flex: 1,
  },
});
