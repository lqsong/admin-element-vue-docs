# 认证与权限 {#index}

在实际应用中，我们不止需要像前台那样游客可以直接访问页面，还需要像后台那样登录认证后才能访问，且需要验证权限等这样的功能。


## 认证实现方式 {#security}

本项目认证的实现方式主要是 [SecurityLayout](/guide/layout.html#security) 布局框架，它的主要逻辑是请求后端获取用户信息，验证用户是否登录，如果登录就通过，否则跳到登录页面。


## 权限实现方式 {#permission}

一、本项目权限的实现方式，主要是 `/src/components/Permission` 组件，详细内容如下：

```vue
<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "@/store/user";
import { hasPermissionRoles } from "@/utils/router";

interface PermissionProps {
	roles?: string | string[];
}
const props = withDefaults(defineProps<PermissionProps>(), {});

const userStore = useUserStore();

// 是否有权限
const isPermission = computed(() => hasPermissionRoles(userStore.roles, props.roles));
</script>
<template>
	<slot v-if="isPermission"></slot>
	<slot v-else name="nodata">
		<div class="ft-permission-no-data">无权限</div>
	</slot>
</template>
<style lang="scss" scoped>
.ft-permission-no-data {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100px;
}
</style>
```

> 此组件是获取当前登录的用户信息，与传入进来的 `roles` 进行判断验证。

二、[MemberLayout](/guide/layout.html#member) 布局框架再结合组件 `Permission` 和当前框架的路由 `meta.roles` 字段进行权限的验证。



## 路由 `meta.roles` 字段使用方法 {#meta-roles}

一、角色类型法：

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

> 以上定义了两个角色，`admin` 和 `test`,当请求用户信息时，服务端可以返回 `admin` 角色 或 `test` 角色 或 两个角色都返回；但是这个的话，用户前台把角色类型写死了，后端也就只能定义这两种角色，而且不合理，所以此方法一般不会用到。


二、权限列表法：

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

> 以上可以看出每个路由就是一个权限；当然要保存权限名称的唯一，这样如果有n个路由就会有n个路由权限，然后前端把这些名称整理交给后端做一个权限列表表，后端自己定义角色选择对应的权限，当前端请求用户信息时，后端根据用户的角色把权限列表返回给前端，这样后端就可以自定义角色选择权限了。此方法常用。

