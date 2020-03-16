# 布局

页面整体布局是一个产品最外层的框架结构，往往会包含导航、侧边栏、面包屑以及内容等。想要了解一个后台项目，先要了解它的基础布局。

## Layout/Index

::: tip 对应代码
[@/layout/Index](https://github.com/lqsong/admin-element-vue/blob/master/src/layout/Index/index.vue)
:::

采用的是 **Flex 布局**，`admin-element-vue` 中大部分页面都是基于这个 `layout/Index` 的，除了个别页面如：`login` , `404` 等页面没有使用该 `layout/Index`。如果你想在一个项目中有多种不同的`layout` 也是很方便的，只要在一级路由那里选择不同的`layout`组件就行。

```js
// 没有用 layout
{
    path: '/login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/Login'),
    hidden: true
},  

// 用了 layout/Index
{
    path: '/',
    redirect: '/home',
    component: LayoutIndex,
    meta: { title: '首页', icon: 'home' },
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home'),
        name: 'home',
        meta: { title: '主控台', icon: 'control', belongTopMenu: '/' }
      }
      
    ]
}

```

这里使用了 vue-router [路由嵌套](https://router.vuejs.org/zh/guide/essentials/nested-routes.html), 所以一般情况下，你增加或者修改页面只会影响 `app-main`这个主体区域。其它配置在 `layout` 中的内容如：侧边栏或者导航栏都是不会随着你主体页面变化而变化的。

```
/profile                              /posts
+------------------+                  +-----------------+
| layout           |                  | layout          |
| +--------------+ |                  | +-------------+ |
| | Profile      | |  +------------>  | | Posts       | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```

当然你也可以一个项目里面使用多个不同的 `layout`，只要在你想作用的路由父级上引用它就可以了。

::: tip 注意：
`layout/Index`,通过 [系统配置文件](/guide/basis/config.html#系统配置) 的 **是否启用顶部导航** 选项，可以设置为：有/无顶部导航等情况。
:::

### 有顶部导航

![](https://gitee.com/lqsong/public/raw/master/admin-element-vue/topnav-admin-home.png)

### 无顶部导航

![](https://gitee.com/lqsong/public/raw/master/admin-element-vue/notopnav-admin-home.png)

## app-main

::: tip 对应代码
[@/layout/components/AppMain](https://github.com/lqsong/admin-element-vue/blob/master/src/layout/components/AppMain/index.vue)
:::

`app-main` 主要功能是引入了 `<router-view>` ，配合 **路由和菜单->[多级目录（嵌套路由）](/guide/basis/router-and-menu.html#多级目录-嵌套路由)**  使用。

## router-view

::: tip 官方文档
[文档](https://router.vuejs.org/zh/api/#router-view)
:::