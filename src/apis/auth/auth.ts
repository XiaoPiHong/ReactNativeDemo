import {default as http} from "@/utils/request";

/** 注册 */
export const postAuthSignup = data =>
  http.post({
    url: "/auth/signup",
    data,
  });

/** 用户名登录 */
export const postSignInByUsername = data =>
  http.post({
    url: "/auth/sign-in-by-username",
    data,
  });

/** 邮箱登录 */
export const postSignInByEmail = data =>
  http.post({
    url: "/auth/sign-in-by-email",
    data,
  });

/** 获取登录邮箱验证码 */
export const postSendMailForSignIn = data =>
  http.post({
    url: "/auth/send-mail-for-sign-in",
    data,
  });

/** 获取用户信息 */
export const getProfile = () => {
  return http.get({url: "/auth/profile"});
};
