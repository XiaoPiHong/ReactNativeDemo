import {Platform} from "react-native";
import i18next, {changeLanguage, getSystemLanguage} from "@/i18n";
import * as storageUtil from "@/utils/storage";
import {useCallback, useEffect} from "react";

export default function useLanguageChange() {
  const handleLocalizationChange = useCallback(() => {
    if (Platform.OS === "android") {
      storageUtil.local.i18n.get().then(res => {
        if (res === "locale" && getSystemLanguage() !== i18next.language) {
          changeLanguage("locale");
        }
      });
    }
  }, []);

  useEffect(() => {
    // 安卓去设置切换语种后回到应用会触发应用重新初始化，若不会重新初始化就需要执行这个函数来手动切换
    // handleLocalizationChange();
  });
}
