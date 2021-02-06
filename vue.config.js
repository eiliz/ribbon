module.exports = {
  devServer: {
    proxy: {
      "^/json": {
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true,
        logLevel: "debug"
      }
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();

    svgRule
      .use("vue-loader")
      .loader("vue-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader");
  }
};
