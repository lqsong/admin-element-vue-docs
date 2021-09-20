# 布局

页面整体布局是一个产品最外层的框架结构，往往会包含导航、侧边栏、面包屑以及内容等。想要了解一个后台项目，先要了解它的基础布局。

## IndexLayout

::: tip 对应代码
[@/layouts/IndexLayout](https://github.com/lqsong/admin-element-vue/tree/typescript.v2/src/layouts/IndexLayout)
:::

IndexLayout 采用的是 **Flex 布局**，`@/layouts/IndexLayout` 目录内容如下：


```bash
IndexLayout        # 项目默认主 Layout
├── components     # IndexLayout 公共组件
├── composables    # IndexLayout 公共组合式 API
├── locales        # IndexLayout 国际化，主要为路由菜单
├── index.vue      # IndexLayout 入口
└── routes.ts      # 使用 IndexLayout 的页面路由配置
```

:::warning 重要：
如何使用 `IndexLayout` 主要在于 `IndexLayout/routes.ts` 页面路由配置文件。
:::

### 配置路由导航

> 比如：`@/views/home` 页面，想使用 `IndexLayout`，你就可以在 `IndexLayout/routes.ts` 中做出如下配置：


```ts
import { RoutesDataItem } from '@/utils/routes';

/**
 * Index Layout 路由页面
 */
const IndexLayoutRoutes: RoutesDataItem[] = [
  {
    icon: 'home',
    title: 'index-layout.menu.home',
    path: '/home',
    component: ()=> import('@/views/home/index.vue'),
  },
];
export default IndexLayoutRoutes;
```

这样你访问 `http://localhost:8000/#/home` 就可以看到一个使用了 `IndexLayout` 的页面了。

:::tip 重点：
`IndexLayout/routes.ts` 路由配置对应参数说明请查看 [路由和菜单](/guide/basis/router-and-menu.md)
:::

> `IndexLayout` 通过 [配置/站点配置](/guide/basis/config.md#站点配置) 中的 **顶部菜单开启** 配置项，可以设置为：有/无顶部导航等情况，如下：

### 有顶部导航

![有顶部导航](https://gitee.com/lqsong/public/raw/master/admin-element-vue-typescript/home.png)

### 无顶部导航

![无顶部导航](https://gitee.com/lqsong/public/raw/master/admin-element-vue-typescript/home2.png)

## UserLayout

> 不是所有页面都会用到 `IndexLayout` , 比如**登录** 、 **注册** 等页面，所以本项目增加了 `UserLayout`。

::: tip 对应代码
[@/layouts/UserLayout](https://github.com/lqsong/admin-element-vue/tree/typescript.v2/src/layouts/UserLayout)
:::

`UserLayout` 与 `IndexLayout` 目录内容基本一致，`@/layouts/UserLayout` 目录内容如下：

```bash
UserLayout         # 项目 UserLayout
├── locales        # UserLayout 国际化，主要为路由菜单
├── index.vue      # UserLayout 入口
└── routes.ts      # 使用 UserLayout 的页面路由配置
```


:::warning 重要：
与 `IndexLayout` 类似, 如何使用 `UserLayout` 主要在于 `UserLayout/routes.ts` 页面路由配置文件。
:::

### 配置路由导航

> 比如：登录页[`@/views/user/login`]、注册页[`@/views/user/register`]，想使用 `UserLayout`，你就可以在 `UserLayout/routes.ts` 中做出如下配置：


```ts
import { RoutesDataItem } from '@/utils/routes';

/**
 * User Layout 路由页面
 */
const UserLayoutRoutes: RoutesDataItem[] = [
  {
    title: 'user-layout.menu.login',
    path: '/user/login',
    component: ()=> import('@/views/user/login/index.vue'),
  },
  {
    title: 'user-layout.menu.register',
    path: '/user/register',
    component: ()=> import('@/views/user/register/index.vue'),
  },
];

export default UserLayoutRoutes;

```

这样你访问 `http://localhost:8000/#/user/login` 、 `http://localhost:8000/#/user/register` 就可以看到一个使用了 `UserLayout` 的登录、注册页面了。

:::tip 重点：
与 `IndexLayout` 一致, `UserLayout/routes.ts` 路由配置对应参数说明请查看 [路由和菜单](/guide/basis/router-and-menu.md)
:::



## 自定义Layout

> 在实际的项目开发中，以上 Layout 并不一定能满足要求，这就需要我们自定义新增 Layout 了。比如我们自定义一个 `MemberLayout`，步骤如下：

### 一、创建目录结构

在目录 `@/layouts` 下创建 `MemberLayout` 文件夹，目录如下，

```bash
MemberLayout       # MemberLayout
├── locales        # MemberLayout 国际化，主要为路由菜单
├── index.vue      # MemberLayout 入口
└── routes.ts      # 使用 MemberLayout 的页面路由配置
```

以上文件对应的代码可以参照  `UserLayout` 修改和删减。

### 二、导入框架路由

`MemberLayout` 创建完成后，需要保证可以路由使用，所以就需要把 `MemberLayout/routes.ts` 导入 `@/config/routes.ts` 中， `@/config/routes.ts` 新增如下代码：

```ts
import { createRouter, createWebHashHistory } from 'vue-router';
import { RoutesDataItem } from "@/utils/routes";
import settings from "@/config/settings";

import SecurityLayout from '@/layouts/SecurityLayout.vue';

import IndexLayoutRoutes from '@/layouts/IndexLayout/routes';
import IndexLayout from '@/layouts/IndexLayout/index.vue';

import UserLayoutRoutes from '@/layouts/UserLayout/routes';
import UserLayout from '@/layouts/UserLayout/index.vue';


/**
 * Member Layout 路由页面
 */
import MemberLayoutRoutes from '@/layouts/MemberLayout/routes'; // 新增代码
import MemberLayout from '@/layouts/MemberLayout/index.vue'; // 新增代码


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

  /* 新增代码 S */
  {
    title: 'empty',
    path: '/member',
    component: MemberLayout,
    children: MemberLayoutRoutes
  },
  /* 新增代码 E */

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

:::tip 至此新增自定义Layout完成：
使用方法与 `UserLayout` 、 `IndexLayout` 一致。
:::

