import {useTranslation} from "react-i18next";
const useI18n = () =>
  // prefix?: string
  {
    const {t, i18n} = useTranslation();

    return {
      // t: (key: string, params?: any) =>
      //   t(`${prefix ? `${prefix}.` : ""}${key}`, params),
      t,
      i18n,
    };
  };
export default useI18n;
