# 单点登录

`admin-element-vue` <Version /> 项目考虑了单点登录的使用情况， 在 **路由和菜单** > [配置参数](/guide/basis/router-and-menu.html#配置参数) 章节，你会发现有下面几个参数：

```javascript
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

## 修改配置

如果你的项目是用到单点登录情况，请把以上参数修改成 `http / https` 的单点登录地址。如下：

```javascript
export const serverLoginUrl = 'http://xxxxx.com/cas'; // 单点登录地址

export const serverLogoutUrl = 'http://xxxxx.com/logout'; // 单点退出地址
```

::: tip 说明：
 `http://xxxxx.com/cas` 就是单点登录的地址，但是为了可实现自动获取来源地址，登录后返回原地址，建议此url地址为后端定义的一个 `中转登录` 的地址，在后端内部程序进行获取来源的前端地址后再跳转到单点登录地址。
:::

## 其他相关代码

当启用单点登录后，建议你把登录路由给隐藏注销：

```js
// @/router/index.js
// 以下内容隐藏或删除
{
    path: '/login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/Login'),
    hidden: true
}
```

权限验证相关代码体现：

```js
// @/router/permission.js
try {
    /* ... */
} catch (error) {
    // 删除Token
    await store.dispatch('user/resetToken');

    Message.error(error || 'Has Error');
    
    // 跳转到登录
    if (isExternal(serverLoginUrl)) {
        window.location.href = serverLoginUrl;
    } else {
        next(siteLoginRouter + "?redirect=" + to.fullPath);
    }
    NProgress.done();
}
```

用户注销相关代码体现：

```js
// @/store/modules/user.js
logout({ commit }) {
        if (isExternal(serverLogoutUrl)) {
            return new Promise((resolve) => {
              commit('SET_TOKEN', '');
              commit('SET_ROLES', []);
              window.location.href = serverLogoutUrl;
              resolve({isExternal: true, siteLoginRouter: siteLoginRouter});
            });
        } else {
           /* ... */
        }
}
```
