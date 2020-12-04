# 配置

配置是开发一个后台项目的重要环节，它是一个后台项目的基础。想要了解一个后台项目，先要了解它的配置。

## 系统配置

`admin-element-vue` <Version /> 内置了一个系统配置文件 `@/settings.js`。

```javascript
/**
 * 站点名称
 */
 export const siteTitle = 'ADMIN-ELEMENT-VUE';

 /**
 * 是否固定右侧头部(默认配置)
 */
export const siteFiexdHeader = true;

 /**
 * 是否启用顶部导航(默认配置)
 */
export const siteTopNavEnable = true;

 /**
 * 是否显示侧边栏LOGO(默认配置)
 */
export const siteSidebarLogo = true;

 /**
 * 站点本地存储TokenKey
 */
 export const siteTokenKey = "admin_element_vue_token";

/**
 * Ajax请求头TokenKey
 */
export const ajaxHeadersTokenKey = "X-Token";

/**
 * 站点登录路由地址
 */
 export const siteLoginRouter = "/login";
 

/**
 * ajax请求 - 返回数据 - 不添加前置验证的 URL
 */
export const ajaxResponseNoVerifyUrl = [
    '/user/login', // 用户登录
    '/user/info' // 获取用户信息
];

/**
 * 服务端登录,请求ajax地址/跳转地址
 * 外链如单点登录：serverLoginUrl = process.env.VUE_APP_APIHOST + '/cas';
 * 内部：serverLoginUrl = '/login';
 */
export const serverLoginUrl = '/user/login';

/**
 * 服务端退出,请求ajax地址/跳转地址
 * 若是单点登录：serverLogoutUrl = process.env.VUE_APP_APIHOST + '/logout'; 退出方法函数直接 window.location.href = serverLogoutUrl;
 * 若是内部ajax：serverLoginUrl = '/logout';
 */
export const serverLogoutUrl = '/user/logout';

```

## main.js 入口文件

`@/main.js` 是项目的入口文件，它的作用是加载组件、初始化等。但是为了防止在开发或生产环境中，不同开发人员或环境的不同导致配置的反复修改或冲突，所以本项目添加了一个 `@/main.js` 的默认扩展文件 `@/main.ext.default.js`，请复制并重名为 `@/main.ext.js`。

目前 `@/main.ext.js` 的内容为：

```javascript
/**
 * main.js 的扩展 文件
 * 可在此文件 新增/编辑/删除 不同用户/开发/生产等环境下，变动的代码或配置  
 * @author LiQingSong
 */


/**
 * Mockjs 模拟器
 * 生成环境下或不想使用，请隐藏或删除
 */
import '@/mock';
```

::: tip 说明：
这个就保证了，不同用户，不同环境下，如果有特殊的需求或代码，满足不同用户环境的同时保证代码的维护性。当有公用的代码并且必须需要时可在 `@/main.js` 中进行添加调整，个人或环境私用可在 `@/main.ext.js` 中进行添加调整。
:::


## vue-cli 配置

`admin-element-vue` <Version /> 基于 `vue-cli`来进行构建，所以有个 vue-cli 配置文件 `/vue.config.js`，但是为了防止在开发或生产环境中，不同开发人员或环境的不同导致配置冲突，所以本项目添加了一个默认的文件 `/vue.config.default.js`，请复制并重名为 `/vue.config.js`。

```bash
├── public                     # 静态资源
├── src                        # 源代码
├── vue.config.default.js      # vue-cli 配置(复制重命名为 vue.config.js)
└── package.json               # package.json
```

[官方文档](https://cli.vuejs.org/zh/config/)

::: tip 注意：
当某个开发人员在 `/vue.config.js` 中修改或添加新的功能代码时，如果此修改或新增功能是全局的（其他开发人员或环境也能用到），请一定也要在 `/vue.config.default.js` 中进行调整或新增。这样就能保证代码的有效性与实用性。
:::

## 环境变量
`admin-element-vue` <Version /> 基于 `vue-cli`来进行构建，所以所有的环境变量配置都是基于`vue-cli`来实现和控制的。

[官方文档](https://cli.vuejs.org/zh/guide/mode-and-env.html)

```
.env                # 在所有的环境中被载入
.env.[mode]         # 只在指定的模式中被载入
```

一个环境文件只包含环境变量的“键=值”对：

```
FOO=bar
VUE_APP_SECRET=secret
```

::: tip 注意：
环境变量必须以`VUE_APP_`为开头。如:`VUE_APP_API`、`VUE_APP_TITLE`

你在代码中可以通过如下方式获取:

```js
console.log(process.env.VUE_APP_xxxx)
```

:::

除了 `VUE_APP_*` 变量之外，在你的应用代码中始终可用的还有两个特殊的变量：

- `NODE_ENV` - 会是 "development"、"production" 或 "test" 中的一个。具体的值取决于应用运行的模式。
- `BASE_URL` - 会和 `vue.config.js` 中的 `publicPath` 选项相符，即你的应用会部署到的基础路径。

