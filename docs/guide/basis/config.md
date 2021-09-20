# 配置

配置是开发一个后台项目的重要环节，它是一个后台项目的基础。想要了解一个后台项目，先要了解它的配置。

## 站点配置

`admin-element-vue-typescript` 内置了一个站点配置文件 `@/config/settings.ts`。

```ts
import { RoutesDataItem } from "@/utils/routes";

export interface SettingsType {
  /**
   * 站点名称
   */
  siteTitle: string;

  /**
   * 顶部菜单开启
   */
  topNavEnable: boolean;

  /**
   * 头部固定开启
   */
  headFixed: boolean;

  /**
   * tab菜单开启
   */
  tabNavEnable: boolean;

  /**
   * 站点首页路由
   */
  homeRouteItem: RoutesDataItem;
  

  /**
   * 站点本地存储Token 的 Key值
   */
  siteTokenKey: string;

  /**
   * Ajax请求头发送Token 的 Key值
   */
  ajaxHeadersTokenKey: string;

  /**
   * Ajax返回值不参加统一验证的api地址
   */
  ajaxResponseNoVerifyUrl: string[];

  /**
   * iconfont.cn 项目在线生成的 js 地址
   */
  iconfontUrl: string[];

}

const settings: SettingsType = {
  siteTitle: 'ADMIN-ELEMENT-VUE',
  topNavEnable: true,
  headFixed: true,
  tabNavEnable: true,
  homeRouteItem: {
      icon: 'control',
      title: 'index-layout.menu.home.workplace',
      path: '/home/workplace',
      component: ()=> import('@/views/home/index.vue')
  },
  siteTokenKey: 'admin_element_vue_token',
  ajaxHeadersTokenKey: 'x-token',
  ajaxResponseNoVerifyUrl: [
    '/user/login', // 用户登录
    '/user/info', // 获取用户信息
  ],
  iconfontUrl: [],
};

export default settings;

```

## 路由入口配置文件

`admin-element-vue-typescript` 独立出了一个路由入口配置文件 `@/config/routes.ts`，其目的主要是：统一引入`@/layouts`下不同`layout`的路由，集中处理重新格式化路由。

目前 `@/config/routes.ts` 的内容为：

```ts
import { createRouter, createWebHashHistory } from 'vue-router';
import { RoutesDataItem } from "@/utils/routes";
import settings from "@/config/settings";

import SecurityLayout from '@/layouts/SecurityLayout.vue';

import IndexLayoutRoutes from '@/layouts/IndexLayout/routes';
import IndexLayout from '@/layouts/IndexLayout/index.vue';

import UserLayoutRoutes from '@/layouts/UserLayout/routes';
import UserLayout from '@/layouts/UserLayout/index.vue';

const routes: RoutesDataItem[] = [
  {
    title: 'empty',
    path: '/',
    component: SecurityLayout,
    children: [
      {
        title: 'empty',
        path: '/',
        redirect: settings.homeRouteItem.path,
        component: IndexLayout,
        children: IndexLayoutRoutes
      },
      {
        title: 'empty',
        path: '/refresh',
        component: () => import('@/views/refresh/index.vue'),
      },
    ]
  },  
  {
    title: 'empty',
    path: '/user',
    redirect: '/user/login',
    component: UserLayout,
    children: UserLayoutRoutes
  },
  {
    title: 'app.global.menu.notfound',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404/index.vue'),
  }
]

const router = createRouter({
  scrollBehavior(/* to, from, savedPosition */) {
    return { top: 0 }
  },
  history: createWebHashHistory(process.env.BASE_URL),
  routes: routes,
});

export default router;
```

::: tip 说明：
详细文档请查看：[路由和菜单](/guide/basis/router-and-menu.md)
:::

## Vuex Store 数据模型入口配置文件

`admin-element-vue-typescript` 集成了 `Vuex`，配置文件 `@/config/store.ts` 实现了自动导入功能，并制定了 `StoreModule规则`。

::: tip 说明：
详细文档请查看：[StoreModule](/guide/basis/store-module.md)
:::


## 国际化入口配置文件

`admin-element-vue-typescript` 包含了国际化功能，并实现了自动导入功能，主要归功于国际化入口配置文件 `@/config/i18n.ts`。

目前 `@/config/i18n.ts` 的内容为：

```ts
import { createI18n } from "vue-i18n";
import { getLocale, setLocale, importAllLocales } from "@/utils/i18n";

/**
 * elementUI 多语言 配置
 */
import enUS from 'element-plus/lib/locale/lang/en';
import zhCN from 'element-plus/lib/locale/lang/zh-cn';
import zhTW from 'element-plus/lib/locale/lang/zh-tw';
export const elementPlusMessages: { [key: string]: any} = {
    'zh-CN': zhCN,
    'zh-TW': zhTW,
    'en-US': enUS,
}


/**
 * 框架 多语言 配置
 */
export const messages = importAllLocales();

const i18n = createI18n({
    legacy: false,
    locale: getLocale(),
    messages,
});


/**
 * 设置语言
 * @param locale 
 */
export function setI18nLanguage(locale: string, realReload = false) {  
    setLocale(locale,realReload, function() {
        // i18n.global.locale = locale // legacy: true
        i18n.global.locale.value = locale;        
    })
}

export default i18n;

```

::: tip 说明：
详细文档请查看：[多语言](/guide/basis/locales.md)
:::






## vue-cli 配置

`admin-element-vue-typescript` 基于 `vue-cli`来进行构建，所以有个 vue-cli 配置文件 `/vue.config.js`。

[官方文档](https://cli.vuejs.org/zh/config/)


## 环境变量
`admin-element-vue-typescript` 基于 `vue-cli`来进行构建，所以有环境变量配置文件 `/.env.development`、`/.env.production`。

[官方文档](https://cli.vuejs.org/zh/guide/mode-and-env.html)


