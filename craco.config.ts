export default {
  babel: {
    presets: [
      ["@babel/preset-env", { targets: { node: "current" }, modules: false }],
      "@babel/preset-typescript",
      "@babel/preset-react",
    ],
  },
  typescript: {
    enableTypeChecking: true,
  },
  jest: {
    configure: {
      transform: {
        [`^(axios).+\\.js$`]: "babel-jest",
      },
      transformIgnorePatterns: [`node_modules/(?!(axios))`],
      moduleNameMapper: {
        axios: "<rootDir>/node_modules/axios/dist/node/axios.cjs",
      },
    },
  },
};
