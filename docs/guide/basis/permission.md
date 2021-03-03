# 权限验证

## 权限实现方式

本项目`IndexLayout`中权限的实现方式分以下内容：

### 菜单的生成

通过获取当前用户的权限去比对路由配置的`roles`参数，判断当前用户具有的权限，可访问的路由表，动态生成菜单。

### 路由页面访问权限

`IndexLayout` 中通过 [@/components/Permission](https://github.com/lqsong/admin-element-vue/tree/vite.ts/src/components/Permission) 组件判断权限进行展示。

### 页面按钮权限

- 1、页面中的按钮可以通过[@/components/Permission](https://github.com/lqsong/admin-element-vue/tree/vite.ts/src/components/Permission) 组件验证权限是否展示。

- 2、页面中的按钮可以通过[@/directives/permission](https://github.com/lqsong/admin-element-vue/tree/vite.ts/src/directives/permission) 自定义指令验证权限是否展示。

使用样例：[代码](https://github.com/lqsong/admin-element-vue/tree/vite.ts/src/views/roles/all)，[样例](http://vitets-demo.admin-element-vue.liqingsong.cc/#/roles/all)


## 路由`roles`使用方法

### 一、角色类型法：

**角色类型法** 意思就是：定义几个角色名称然后在定义的路由上写好，请求服务器接口，服务器返回用户的角色类型，如：

```js
[
  {
    title: 'empty',
    path: '/login',
    roles: ['admin','test'],
    component: ()=> import('@/views/user/Login/index.vue')   
  },

  {
    title: 'empty',
    path: '/404',
    roles: ['test'],
    component: ()=> import('@/views/404/index.vue') 
  },
  {
    title: 'empty',
    path: '/home',
    roles: ['admin'],
    component: ()=> import('@/views/home/index.vue')    
  }
]
```
以上定义了两个角色，`admin` 和 `test`,当请求用户信息时，服务端可以返回 `admin` 角色 或 `test` 角色 或 两个角色都返回；但是这个的话，用户前台把角色类型写死了，后端也就只能定义这两种角色，而且不合理，所以此方法一般不会用到。


### 二、权限列表法：

**权限列表法** 意思就是：思考的维度可能不一样，把每个路由做一个权限，这样就形成了一个权限路由列表，如：

```js
[
  {
    title: '',
    path: '/login',
    roles: ['login'],
    component: ()=> import('@/views/user/Login/index.vue')  
  },

  {
    title: '',
    path: '/404',
    roles: ['404'],
    component: ()=> import('@/views/404/index.vue')   
  },
  {
    title: '',
    path: '/home',
    roles: ['home'],
    component: ()=> import('@/views/home/index.vue')   
  }
]
```
以上可以看出每个路由就是一个权限；当然要保存权限名称的唯一，这样如果有n个路由就会有n个路由权限，然后前端把这些名称整理交给后端做一个权限列表表，后端自己定义角色选择对应的权限，当前端请求用户信息时，后端根据用户的角色把权限列表返回给前端，这样后端就可以自定义角色选择权限了。此方法常用。


