1、工具

```txt
安装 nodejs

安装 java jdk：https://www.oracle.com/cn/java/technologies/downloads/#jdk23-windows

安装 android studio

确保选中了以下几项：

Android SDK
Android SDK Platform
Android Virtual Device

安装 Android SDK
配置 ANDROID_HOME 环境变量
把工具目录添加到环境变量 Path
步骤参考地址：https://reactnative.cn/docs/environment-setup

卸载工具，防止遗留的影响，再安装全局工具新建项目 myProject
npm uninstall -g react-native-cli @react-native-community/cli
npx @react-native-community/cliX.XX.X init myProject --version X.XX.X

下载 android studio 中文语言包
选择跟 android studio 对应的版本： https://plugins.jetbrains.com/plugin/13710-chinese-simplified-language-pack----/versions
android studio 中从文件夹选择压缩包安装后重启

启动手机模拟器（没有手机模拟器下载一个）
win11 模拟器启动有坑，似乎这个错误与 Visual C++ Redistributable 有关。（文章地址：https://stackoverflow.com/questions/75570537/android-studio-emulator-process-for-avd-has-terminated-windows-11）下载Latest Microsoft Visual C++ Redistributable Version x64 版本安装后重启
yarn android 运行 app 到模拟器

配置 ts 环境（新版脚手架创建的项目默认支持 ts，旧项目想支持 typescript，nodejs version "^18.18.0 || >=20.0.0"）
```

2、模拟器开发遇到的坑

依赖缓存（有时候 yarn 会存在缓存导致模拟器读取失败，使用 yarn run start:reset 清除缓存）

3、打包

生成一个签名密钥：

```txt
密钥库口令：x
生成签名密钥（在 jdk 中（C:\Program Files\Java\jdk-17\bin）以管理员身份执行命令）
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias 上面的密钥库口令 -keyalg RSA -keysize 2048 -validity 10000
姓氏名称：x
组织单位名称：x
组织名称：x
市：x
省：x
双英文地区：x
```

# 原生安卓生成签名密钥的作用

在原生 Android 应用开发中，**生成签名密钥（Keystore）**是发布和分发 Android 应用的一个非常重要的步骤。签名密钥（通常是一个 `.jks` 或 `.keystore` 文件）用于对 APK 文件进行签名，确保应用的完整性和安全性。它的主要作用如下：

## 1. 验证应用的身份

- **签名密钥**确保了应用的 **身份验证**。每当一个 Android 应用被安装或更新时，系统会检查应用的签名信息。如果应用的签名与先前版本的签名不匹配，用户会收到提示，通常是无法升级或安装该应用。
- 这样，用户可以确信他们安装的应用是来自同一个开发者，而不是被篡改的恶意软件。

## 2. 确保应用的完整性

- 签名是对 APK 文件的一个哈希值，它包括应用的所有文件、资源和代码。签名密钥是基于这些内容生成的哈希值的一部分。如果应用的任何内容（比如代码或资源）被修改或篡改，签名验证将失败。
- 这确保了应用在发布或更新过程中没有被意外或恶意修改，提供了**完整性保护**。

## 3. 发布应用到 Google Play

- 对于通过 **Google Play** 发布应用，签名密钥是必须的。Google Play 要求开发者使用签名密钥对 APK 或 **Android App Bundle (.aab)** 文件进行签名，以确保应用的真实性和安全性。
- Google Play 会根据签名密钥提供 **应用更新管理**。当应用的更新版本使用相同的密钥进行签名时，系统可以将更新应用推送给用户。

## 4. 防止伪造应用

- 使用签名密钥可以有效防止其他开发者伪造你的应用。没有有效的签名密钥，其他人无法重新签名并分发你的应用，因为签名密钥是唯一的并且是私有的。

## 5. 签名密钥的生命周期

- 签名密钥通常在应用的整个生命周期中保持不变。如果丢失了签名密钥，无法再对应用进行更新，因为 Google Play 等平台会要求新的版本使用相同的密钥进行签名。
- 因此，签名密钥的保管至关重要，开发者必须妥善保管 `.jks` 或 `.keystore` 文件，并确保它们的安全。

## 6. 支持应用的不同版本和渠道

- 签名密钥还可以用于不同版本或渠道的管理。如果你为应用的多个版本（例如 beta、稳定版）或不同的分发渠道（例如通过第三方应用商店发布）生成不同的签名密钥，系统可以通过签名来区分这些版本或渠道。

## 7. ProGuard 和 R8 的配合使用

- 在应用进行代码混淆和优化时，ProGuard 和 R8 会与签名密钥一起工作。它们会生成混淆后的代码，但签名密钥可以保证即使经过代码优化或混淆，应用的签名仍然有效。

设置 gradle 变量

把签名配置加入到项目的 gradle 配置中

生成发行 APK 包：（1、也就是生产环境 apk 包，生成的路径：ReactNativeDemo\android\app\build\outputs\apk\release\app-release.apk；2、生产应用和开发应用不能同时存在，因为两者包名是一样的）

```bash
yarn run build:android
```

测试应用的发行版本：（测试发行版本时：1、命令 npx react-native run-android --variant=release 关键字中的 variant 已替换成 mode；2、命令会直接把发行版本安装到设备上，可直接离线运行；3、发行应用和开发应用不能同时存在，因为两者包名是一样的）

```bash
yarn run android:release
```

4、待实现：

增量更新（热更新的方式有很多，增量更新是实现热更新的一种技术方式。增量更新可以作为热更新的一部分，用于确保只更新更改的部分）
