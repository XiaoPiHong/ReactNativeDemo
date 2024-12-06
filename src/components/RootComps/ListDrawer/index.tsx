import React, {
  forwardRef,
  useImperativeHandle,
  ForwardedRef,
  useState,
  useEffect,
} from "react";
import {StyleSheet} from "react-native";
import {ScrollView, View} from "react-native";
import {Drawer} from "react-native-drawer-layout";
import {useTheme} from "@/context/useThemeContext";
import {IconButton, Text} from "react-native-paper";
import {XUpdate, UpdateArgs} from "@/utils/xupdate";

const ListRenderDrawerContent = () => {
  const {theme} = useTheme();

  const [versionInfo, setVersionInfo] = useState<{
    versionCode: number;
    versionName: string;
  } | null>(null);

  const onPressVersionBtn = () => {
    if (!versionInfo) {
      return;
    }
    const appInfo = {
      hasUpdate: true,
      isIgnorable: false,
      versionCode: 3,
      versionName: "1.0.5",
      updateLog:
        "\r\n1、这是直接传入UpdateEntity进行更新。\r\n2、添加使用demo演示。\r\n3、新增自定义更新服务API接口。",
      apkUrl:
        "https://down.qq.com/qqweb/QQ_1/android_apk/Android_8.5.0.5025_537066738.apk",
      apkSize: 4096,
    };

    /** 对比版本再提示是否更新 */
    const {versionCode, versionName} = versionInfo;
    if (
      versionName !== appInfo.versionName ||
      versionCode > appInfo.versionCode
    ) {
      let args = new UpdateArgs();
      args.supportBackgroundUpdate = true;
      XUpdate.updateByInfo(args, {
        hasUpdate: appInfo.hasUpdate,
        versionCode: appInfo.versionCode,
        versionName: appInfo.versionName,
        updateContent: appInfo.updateLog,
        downloadUrl: appInfo.apkUrl,
        //选填
        isIgnorable: appInfo.isIgnorable,
        apkSize: appInfo.apkSize,
      });
    }
  };

  const initVersion = async () => {
    const vInfo = await XUpdate.getAppVersion();
    setVersionInfo(vInfo);
  };

  useEffect(() => {
    console.log("initVersion");
    initVersion();
  }, []);

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
            onPress={onPressVersionBtn}></IconButton>
          <Text style={{color: theme.colors.primary}}>当前版本</Text>
          <Text style={{color: theme.colors.primary}}>
            {versionInfo?.versionName}
          </Text>
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
