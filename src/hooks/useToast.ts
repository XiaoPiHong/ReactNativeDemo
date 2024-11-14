import {
  useToast as useRNToast,
  ToastOptions,
} from "react-native-toast-notifications";

const useToast = () => {
  const rnToast = useRNToast();

  const toast = {
    warning: (message: string | JSX.Element, options?: ToastOptions) => {
      return rnToast.show(message, {...options, type: "warning"});
    },
    success: (message: string | JSX.Element, options?: ToastOptions) => {
      return rnToast.show(message, {...options, type: "success"});
    },
    danger: (message: string | JSX.Element, options?: ToastOptions) => {
      return rnToast.show(message, {...options, type: "danger"});
    },
    normal: (message: string | JSX.Element, options?: ToastOptions) => {
      return rnToast.show(message, {...options, type: "normal"});
    },
    update: rnToast.update,
    hide: rnToast.hide,
    hideAll: rnToast.hideAll,
    isOpen: rnToast.isOpen,
  };

  return {
    toast,
  };
};

export default useToast;
