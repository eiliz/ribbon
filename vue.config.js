const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const devPlugins = [new BundleAnalyzerPlugin()];

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
        // logLevel: "debug"
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
  },
  pwa: {
    workboxOptions: {
      exclude: [/_redirects/]
    }
  },
  configureWebpack: {
    plugins: process.env.NODE_ENV !== "production" ? devPlugins : []
  },
  productionSourceMap: false
};
