/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React, {useEffect} from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";
import ReduxProvider from "@/store";
import ThemeProvider from "@/context/useThemeContext";
import {NoInternetToast} from "@/components/NoInternet";
import SplashScreen from "react-native-splash-screen";
import RootNavigation from "@/components/RootNavigation";
import {XUpdate, InitArgs} from "@/utils/xupdate";
import Toast from "react-native-toast-message";
import "@/i18n";

function App(): React.JSX.Element {
  //自定义的异常处理
  const errorListener = error => {
    //下载失败
    if (error.code === 4000) {
      XUpdate.showRetryUpdateTip(
        "Github被墙无法继续下载，是否考虑切换蒲公英下载？",
        "https://www.pgyer.com/flutter_learn",
      );
    }
    console.log({
      _message: "发送异常：" + JSON.stringify(error),
    });
  };

  //自定义解析
  const customParser = json => {
    let appInfo = JSON.parse(json);
    return {
      //必填
      hasUpdate: appInfo.hasUpdate,
      versionCode: appInfo.versionCode,
      versionName: appInfo.versionName,
      updateContent: appInfo.updateLog,
      downloadUrl: appInfo.apkUrl,
      //选填
      isIgnorable: appInfo.isIgnorable,
      apkSize: appInfo.apkSize,
    };
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    let args = new InitArgs();
    args.debug = true;
    args.isPostJson = false;
    args.timeout = 25000;
    args.isWifiOnly = false;
    args.isAutoMode = false;
    args.supportSilentInstall = false;
    args.enableRetry = false;

    XUpdate.init(args)
      .then(result => {
        console.log("初始化成功:" + JSON.stringify(result));
      })
      .catch(error => {
        console.log("初始化失败:" + JSON.stringify(error));
      });

    // 设置自定义解析
    XUpdate.setCustomParser({parseJson: customParser});
    // 设置错误监听
    XUpdate.addErrorListener(errorListener);
  }, []);

  return (
    <SafeAreaProvider>
      <ReduxProvider>
        <ThemeProvider>
          <RootNavigation />
          <NoInternetToast />
          <Toast />
        </ThemeProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  );
}

export default App;
