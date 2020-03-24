# 路由和菜单

路由和菜单是组织起一个后台应用的关键骨架。

本项目顶部菜单、侧边栏菜单是和路由绑定在一起的，所以你只要在 `@/router/index.js` 内配置对应的路由，菜单就能动态的生成了。大大减轻了手动重复编辑菜单的工作量。当然这样就需要在配置路由的时候遵循一些约定的规则。

## 配置参数

首先我们了解一些本项目配置路由时提供了哪些配置项。

```js
// 链接,自动判断是内部路由或外链
//   如： 内部路由 /home， 外链 /^(https?:|mailto:|tel:)/.test(path)
path: '/home' // 必填

// 当设置 true 的时候该路由不会在菜单中出现
//   如: 401，login等页面，或者如一些编辑页面/edit/1
hidden: true // (默认 false)

// 重定向，当设置时路由直接重定向到设置的地址
redirect: '' // (默认 '')

// 路由的名字，
name:'router-name', // 必填

meta : {

    // 权限控制，页面角色(您可以设置多个角色)
    roles: ['admin','test'] // 不设置此参数 默认 所有角色都有权限

    // 标题，路由在菜单、浏览器title 或 面包屑中展示的文字
    title: 'title' // 推荐设置

    // svg图标的名称，显示在菜单标题前
    icon: 'svg-name' 

    /** 
     * 面包屑自定义内容：
     *     1、默认不配置按照路由自动读取；
     *     2、设置为 false , 按照路由自动读取并不读当前自己；
     *     3、配置对应的面包屑格式如下： 
     */
    breadcrumb: [                
          {
            meta: { title: '标题' },   // 必填

            // 链接， 内部路由 /demo ， 外链 /^(https?:|mailto:|tel:)/.test(path)
            linkpath: '/demo', // 可不写， (默认 '')
          }
    ],      
    
    // 侧栏选中，如果设置路径，侧栏将突出显示你设置的路径对应的侧栏导航
    activeMenu: '/example/list' // （默认 router.path），此参数是为了满足特殊页面特殊需求，如果详情页等选中侧栏导航或在模块A下面的页面，想选模块B为导航选中状态
    
    /**
     * 所属顶级菜单,当顶级菜单存在时，用于选中顶部菜单，与侧栏菜单切换
     *   1、三级路由此参数的作用是选中顶级菜单
     *   2、二级路由此参数的作用是所属某个顶级菜单的下面，两个层级的必须同时填写一致
     */
    belongTopMenu: '/news' // (默认不设置 path.split('/')[0])，此参数是为了满足特殊页面特殊需求
                                            
}

```

<br/>

**示例：**

```js
{
    path: '/',
    redirect: '/home', // 重定向地址 /home
    component: LayoutIndex,
    meta: { title: '首页', icon: 'home' },
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home'),
        name: 'home',
        meta: { 
            title: '主控台', 
            icon: 'control', 
            belongTopMenu: '/' // 设置 所属顶级菜单
        }
      },
      {
        path: 'monitor',
        component: () => import('@/views/Home'),
        name: 'monitor',
        meta: { 
            title: '监控页',
            icon: 'monitoring',
            belongTopMenu: '/', // 设置 所属顶级菜单
            breadcrumb: [ // 自定义面包屑
              {
                meta: { title: '自定义面包屑' }
              },
              {
                meta: { title: '后台首页' },
                linkpath: '/home'
              },
              {
                meta: { title: '网页小功能' },
                linkpath: 'http://www.wyxgn.com'
              },
              {
                meta: { title: '监控页' }
              }
            ]
        }
      }
    ]
  }
```

## 路由

这里的路由分为两种，`constantRoutes` 和 `asyncRoutes`。

**constantRoutes：** 代表那些不需要动态判断权限的路由，如登录页、404、等通用页面。

**asyncRoutes：** 代表那些需求动态判断权限并通过 `addRoutes` 动态添加的页面。

关于具体的动态判断会在 [权限验证](permission.md) 页面介绍，这里只介绍路由的目录结构与书写格式。

::: tip @/router 内目录：
```bash
router                     # 路由
├── modules                # 各模块路由
│   ├── chartstatistic.js  # 图表统计模块-路由配置（样例）
│   ├── pagesample.js      # 页面示例模块-路由配置（样例）
│   └── xxxx.js            # 其他模块路由配置（更多这样的模块）
├── index.js               # 路由入口
└── permission.js          # 权限管理
```
:::

::: tip @/router/index.js - asyncRoutes内容：
```bash
/**
 * 异步路由
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  
  // 引入其他模块路由
  pagesampleRouter,
  chartstatisticRouter,

  { path: '*', redirect: '/404', hidden: true }
];
```
:::

::: warning 注： 这里有两种书写方式：

   一、按照以上模块类型划分进行书写；<br>
   二、也可以都在 `@/router/index.js - asyncRoutes` 中直接进行书写,如下：
   ```bash
    /**
    * 异步路由
    * 需要根据用户角色动态加载的路由
    */
    export const asyncRoutes = [
    
       {
            path: '/chartstatistic',
            component: LayoutIndex,
            redirect: '/chartstatistic/echarts/one',
            name: 'chartstatistic',
            meta: {
                title: '图表统计',
                icon: 'chart',
                roles: ['chartstatistic']
            },
            children: [
                {
                    path: 'echarts',
                    component: AppMainLayout,
                    redirect: '/chartstatistic/echarts/one',
                    name: 'chartstatistic-echarts',
                    meta: { 
                        title: 'ECharts',
                        icon: 'chart',
                        roles: ['chartstatistic-echarts']
                    },
                    children: [
                        {
                            path: 'one',
                            component: () => import('@/views/Chartstatistic/Echarts/one'),
                            name: 'chartstatistic-echarts-one',
                            meta: { title: '基础引用', roles: ['chartstatistic-echarts-one'] }
                        },
                        {
                            path: 'two',
                            component: () => import('@/views/Chartstatistic/Echarts/two'),
                            name: 'chartstatistic-echarts-two',
                            meta: { title: '更换主题', roles: ['chartstatistic-echarts-two'] }
                        }
                    ]
                }
                
                
            ]
        },

        { path: '*', redirect: '/404', hidden: true }
    ];
  ```

:::

::: tip
这里所有的路由页面都使用 `路由懒加载` 了 ，具体介绍见[文档](/guide/senior/lazy-loading.html)

如果你想了解更多关于 browserHistory 和 hashHistory，请参看 [构建和发布](/guide/basis/build-and-release.html)。
:::

其它的配置和 [vue-router](https://router.vuejs.org/zh-cn/) 官方并没有区别，自行查看文档。

::: warning 注意事项
这里有一个需要非常注意的地方就是 `404` 页面一定要最后加载，如果放在 constantRoutes 一同声明了 `404` ，后面的所以页面都会被拦截到`404` ，详细的问题见 [addRoutes when you've got a wildcard route for 404s does not work](https://github.com/vuejs/vue-router/issues/1176)
:::



## 顶部菜单

本项目 **顶部菜单** 的出现是为了满足不同用户的需求。

前面也介绍了，菜单是通过读取路由并结合权限判断而动态生成的，当然也包括顶部菜单。

::: tip 代码地址
[@/layout/Index/LayoutIndexRightTop](https://github.com/lqsong/admin-element-vue/blob/master/src/layout/Index/LayoutIndexRightTop.vue#L10)

**注意**

顶部菜单必须在 **配置->系统配置** 中配置启用顶部菜单，才会出现，具体见[文档](/guide/basis/config.html#系统配置)
:::


## 侧边栏菜单

本项目 **侧边栏菜单** 主要基于 `element-ui` 的 `el-menu` 改造。

前面也介绍了，菜单是通过读取路由并结合权限判断而动态生成的，当然也包括侧边栏菜单，而且还需要支持路由无限嵌套，所以这里还使用到了递归组件。

::: tip 代码地址
[@/layout/components/SidebarMenuItem](https://github.com/lqsong/admin-element-vue/tree/master/src/layout/components/SidebarMenuItem)
:::

这里同时也改造了 `element-ui` 默认侧边栏不少的样式，所有的 css 都可以在 [@/assets/css/sidebar-menu.scss](https://github.com/lqsong/admin-element-vue/blob/master/src/assets/css/sidebar-menu.scss) 中找到，你也可以根据自己的需求进行修改。

::: warning 注意事项
这里有一个非常需要注意的地方就是，如果开启了 **顶部菜单** , 那 **侧边栏菜单** 会按照路由的正常层级，走第二级开始往下递归；如果没有开启，则走第一级开始往下递归。
:::


一般侧边栏有两种形式即：`submenu` 和 直接 `el-menu-item`。 一个是嵌套子菜单，另一个则是直接一个链接。如下图：

![](https://gitee.com/lqsong/public/raw/master/admin-element-vue/menu-demo.png)

在 `@/layout/components/SidebarMenuItem` 中已经帮你做了判断，当你一个路由下面的 `children` 声明的路由大于>0 个时，自动会变成嵌套的模式。如果子路由不存在则直接显示一个链接，如果刚好你的子路由只有一个，你又不想显示嵌套形的，你可以把那个子路由的 `hidden: true `开启，然后父路由的跳转开启`redirect: '子路由地址' `。如：

```js
{
    path: '/',
    redirect: '/home',
    component: LayoutIndex,
    meta: { title: '首页', icon: 'home' },
    children: [
      {
        path: 'home',
        hidden: true,
        component: () => import('@/views/Home'),
        name: 'home',
        meta: { title: '主控台', activeMenu: '/', belongTopMenu: '/' }
      }
    ]
}
```

## 侧边栏 外链

你也可以在侧边栏中配置一个外链，只要你在 `path` 中填写了合法的 url 路径，当你点击侧边栏的时候就会帮你新开这个页面。

例如：

```js
{
  path: "https://github.com/lqsong/admin-element-vue",
  component: LayoutIndex,
  meta: { title: '首页', icon: 'home' }
}
```

## 多级目录(嵌套路由)

一、如果你的路由是多级目录，如本项目中那样，有三级路由或更多嵌套的情况下，需要借助于 [@/layout/components/AppMain](https://github.com/lqsong/admin-element-vue/blob/master/src/layout/components/AppMain/index.vue) 用法如下：

```js
import LayoutIndex from '@/layout/Index';
import AppMainLayout from '@/layout/components/AppMain';

const chartstatisticRouter = {
    path: '/chartstatistic',
    component: LayoutIndex,
    redirect: '/chartstatistic/echarts/one',
    name: 'chartstatistic',
    meta: {
        title: '图表统计',
        icon: 'chart',
        roles: ['chartstatistic']
    },
    children: [
        {
            path: 'echarts',
            component: AppMainLayout,
            redirect: '/chartstatistic/echarts/one',
            name: 'chartstatistic-echarts',
            meta: { 
                title: 'ECharts',
                icon: 'chart',
                roles: ['chartstatistic-echarts']
            },
            children: [
                {
                    path: 'one',
                    component: () => import('@/views/Chartstatistic/Echarts/one'),
                    name: 'chartstatistic-echarts-one',
                    meta: { title: '基础引用', roles: ['chartstatistic-echarts-one'] }
                },
                {
                    path: 'two',
                    component: () => import('@/views/Chartstatistic/Echarts/two'),
                    name: 'chartstatistic-echarts-two',
                    meta: { title: '更换主题', roles: ['chartstatistic-echarts-two'] }
                }
            ]
        }
        
        
    ]
};

export default chartstatisticRouter;
```
::: tip 说明
也就是除了第一级，用到 `LayoutIndex` 组件，如：`component: LayoutIndex`；第二级只需用到 `AppMain` 组件即可，如： `component: AppMainLayout`; 以此类推，如果往下还有层级只需要用到 `AppMain` 组件即可。
:::

二、 如果你的路由只有两级，用法如下：
```js
import LayoutIndex from '@/layout/Index';

const chartstatisticRouter = {
    path: '/chartstatistic',
    component: LayoutIndex,
    redirect: '/chartstatistic/one',
    name: 'chartstatistic',
    meta: {
        title: '图表统计',
        icon: 'chart',
        roles: ['chartstatistic']
    },
    children: [
        
        {
            path: 'one',
            component: () => import('@/views/Chartstatistic/Echarts/one'),
            name: 'chartstatistic-one',
            meta: { title: '基础引用', roles: ['chartstatistic-one'] }
        },
        {
            path: 'two',
            component: () => import('@/views/Chartstatistic/Echarts/two'),
            name: 'chartstatistic-two',
            meta: { title: '更换主题', roles: ['chartstatistic-two'] }
        }
    
    ]
};

export default chartstatisticRouter;
```

## 面包屑


本项目中封装了一个面包屑导航，它也是通过 `watch $route` 变化动态生成的。它和 menu 也一样，也可以通过之前那些配置项控制一些路由在面包屑中的展现。你可以结合自己的业务需求增改这些自定义属性。参照 [配置参数](#配置参数) 中的 `breadcrumb` 参数

![](https://gitee.com/lqsong/public/raw/master/admin-element-vue/breadcrumb.png)
![](https://gitee.com/lqsong/public/raw/master/admin-element-vue/breadcrumb-cus.png)

::: tip 代码地址
[@/components/Breadcrumb](https://github.com/lqsong/admin-element-vue/blob/master/src/components/Breadcrumb/index.vue)
:::

**样例：**
```js
    // 默认路由自动获取
    {
        path: 'home',
        component: () => import('@/views/Home'),
        name: 'home',
        meta: { 
            title: '主控台', 
            icon: 'control', 
            belongTopMenu: '/' // 设置 所属顶级菜单
        }
    },

    // 自定义
    {
        path: 'monitor',
        component: () => import('@/views/Home'),
        name: 'monitor',
        meta: { 
            title: '监控页',
            icon: 'monitoring',
            belongTopMenu: '/', // 设置 所属顶级菜单
            breadcrumb: [ // 自定义面包屑
                {
                    meta: { title: '自定义面包屑' }
                },
                {
                    meta: { title: '后台首页' },
                    linkpath: '/home'
                },
                {
                    meta: { title: '网页小功能' },
                    linkpath: 'http://www.wyxgn.com'
                },
                {
                    meta: { title: '监控页' }
                }
            ]
        }
    }

```




