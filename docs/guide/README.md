# 介绍

[![vue](https://img.shields.io/badge/vue-2.6.10-brightgreen.svg)](https://github.com/vuejs/vue)
[![element-ui](https://img.shields.io/badge/element--ui-2.13.0-brightgreen.svg)](https://github.com/ElemeFE/element)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/lqsong/admin-element-vue/blob/javascript.v1/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/lqsong/admin-element-vue.svg?style=social&label=Stars)](https://github.com/lqsong/admin-element-vue)


[admin-element-vue <Version />](http://jsv1-demo.admin-element-vue.liqingsong.cc/) 是一个后台前端解决方案，它基于 [Webpack](https://github.com/webpack/webpack) 、[Vue2.x](https://github.com/vuejs/vue) 和 [element-ui](https://github.com/ElemeFE/element)实现。它使用了最新的前端技术栈，动态路由，权限验证，它可以帮助你快速搭建企业级中后台产品原型。相信不管你的需求是什么，本项目都能帮助到你。


## 功能

```
- 登录 / 注销

- 权限验证
  - 页面权限
  - 权限配置

- 全局功能
  - 动态顶级菜单（支持设置是否启用）
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑（支持自定义配置）
  - Svg Sprite 图标
  - Mock 数据

- 综合实例
  - 引导页
  - 组件示例
    - 编辑器
    - 树形表格
    - 其他组件  
  - 页面示例
    - 列表页面
    - 表单页面
    - 详情页面
  - ECharts 图表
```

**[Default version demo](http://jsv1-demo.admin-element-vue.liqingsong.cc/)**             |  **[BgImg version demo](http://bgimg-demo.admin-element-vue.liqingsong.cc/)**
:-------------------------:|:-------------------------:
![Default version demo](https://gitee.com/lqsong/public/raw/master/admin-element-vue/admin1.png)  |  ![BgImg version demo](https://gitee.com/lqsong/public/raw/master/admin-element-vue/admin2.png)


## 前序准备

你需要在本地安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。本项目技术栈基于 [ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/) 、[vue-cli](https://github.com/vuejs/vue-cli) 、[axios](https://github.com/axios/axios) 和 [element-ui](https://github.com/ElemeFE/element)，所有的请求数据都使用[Mock.js](https://github.com/nuysoft/Mock)进行模拟，提前了解和学习这些知识会对使用本项目有很大的帮助。

**本项目不支持低版本浏览器(如 ie)**

## 目录结构

本项目已经为你生成了一个完整的开发框架，下面是整个项目的目录结构。

```bash
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── assets                 # 静态资源
│   │   ├── css                # 项目所有 CSS 样式 主题
│   │   ├── icons              # 项目所有 svg icons
│   │   └── images             # 项目图片
│   ├── components             # 全局公用组件
│   ├── layout                 # 全局 layout
│   ├── mock                   # 项目 mock 模拟数据
│   ├── router                 # 路由
│   │   ├── modules            # 各模块路由
│   │   ├── index.js           # 路由入口
│   │   └── permission.js      # 权限管理
│   ├── service                # 所有 AJAx 请求
│   ├── store                  # 全局 store 管理
│   ├── utils                  # 全局公用方法
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.ext.default.js    # main.js 的扩展 文件 (复制重命名为 main.ext.js)
│   ├── main.js                # 入口文件 加载组件 初始化等
│   └── settings.js            # 系统配置文件
├── tests                      # 测试
├── .browserslistrc            # 项目的浏览器配置
├── .env.xxx                   # 环境变量配置
├── .eslintrc.js               # eslint 配置项
├── .babel.confi.js            # babel-loader 配置
├── vue.config.default.js      # vue-cli 配置(复制重命名为 vue.config.js)
└── package.json               # package.json
```

## 安装

```bash
# 克隆项目
git clone -b javascript.v1  https://github.com/lqsong/admin-element-vue.git

# 进入项目目录
cd admin-element-vue

# 复制文件
copy src/main.ext.default.js  src/main.ext.js
copy vue.config.default.js  vue.config.js

# 安装依赖
npm install

# 建议不要用 cnpm 安装  可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 本地开发 启动项目
npm run serve
```


<br/>

启动完成后会，打开浏览器访问 [http://localhost:8081](http://localhost:8081)， 你看到下面的页面就代表操作成功了。

![](https://gitee.com/lqsong/public/raw/master/admin-element-vue/admin1.png)

接下来你可以修改代码进行业务开发了，本项目内建了常见的页面模板、模拟数据、状态管理、全局路由等等各种实用的功能来辅助开发，你可以继续阅读和探索左侧的其它文档。


## Contribution

本文档项目地址 [admin-element-vue-docs](https://github.com/lqsong/admin-element-vue-docs) 基于 [vuepress](https://github.com/vuejs/vuepress)开发。

有任何修改和建议都可以该项目 pr 和 issue

[admin-element-vue](https://github.com/lqsong/admin-element-vue) 还在持续迭代中，逐步沉淀和总结出更多功能和相应的实现代码，总结中后台产品模板/组件/业务场景的最佳实践。本项目也十分期待你的参与和[反馈](https://github.com/lqsong/admin-element-vue/issues)。

## 捐赠

如果你觉得这个项目帮助到了你，请帮助 [![GitHub stars](https://img.shields.io/github/stars/lqsong/admin-element-vue.svg?style=social&label=Stars)](https://github.com/lqsong/admin-element-vue)，你也可以请作者喝咖啡表示鼓励 :coffee:

**ALIPAY**             |  **WECHAT**
:-------------------------:|:-------------------------:
![Alipay](http://uploads.liqingsong.cc/20210430/f62d2436-8d92-407d-977f-35f1e4b891fc.png)  |  ![Wechat](http://uploads.liqingsong.cc/20210430/3e24efa9-8e79-4606-9bd9-8215ce1235ac.png)
