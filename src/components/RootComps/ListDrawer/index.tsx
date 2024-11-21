import React, {forwardRef, useImperativeHandle, ForwardedRef} from "react";
import {StyleSheet} from "react-native";
import {ScrollView, View} from "react-native";
import {Drawer} from "react-native-drawer-layout";
import {useTheme} from "@/context/useThemeContext";
import {IconButton, Text} from "react-native-paper";

const ListRenderDrawerContent = () => {
  const {theme} = useTheme();
  const onPress = () => {};
  return (
    <View style={styles.contentLayout}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View
          style={{
            alignItems: "center",
          }}>
          <IconButton
            icon="cellphone-arrow-down"
            mode="contained-tonal"
            iconColor={theme.colors.primary}
            size={30}
            onPress={onPress}></IconButton>
          <Text style={{color: theme.colors.primary}}>当前版本</Text>
          <Text style={{color: theme.colors.primary}}>1.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export interface IListDrawerActionType {
  setOpen: (open: boolean) => void;
}
const ListDrawer = (
  props: {children: React.ReactNode},
  ref: ForwardedRef<IListDrawerActionType>,
) => {
  const {theme} = useTheme();
  const {children} = props;
  const [open, setOpen] = React.useState(false);

  useImperativeHandle(ref, () => ({
    setOpen,
  }));
  return (
    <Drawer
      drawerPosition="left"
      drawerType="front"
      drawerStyle={{
        width: "25%",
        backgroundColor: theme.colors.background,
      }}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={ListRenderDrawerContent}>
      {children}
    </Drawer>
  );
};

const ForwardedListDrawer = forwardRef(ListDrawer) as (
  props: {children: React.ReactNode} & {
    ref?: ForwardedRef<IListDrawerActionType>;
  },
) => ReturnType<typeof ListDrawer>;

export default ForwardedListDrawer;

const styles = StyleSheet.create({
  contentLayout: {
    flex: 1,
  },
  scrollContentContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
});
