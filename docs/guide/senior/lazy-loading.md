# 路由懒加载

当打包构建应用时，Javascript 包会变得非常大，影响页面加载速度。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

结合 Vue 的[异步组件](https://cn.vuejs.org/v2/guide/components.html#异步组件)和 Webpack 的[代码分割功能](https://www.webpackjs.com/guides/code-splitting/)，轻松实现路由组件的懒加载。如：

```js
// vue
new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})
```
```js
// 本项目
{
    path: '/login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/Login'),
    hidden: true
  }
```
