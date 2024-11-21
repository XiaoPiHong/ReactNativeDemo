module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
      },
    ],
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [
          ".ios.ts",
          ".android.ts",
          ".ts",
          ".ios.tsx",
          ".android.tsx",
          ".tsx",
          ".jsx",
          ".js",
          ".json",
          "jpg",
          "jpeg",
          "png",
        ],
        alias: {
          "@": "./src",
        },
      },
    ],
    "react-native-reanimated/plugin", // 该插件需要放在最后
  ],
};
