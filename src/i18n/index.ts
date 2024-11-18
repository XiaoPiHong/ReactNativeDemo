// intl-pluralrules解决环境似乎与 Intl API 不兼容问题
import "intl-pluralrules";
import i18next, {ModuleType} from "i18next";
import {initReactI18next} from "react-i18next";
import * as RNLocalize from "react-native-localize";
import * as storageUtil from "@/utils/storage";
import {navigationRef} from "@/components/RootNavigation";
import {useUserState} from "@/store/store";

const languageDetector = {
  type: "languageDetector" as ModuleType,
  async: true,
  detect: function (callback) {
    // 获取上次选择的语言
    storageUtil.local.i18n.get().then(lng => {
      console.log("i18n初始化时", lng);
      // 如果是跟随本地，则获取系统语言
      if (lng === "locale") {
        callback(getSystemLanguage());
      } else {
        callback(lng);
      }
    });
  },
};

// 设置默认语言跟随本地
storageUtil.local.i18n.set("locale");

// 初始化i18next配置
i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "zh", // 切换语言失败时的使用的语言
    debug: __DEV__, // 开发环境开启调试
    // 资源文件
    resources: {
      en: {
        translation: require("@/locales/en-US.json"),
      },
      zh: {
        translation: require("@/locales/zh-CN.json"),
      },
    },
    react: {
      useSuspense: false,
    },
  });

/**
 * 获取当前系统语言
 * @returns {string}
 */
export const getSystemLanguage = (): string => {
  const locales = RNLocalize.getLocales();
  return locales[0].languageCode;
};

/**
 * 切换语言（需要等redux和navigation初始化完成后才能调用）
 * @param lng
 */
export const changeLanguage = async (lng?: "en" | "zh" | "locale") => {
  // 切换语言
  await i18next.changeLanguage(lng === "locale" ? getSystemLanguage() : lng);
  // 持久化当前选择
  await storageUtil.local.i18n.set(lng);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const userState = useUserState();

  // 跳转回对应的初始页
  navigationRef.reset(
    userState.accessToken
      ? {index: 0, routes: [{name: "HomeTab"}]}
      : {index: 0, routes: [{name: "Login"}]},
  );
};

export default i18next;
