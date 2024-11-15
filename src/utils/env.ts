import {SERVER_URL, BASE_API_URL} from "@env";

/** 配置文件的变量一定要通过该函数获取，不能直接从@env引入，否者模板字符串无法识别 */
const getEnvConfig = () => {
  return {
    SERVER_URL,
    BASE_API_URL,
  };
};

export {getEnvConfig};
