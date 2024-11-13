import React from "react";
import {Text, View, Button} from "react-native";
import Layout from "@/layout";
import {XUpdate, UpdateArgs} from "@/utils/xupdate";

// {
//   "Code": 0,
//   "Msg": "",
//   "UpdateStatus": 1,
//   "VersionCode": 3,
//   "VersionName": "1.0.2",
//   "UploadTime": "2018-07-10 17:28:41",
//   "ModifyContent": "\r\n1、优化api接口。\r\n2、添加使用demo演示。\r\n3、新增自定义更新服务API接口。\r\n4、优化更新提示界面。",
//   "DownloadUrl": "https://xuexiangjys.oss-cn-shanghai.aliyuncs.com/apk/xupdate_demo_1.0.2.apk",
//   "ApkSize": 2048,
//   "ApkMd5": "E4B79A36EFB9F17DF7E3BB161F9BCFD8"
// }
const _updateUrl =
  "https://gitee.com/xuexiangjys/XUpdate/raw/master/jsonapi/update_test.json";

// {
//   "Code": 0,
//   "Msg": "",
//   "UpdateStatus": 2,
//   "VersionCode": 3,
//   "VersionName": "1.0.2",
//   "UploadTime": "2018-07-10 17:28:41",
//   "ModifyContent": "\r\n1、优化api接口。\r\n2、添加使用demo演示。\r\n3、新增自定义更新服务API接口。\r\n4、优化更新提示界面。",
//   "DownloadUrl": "https://xuexiangjys.oss-cn-shanghai.aliyuncs.com/apk/xupdate_demo_1.0.2.apk",
//   "ApkSize": 4096,
//   "ApkMd5": "E4B79A36EFB9F17DF7E3BB161F9BCFD8"
// }
const _updateUrl2 =
  "https://gitee.com/xuexiangjys/XUpdate/raw/master/jsonapi/update_forced.json";

// {
//   "hasUpdate": true,
//   "isIgnorable": true,
//   "versionCode": 3,
//   "versionName": "1.0.2",
//   "updateLog": "\r\n1、优化api接口。\r\n2、添加使用demo演示。\r\n3、新增自定义更新服务API接口。\r\n4、优化更新提示界面。",
//   "apkUrl": "https://xuexiangjys.oss-cn-shanghai.aliyuncs.com/apk/xupdate_demo_1.0.2.apk",
//   "apkSize": 4096
// }
const _updateUrl3 =
  "https://gitee.com/xuexiangjys/XUpdate/raw/master/jsonapi/update_custom.json";

function SettingsScreen() {
  const checkUpdateDefault = () => {
    let args = new UpdateArgs(_updateUrl);
    XUpdate.update(args);
  };

  const checkUpdateSupportBackground = () => {
    let args = new UpdateArgs(_updateUrl);
    args.supportBackgroundUpdate = true;
    XUpdate.update(args);
  };

  const checkUpdateRatio = () => {
    let args = new UpdateArgs(_updateUrl);
    args.widthRatio = 0.6;
    XUpdate.update(args);
  };

  const checkUpdateForce = () => {
    let args = new UpdateArgs(_updateUrl2);
    XUpdate.update(args);
  };

  const checkUpdateAutoMode = () => {
    let args = new UpdateArgs(_updateUrl);
    args.isAutoMode = true;
    XUpdate.update(args);
  };

  const enableChangeDownLoadType = () => {
    let args = new UpdateArgs(_updateUrl);
    args.overrideGlobalRetryStrategy = true;
    args.enableRetry = true;
    args.retryContent = "Github下载速度太慢了，是否考虑切换蒲公英下载？";
    args.retryUrl = "https://www.pgyer.com/flutter_learn";
    XUpdate.update(args);
  };

  const showRetryDialogTip = () => {
    XUpdate.showRetryUpdateTip(
      "Github下载速度太慢了，是否考虑切换蒲公英下载？",
      "https://www.pgyer.com/flutter_learn",
    );
  };

  const customJsonParse = () => {
    let args = new UpdateArgs(_updateUrl3);
    args.isCustomParse = true;
    XUpdate.update(args);
  };

  const AppInfo = {
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
  const checkUpdateByUpdateEntity = () => {
    let args = new UpdateArgs();
    args.supportBackgroundUpdate = true;
    XUpdate.updateByInfo(args, {
      hasUpdate: AppInfo.hasUpdate,
      versionCode: AppInfo.versionCode,
      versionName: AppInfo.versionName,
      updateContent: AppInfo.updateLog,
      downloadUrl: AppInfo.apkUrl,
      //选填
      isIgnorable: AppInfo.isIgnorable,
      apkSize: AppInfo.apkSize,
    });
  };

  const customPromptDialog = () => {
    let args = new UpdateArgs(_updateUrl);
    args.themeColor = "#FFFFAC5D";
    args.topImageRes = "bg_update_top";
    args.buttonTextColor = "#FFFFFFFF";
    XUpdate.update(args);
  };

  return (
    <Layout>
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>Settings!</Text>
        <Button title="默认App更新" onPress={checkUpdateDefault} />
        <Button
          title="默认App更新 + 支持后台更新"
          onPress={checkUpdateSupportBackground}
        />
        <Button onPress={checkUpdateRatio} title="调整宽高比" />
        <Button onPress={checkUpdateForce} title="强制更新" />
        <Button
          onPress={checkUpdateAutoMode}
          title="自动模式"
          color="#2196F3"
        />
        <Button
          onPress={enableChangeDownLoadType}
          title="下载时点击取消允许切换下载方式"
          color="#2196F3"
        />
        <Button
          onPress={showRetryDialogTip}
          title="显示重试提示弹窗"
          color="#2196F3"
        />
        <Button
          onPress={customJsonParse}
          title="使用自定义json解析"
          color="#2196F3"
        />
        <Button
          onPress={checkUpdateByUpdateEntity}
          title="直接传入UpdateEntity进行更新"
          color="#2196F3"
        />
        <Button
          onPress={customPromptDialog}
          title="自定义更新弹窗样式"
          color="#2196F3"
        />
      </View>
    </Layout>
  );
}

export default SettingsScreen;
