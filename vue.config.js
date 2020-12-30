const path = require("path");
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, "src");
const BUILD_PATH = path.join(__dirname, "dist");
const COMPONENTS_PATH = path.resolve(APP_PATH, "components");
const VIEWS_PATH = path.resolve(APP_PATH, "views");
const ROUTER_PATH = path.resolve(APP_PATH, "router");
const IMAGES_PATH = path.resolve(APP_PATH, "assets/images"); // 图片目录

// 开发api 记录
const devRemoteApi = {
  remote: "http://192.168.0.33:8080", // 本地
};

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/wechat/' : '/',
  
  // build输出的路径
  outputDir: BUILD_PATH,

  // 取消eslint校验代码
  lintOnSave: false,

  // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: true,

  chainWebpack: config =>{
    config.plugin('html')
      .tap(args => {
        args[0].title = "首页";
        return args;
      })
  },
  configureWebpack: {
    devtool: "source-map",
    resolve: {
      alias: { // 配置目录别名
        components: COMPONENTS_PATH,
        router: ROUTER_PATH,
        views: VIEWS_PATH,
        images: IMAGES_PATH
      },
      // 引用js、vue、less、css文件可以省略后缀名
      extensions: [".js", ".vue", ".less", ".css", "json"]
    }
  },

  // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
  productionSourceMap: false,

  // CSS related options
  css: {
    // 将组件中的CSS提取到单个CSS文件中（仅在生产中）
    extract: true,
    // 启用CSS源映射？
    sourceMap: false,

    // 为所有CSS/预处理器文件启用CSS模块。此选项不影响*.vue文件。
    modules: false
  },

  // 在生产构建中使用babel&amp;TS的线程加载器
  // 如果机器有1个以上的核心，则默认启用
  parallel: require("os").cpus().length > 1,

  // 配置Web包开发服务器行为
  devServer: {
    open: true,
    host: "127.0.0.1", // km.z-ata.com", // 0.0.0.0
    port: 8001,
    https: false,
    hotOnly: false,
    disableHostCheck: true,

    // 请求代理配置
    proxy: {
      "/api": {
        target: devRemoteApi.remote,
        changeOrigin: true,
        pathRewrite: {
            '^/api': '' // 重写路径
        }
      }
    }, // string | Object
    before: app => { }
  }
};
