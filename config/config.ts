export default {
  appType: 'PC',
  proxy: {
    "/api": {
      "target": "https://pvp.qq.com/web201605/js/",
      "changeOrigin": true,
      "pathRewrite": { "^/api": "" }
    }
  }
};
