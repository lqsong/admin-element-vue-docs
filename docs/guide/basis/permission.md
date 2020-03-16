# 权限验证

项目中权限的实现方式是：通过获取当前用户的权限去比对路由表，生成当前用户具有的权限，可访问的路由表，通过 `router.addRoutes` 动态挂载到 `router` 上。

## 使用方法

### 一、角色类型法：

**角色类型法** 意思就是：定义几个角色名称然后在定义的路由上写好，请求服务器接口，服务器返回用户的角色类型，如：

```js
[
  {
    path: '/login',
    meta: {
      title: '登录',
      roles: ['admin','test']
    },
    component: () => import('@/views/Login')    
  },

  {
    path: '/404',
    meta: {
      title: 'Not Found',
      roles: ['test']
    },
    component: () => import('@/views/404')    
  },
  {
    path: '/',
    meta: {
      title: '首页',
      roles: ['admin']
    },
    component: () => import('@/views/home')
  }
]
```
以上定义了两个角色，`admin` 和 `test`,当请求用户信息时，服务端可以返回 `admin` 角色 或 `test` 角色 或 两个角色都返回；但是这个的话，用户前台把角色类型写死了，后端也就只能定义这两种角色，而且不合理，所以此方法一般不会用到。


### 二、权限列表法：

**权限列表法** 意思就是：思考的维度可能不一样，把每个路由做一个权限，这样就形成了一个权限路由列表，如：

```js
[
  {
    path: '/login',
    meta: {
      title: '登录',
      roles: ['login']
    },
    component: () => import('@/views/Login')    
  },

  {
    path: '/404',
    meta: {
      title: 'Not Found',
      roles: ['404']
    },
    component: () => import('@/views/404')    
  },
  {
    path: '/',
    meta: {
      title: '首页',
      roles: ['home']
    },
    component: () => import('@/views/home')
  }
]
```
以上可以看出每个路由就是一个权限；当然要保存权限名称的唯一，这样如果有n个路由就会有n个路由权限，然后前端把这些名称整理交给后端做一个权限列表表，后端自己定义角色选择对应的权限，当前端请求用户信息时，后端根据用户的角色把权限列表返回给前端，这样后端就可以自定义角色选择权限了。此方法常用。


