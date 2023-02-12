# 布局 {#index}

页面整体布局是一个产品最外层的框架结构，往往会包含导航、侧边栏、面包屑以及内容等。想要了解一个后台项目，先要了解它的基础布局。

本项目按照功能性简单的封装了以下几个布局，自己可以在此基础上改版。

## 位置 {#location}

`/src/layouts` 目录下。

## UserLayout {#user}

> User布局，项目针对 `登录页` 、 `注册页` 等，独立做了此布局，你也可以使用默认布局。

一、`index.vue` 布局内容如下：

```vue
<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import SwitchThemeModel from "@/components/SwitchThemeModel/index.vue";

import { formatRoutes } from "@/utils/router";
import { useTitle } from "@/composables/useTitle";
import layoutRotes from "./routes";

const route = useRoute();

// 框架所有菜单路由 与 patch key格式的所有菜单路由
const routerPathKeyRouter = ref(formatRoutes(layoutRotes));

// 当前路由 item
const routeItem = computed(() => routerPathKeyRouter.value.pathKeyRouter[route.path]);

// 设置title
useTitle(routeItem);
</script>
<template>
	<div class="user-layout">
		<div class="theme-switch"><SwitchThemeModel /></div>
		<router-view />
	</div>
</template>
<style scoped lang="scss">
.user-layout {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	.theme-switch {
		position: fixed;
		top: 10px;
		right: 10px;
	}
}
</style>
```

> 布局内容只是样列，自己可以进行重构。


二、`routes.ts` 路由，内容如下：

```ts
import { RouteRecordRaw } from "vue-router";

const UserLayoutRoutes: RouteRecordRaw[] = [
	{
		path: "/user",
		redirect: "/user/login",
		children: [
			{
				meta: {
					title: "登录",
				},
				path: "login",
				component: () => import("@/pages/user/login/index.vue"),
			},
		],
	},
];

export default UserLayoutRoutes;
```


## SecurityLayout {#security}

> 认证布局，在实际应用中，我们不止需要像前台那样游客可以直接访问页面，还需要像后台那样登录认证后才能访问。

**此布局是配合其他布局使用的。如：配合 `MemberLayout` 。**

布局内容如下:

```vue
<script lang="ts" setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import PageLoading from "@/components/PageLoading/index.vue";

const router = useRouter();
const userStore = useUserStore();

// 读取当前用户信息
const getUser = async () => {
	const { code, msg } = await userStore.getInfo();
	if (code === 1) {
		// 未登录或登入信息失效
		router.replace({
			path: "/user/login",
			query: {
				redirect: router.currentRoute.value.path,
				...router.currentRoute.value.query,
			},
		});
	} else {
		if (code !== 0) {
			// 没有获取用户信息成功
			console.log("error msg", msg);
			alert(msg);
		}
	}
};
onMounted(() => {
	getUser();
});
</script>
<template>
	<router-view v-if="userStore.isLogin" />
	<PageLoading v-else />
</template>
```


## MemberLayout {#member}

> Member布局，在实际应用中，我们不止需要像前台那样游客可以直接访问页面，还需要像后台那样登录认证后才能访问，且需要验证权限等这样的功能。

一、`index.vue` 布局内容如下：

```vue
<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import Permission from "@/components/Permission/index.vue";
import SwitchThemeModel from "@/components/SwitchThemeModel/index.vue";

import { formatRoutes } from "@/utils/router";
import { useTitle } from "@/composables/useTitle";
import layoutRotes from "./routes";

const route = useRoute();

// 框架所有菜单路由 与 patch key格式的所有菜单路由
const routerPathKeyRouter = ref(formatRoutes(layoutRotes));

// 当前路由 item
const routeItem = computed(() => routerPathKeyRouter.value.pathKeyRouter[route.path]);

// 设置title
useTitle(routeItem);
</script>
<template>
	<div class="member-layout">
		<Permission :roles="routeItem?.meta?.roles">
			<router-view />
		</Permission>
		<div class="member-layout-footer">
			<div class="nav-item"><router-link to="/">首页</router-link></div>
			<div class="nav-item"><router-link to="/member/index">我的</router-link></div>
			<div class="nav-item"><router-link to="/user/login">登录</router-link></div>
			<div class="nav-item"><SwitchThemeModel /></div>
		</div>
	</div>
</template>
<style scoped lang="scss">
.member-layout {
	position: relative;
	&::after {
		position: relative;
		display: block;
		width: 100%;
		height: 40px;
		content: "";
	}
	.member-layout-footer {
		position: fixed;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 10;
		display: flex;
		height: 40px;
		background-color: var(--ft-bg-color);
		border-top: 1px solid var(--ft-divider-color);
		.nav-item {
			box-sizing: border-box;
			display: flex;
			flex: 1;
			align-items: center;
			justify-content: center;
			border-left: 1px solid var(--ft-divider-color);
			&:first-child {
				border: 0;
			}
		}
	}
}
</style>
```

二、`routes.ts` 路由，内容如下：

```ts
import { RouteRecordRaw } from "vue-router";

const MemberLayoutRoutes: RouteRecordRaw[] = [
	{
		path: "/member",
		redirect: "/member/index",
		children: [
			{
				meta: {
					title: "用户中心",
				},
				path: "index",
				component: () => import("@/pages/member/index/index.vue"),
			},
			{
				path: "info",
				component: () => import("@/pages/member/info/index.vue"),
			},
		],
	},
];

export default MemberLayoutRoutes;
```

## 新增布局 {#add}

> 你也可以新增扩展自己的布局，满足以下几个步骤：

- 1、必须新建 `.vue` 文件，如： `index.vue`。
- 2、必须有路由定义文件，如：`routes.ts`。
- 3、最少新建以上两个文件，然后导入到 **路由入口配置 `/src/config/router.ts` 文件中**，可以参考以上几个布局样列。


