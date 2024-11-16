import qs from "qs";
import * as _ from "lodash-es";
import * as envUtil from "@/utils/env";
import {useUserState, TAppDispatch} from "@/store/store";
import {postRefreshToken} from "@/store/slices/userSlice";
import {useDispatch} from "react-redux";
import useToast from "@/hooks/useToast";

const {BASE_API_URL, SERVER_URL} = envUtil.getEnvConfig();

/**
 * 请求方式 Enum
 */
export enum MethodEnum {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
  HEAD = "HEAD",
}

/**
 * 响应体的内容类型 Enum
 */
export enum ContentTypeEnum {
  APPLICATION_JSON = "application/json", // 默认
  APPLICATION_X_WWW_FORM_URLENCODED = "application/x-www-form-urlencoded",
  MULTIPART_FORM_DATA = "multipart/form-data",
  APPLICATION_VND_MS_EXCEL = "application/vnd.ms-excel",
}

/**
 * 请求选项接口
 */
interface IRequestOptions {
  /** 请求路径 */
  url: string;
  /** 请求方式 */
  method: MethodEnum;
  /** 查询字符串参数 */
  query?: {[key: string]: any};
  /** 请求头 */
  headers?: {[key: string]: any};
  /** 请求载荷 */
  data?: {[key: string]: any};
}

/**
 * 请求函数
 * @param options 请求选项
 */
function request(options: IRequestOptions) {
  const startRequest = () => {
    let {url, method, query, headers = {}, data = {}} = options;
    let body;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const userState = useUserState();
    console.log("token：", `${userState.tokenType} ${userState.accessToken}`);
    headers = new Headers(
      _.merge(
        {
          "Content-Type": ContentTypeEnum.APPLICATION_JSON,
          authorization: `${userState.tokenType} ${userState.accessToken}`,
        },
        headers,
      ),
    );

    switch (headers.get("Content-Type")) {
      case ContentTypeEnum.APPLICATION_JSON:
        body = JSON.stringify(data);
        break;
      case ContentTypeEnum.MULTIPART_FORM_DATA:
        headers.delete("Content-Type"); // 删除使浏览器自动配置才能上传成功
        body = qs.stringify(data); // 自动将 object 转 FormData
        break;
    }
    return fetch(
      `${SERVER_URL}${BASE_API_URL}${url}${
        query ? `?${qs.stringify(query)}` : ""
      }`,
      {
        method,
        headers,
        body:
          method !== MethodEnum.GET && method !== MethodEnum.HEAD
            ? body
            : undefined,
        credentials: "include",
      },
    )
      .then(res => {
        if (res.ok) {
          const contentType = res.headers.get("content-type");

          if (!contentType) {
            return Promise.reject(new Error("响应头未找到 Content-Type 字段"));
          }

          if (contentType.includes(ContentTypeEnum.APPLICATION_JSON)) {
            return res.json().then(body => {
              /** 客户端根据不同 code 的含义，执行相应的响应预处理 */
              switch (body.code) {
                /** 成功 */
                case 200:
                  return body;
                case 401: {
                  const dispatch = useDispatch<TAppDispatch>();

                  return dispatch(
                    postRefreshToken({
                      grant_type: "refresh_token",
                      client_id: "sso-admin",
                      refresh_token: userState.refreshToken,
                    }),
                  ).then(() => {
                    return startRequest();
                  });
                }
                default:
                  return Promise.reject(new Error(body.message));
              }
            });
          }

          return Promise.reject(
            new Error(`客户端不知道如何处理 Content-Type: ${contentType}`),
          );
        }

        return Promise.reject(new Error("未知错误"));
      })
      .catch(error => {
        const {toast} = useToast();
        toast.error(error.message);
        console.log(error.message);
        return Promise.reject(error);
      });
  };

  return startRequest();
}

/**
 * 创建请求函数，通过指定的请求方式
 * @param method 请求方式
 */
const createRequest = (method: MethodEnum) => {
  return (options: Omit<IRequestOptions, "method">) =>
    request({
      ...options,
      method,
    });
};

export default {
  get: createRequest(MethodEnum.GET),
  head: createRequest(MethodEnum.HEAD),
  patch: createRequest(MethodEnum.PATCH),
  put: createRequest(MethodEnum.PUT),
  post: createRequest(MethodEnum.POST),
  delete: createRequest(MethodEnum.DELETE),
};
