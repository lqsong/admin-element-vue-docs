# 新增模块/页面

查看 [路由和菜单](/guide/basis/router-and-menu.html#路由) 文档，可以知道当配置路由时，建议以模块的方式来创建路由，为后期方便维护做铺垫。

## 新增一个模块

比如：新增一个 `页面示例` 模块。

### 新增路由

第一步：创建路由文件 `@/router/modules/pagesample.js`，内容如下：

```js
import LayoutIndex from '@/layout/Index';
const pagesampleRouter = {
    path: '/pagesample',
    component: LayoutIndex,
    name: 'pagesample',
    meta: {
        title: '页面示例',
        icon: 'page',
        roles: ['pagesample']
    },
    children: []
};

export default pagesampleRouter;
```

第二步：在 `@/router/index.js` 文件中引入 `@/router/modules/pagesample.js` 文件。找到对于的位置：内容如下：

```js
// 引入对应模块路由
import pagesampleRouter from '@/router/modules/pagesample'; // 页面示例

export const asyncRoutes = [
  
  // 引入其他模块路由
  pagesampleRouter,

  { path: '*', redirect: '/404', hidden: true }
];
```

::: tip 注意：
 仅仅这样是没有意义的，它只是创建了一个基于 `LayoutIndex` 的一级路由，你还需要在它下面的 children 中添加子路由。
:::

所以，返回第一步进行修改，内容如下：
```js
import LayoutIndex from '@/layout/Index';
const pagesampleRouter = {
    path: '/pagesample',
    component: LayoutIndex,
    redirect: '/pagesample/one',
    name: 'pagesample',
    meta: {
        title: '页面示例',
        icon: 'page',
        roles: ['pagesample']
    },
    children: [
       
        {
            path: 'one',
            component: () => import('@/views/Pagesample/one'),
            name: 'pagesample-one',
            meta: { title: '标准列表', roles: ['pagesample-one'] }
        }
        
    ]
};

export default pagesampleRouter;
```

### 新增 view

并且，创建 vue 文件 `@/views/Pagesample/one.vue`, 内容如下：

```vue
<template>
    <div>这是一个样列</div>
</template>
<script>
export default {
    data () {
      return {}
    }
}
</script>
```
这样你就会发现菜单中就会出现 `标准列表` 菜单了。

## 多级目录(嵌套路由)

以上，只是一个简单的二级路由，或一级路由页面新建，如果你的路由是多级目录， 有三级路由嵌套的情况下，代码应该如下：

### 新增路由

返回上面说的第一步进行修改，内容如下：
```js
import LayoutIndex from '@/layout/Index';
import AppMainLayout from '@/layout/components/AppMain';

const pagesampleRouter = {
    path: '/pagesample',
    component: LayoutIndex,
    redirect: '/pagesample/list/one',
    name: 'pagesample',
    meta: {
        title: '页面示例',
        icon: 'page',
        roles: ['pagesample']
    },
    children: [
        {
            path: 'list',
            component: AppMainLayout,
            redirect: '/pagesample/list/one',
            name: 'pagesample-list',
            meta: { 
                title: '列表页面',
                icon: 'pagelist',
                roles: ['pagesample-list']
            },
            children: [
                {
                    path: 'one',
                    component: () => import('@/views/Pagesample/List/one'),
                    name: 'pagesample-list-one',
                    meta: { title: '标准列表', roles: ['pagesample-list-one'] }
                }
            ]
        }
        
    ]
};

export default pagesampleRouter;
```

### 新增 view

并且，删除上面创建 vue 文件 `@/views/Pagesample/one.vue`, 新建新的 vue 文件 `@/views/Pagesample/List/one.vue`,内容如下：

```vue
<template>
    <div>这是 List/one 的三级路由样列</div>
</template>
<script>
export default {
    data () {
      return {}
    }
}
</script>
```

你就会发现 三级菜单 形成了。以此类推，多级同理。可查看文档 [路由和菜单->多级目录（嵌套路由）](/guide/basis/router-and-menu.html#多级目录-嵌套路由)

## 新增 api ajax请求

最后在 [@/service](https://github.com/lqsong/admin-element-vue/tree/javascript.v1/src/service) 文件夹下创建本模块对应的 api ajax 请求 服务。


