import Toast, {ToastShowParams, ToastOptions} from "react-native-toast-message";

const useToast = () => {
  const text1Style: ToastOptions["text1Style"] = {
    fontSize: 16,
  };
  const text2Style: ToastOptions["text2Style"] = {
    fontSize: 14,
  };

  const toast = {
    success: (
      msg: string,
      showParams: Omit<ToastShowParams, "type" | "text2"> = {},
    ) => {
      return Toast.show({
        text1Style,
        text2Style,
        ...showParams,
        type: "success",
        text1: showParams.text1 || "success",
        text2: msg,
      });
    },

    error: (
      msg: string,
      showParams: Omit<ToastShowParams, "type" | "text2"> = {},
    ) => {
      return Toast.show({
        text1Style,
        text2Style,
        ...showParams,
        type: "error",
        text1: showParams.text1 || "error",
        text2: msg,
      });
    },
    info: (
      msg: string,
      showParams: Omit<ToastShowParams, "type" | "text2"> = {},
    ) => {
      return Toast.show({
        text1Style,
        text2Style,
        ...showParams,
        type: "info",
        text1: showParams.text1 || "info",
        text2: msg,
      });
    },
    hide: () => {
      return Toast.hide();
    },
  };

  return {
    toast,
  };
};

export default useToast;
