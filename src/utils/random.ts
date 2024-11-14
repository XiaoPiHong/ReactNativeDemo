// src/utils/randomUtils.ts

import {randomBytes} from "react-native-randombytes";

/**
 * 生成指定长度的字母数字随机字符串
 * @param {number} length - 生成字符串的长度
 * @returns {string} - 随机字母数字字符串
 */
export const generateRandomString = (length: number): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // 字母数字字符集
  const bytes = randomBytes(length); // 生成随机字节

  let result = "";

  // 使用字节数组中的每个字节来从字符集随机选择一个字符
  for (let i = 0; i < length; i++) {
    const randomIndex = bytes[i] % chars.length; // 确保索引在字符范围内
    result += chars[randomIndex]; // 拼接字符
  }

  return result;
};
