# 介绍

[![Vue](https://img.shields.io/badge/vue-3.x-brightgreen.svg)](https://github.com/vuejs/vue-next)
[![Element Plus](https://img.shields.io/badge/ElementPlus-1.x-brightgreen.svg)](https://github.com/element-plus/element-plus)
[![GitHub stars](https://img.shields.io/github/stars/lqsong/admin-element-vue.svg?style=social&label=Stars)](https://github.com/lqsong/admin-element-vue)


[admin-element-vue-typescript](http://tsv2-demo.admin-element-vue.liqingsong.cc/) 是一个后台前端解决方案，它基于 [Vue3.x](https://github.com/vuejs/vue-next) 、[Element Plus](https://github.com/element-plus/element-plus) 实现。它使用了最新的前端技术栈、动态路由、权限验证、国际化、Mock 数据等，它可以帮助你快速搭建企业级中后台产品原型。相信不管你的需求是什么，本项目都能帮助到你。


## 功能

```
- 登录 / 注销 / 注册

- 权限验证
  - 页面权限
  - 按钮操作
  - 权限配置

- 全局功能
  - 国际化多语言
  - 动态顶级菜单（支持设置是否启用）
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑（支持自定义配置）
  - Svg Sprite 图标
  - Mock 数据

- 综合实例
  - 引导页
  - 组件示例
    - 编辑器
      - CKEditor
      - tui-editor
    - 图标
      - IconSvg
      - IconFont
  - 页面示例
    - 列表页面
      - 表格列表
      - 高度自适应表格
      - 搜索列表
    - 表单页面
      - 基础表单
      - 高级表单      
    - 详情页面
      - 基础详情
      - 模块详情
      - 表格详情
  - 权限验证
```

| **[http://tsv2-demo.admin-element-vue.liqingsong.cc](http://tsv2-demo.admin-element-vue.liqingsong.cc/)**  |
:-------------------------:
| ![Home](https://gitee.com/lqsong/public/raw/master/admin-element-vue-typescript/home.png)  |
| ![Home](https://gitee.com/lqsong/public/raw/master/admin-element-vue-typescript/home2.png)  |



## 前序准备

在开始之前，推荐先学习  [Vue3.x](https://github.com/vuejs/vue-next) 、 [Vuex4.x](https://github.com/vuejs/vuex)、 [Vue-router4.x](https://github.com/vuejs/vue-router-next)、 [ES2015+](http://es6.ruanyifeng.com/) 、 [TypeScript](https://github.com/Microsoft/TypeScript) 、 [Element Plus](https://github.com/element-plus/element-plus) , 了解 [Vue-cli](https://github.com/vuejs/vue-cli) 、 [Axios](https://github.com/axios/axios) 、[Mock.js](https://github.com/nuysoft/Mock) ，提前了解和学习这些知识会对使用本项目有很大的帮助，因为本项目技术栈都是基于它们。并且你需要在本地安装 [node 版本10.13 或以上](http://nodejs.org/) 和 [git](https://git-scm.com/)。

**本项目不支持低版本浏览器(如 ie)**

## 目录结构

本项目已经为你生成了一个完整的开发框架，下面是整个项目的目录结构。

```bash
├── mock                       # Mock文件目录
├── public                     # 静态资源
│   ├── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── assets                 # 静态资源
│   │   ├── css                # 项目公用 CSS 样式
│   │   ├── iconsvg            # svg icons
│   │   └── images             # 项目图片
│   ├── components             # 全局公用组件
│   ├── composables            # 全局 组合式 API
│   ├── config                 # 配置
│   │   │── i18n.ts            # 国际化配置入口
│   │   │── routes.ts          # 路由配置入口
│   │   │── settings.ts        # 站点配置
│   │   └── store.ts           # Vuex Store 配置入口
│   ├── directives             # 全局 自定义指令
│   ├── layout                 # 项目 layout
│   │   ├── IndexLayout        # 项目默认主 Layout
│   │   │   ├── components     # IndexLayout 公共组件
│   │   │   ├── composables    # IndexLayout 公共组合式 API
│   │   │   ├── locales        # IndexLayout 国际化，主要为路由菜单
│   │   │   ├── index.vue      # IndexLayout 模板入口
│   │   │   └── routes.ts      # 使用 IndexLayout 的页面路由配置
│   │   ├── UserLayout         # 项目 UserLayout
│   │   │   ├── locales        # UserLayout 国际化，主要为路由菜单
│   │   │   ├── index.vue      # UserLayout 模板入口
│   │   │   └── routes.ts      # 使用 UserLayout 的页面路由配置
│   │   ├── BlankLayout.vue    # 空 Layout
│   │   └── SecurityLayout.vue # 认证 Layout
│   ├── locales                # 全局国际化文件目录
│   │   ├── en-US.ts           # 全局公用英文国际化配置
│   │   ├── zh-CN.ts           # 全局公用中文简体国际化配置
│   │   ├── zh-TW.ts           # 全局公用中文繁体国际化配置
│   │   └── xxx.ts             # 全局公用其他语言国际化配置
│   ├── services               # 公共数据接口目录（AJAx 请求）
│   ├── store                  # 全局 Store 数据模型目录（Vuex）
│   │   ├── global.ts          # 全局 StoreModule
│   │   └── user.ts            # user 公共StoreModule
│   ├── utils                  # 全局工具函数目录
│   ├── views                  # 页面组件目录(所有页面放在这里)
│   │   └── home               # 页面-首页(这里作为说明样例)
│   │       ├── components     # 当前页面组件目录(可选)
│   │       ├── composables    # 当前页面组合式 API(可选)
│   │       ├── locales        # 当前页面国际化目录(可选)
│   │       ├── data.d.ts      # TS 类型定义文件(可选)
│   │       ├── index.vue      # 当前页面入口
│   │       ├── service.ts     # 当前页面数据接口文件(可选)
│   │       └── store.ts       # 当前页面数据模型文件(可选)
│   ├── App.vue                # App 入口
│   ├── main.ts                # 入口文件 加载组件 初始化等
│   └── shims-vue.d.ts         # Vue TypeScript 配置
├── tests                      # 测试目录
├── .browserslistrc            # 项目的浏览器配置
├── .env.development           # 开发环境变量配置
├── .env.production            # 生产环境变量配置
├── .eslintrc.js               # eslint 配置项
├── .gitignore                 # Git忽略文件配置
├── babel.config.js            # babel-loader 配置
├── jest.config.js             # jest config
├── package.json               # 项目信息
├── README.md                  # readme
├── tsconfig.json              # TypeScript 配置
└── vue.config.js              # vue-cli 配置 
```

## 安装

```bash
# 克隆项目
git clone -b typescript.v2  https://github.com/lqsong/admin-element-vue.git

# 进入项目目录
cd admin-element-vue

# 复制文件
copy .env.development  .env.development.local # 启用或修改里面的参数

# 安装依赖，推荐使用 yarn 
yarn 
# or
npm install

# 本地开发 启动项目
yarn serve
# or
npm run serve
```

> 推荐使用 yarn , **[yarn安装与常用命令](http://liqingsong.cc/article/detail/9)** 。


<br/>

启动完成后会，打开浏览器访问 [http://localhost:8000](http://localhost:8000)， 你看到下面的页面就代表操作成功了。

![Home](https://gitee.com/lqsong/public/raw/master/admin-element-vue-typescript/home.png)

接下来你可以修改代码进行业务开发了，本项目内建了常见的页面模板、模拟数据、全局路由等等各种实用的功能来辅助开发，你可以继续阅读和探索左侧的其它文档。


## Contribution

本文档项目地址 [admin-element-vue-docs](https://github.com/lqsong/admin-element-vue-docs) 基于 [vuepress](https://github.com/vuejs/vuepress)开发。

有任何修改和建议都可以该项目 pr 和 issue

[admin-element-vue-typescript](https://github.com/lqsong/admin-element-vue) 还在持续迭代中，逐步沉淀和总结出更多功能和相应的实现代码，总结中后台产品模板/组件/业务场景的最佳实践。本项目也十分期待你的参与和[反馈](https://github.com/lqsong/admin-element-vue/issues)。

## 捐赠

如果你觉得这个项目帮助到了你，请帮助 [![GitHub stars](https://img.shields.io/github/stars/lqsong/admin-element-vue.svg?style=social&label=Stars)](https://github.com/lqsong/admin-element-vue)，你也可以请作者喝咖啡表示鼓励.

**ALIPAY**             |  **WECHAT**
:-------------------------:|:-------------------------:
![Alipay](https://gitee.com/lqsong/public/raw/master/common/Alipay.png)  |  ![Wechat](https://gitee.com/lqsong/public/raw/master/common/Wechat.png)
