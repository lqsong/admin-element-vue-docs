# 构建与部署 {#index}


## 构建 {#build}

当项目开发完毕，只需要运行一行命令就可以打包你的应用：

```bash
# 打包正式环境
pnpm build
```


构建打包成功之后，会在根目录生成 `dist` 文件夹，里面就是构建打包好的文件，通常是 `***.js` 、`***.css`、`index.html` 等静态文件。

如果需要自定义构建，比如指定 `dist` 目录等，则需要通过 `/vite.config.ts` 进行配置，详情请参考[vite官方文档](https://cn.vitejs.dev/guide/build.html)。

## 部署 {#deploy}

只需要将最终生成的静态文件，也就是通常情况下 `dist` 文件夹的静态文件发布到你的 cdn 或者静态服务器即可，需要注意的是其中的 `index.html` 通常会是你后台服务的入口页面，在确定了 js 和 css 的静态之后可能需要改变页面的引入路径。

::: tip
部署时可能会发现资源路径不对 ,只需修改 `/vite.config.ts` 文件资源路径即可。
:::

```js
base: './' //请根据自己路径来配置更改
```


## 路由与服务器 {#router-server}

项目中，前端路由使用的是 `vue-router`，所以你可以选择两种方式：`browserHistory` 和 `hashHistory`。

两者的区别简单来说是对路由方式的处理不一样，`hash` 是以 `#` 后面的路径进行处理，通过 [HTML 5 History](https://developer.mozilla.org/en-US/docs/Web/API/History_API) 进行前端路由管理，而 `browser` 则是类似我们通常的页面访问路径，并没有 `#`，但要通过服务器的配置，能够访问指定的 url 都定向到当前页面，从而能够进行前端的路由管理。

本项目默认使用的是 `hashHistory` ，所以如果你的 url 里有 `#`，想去掉的话，需要切换为 `browserHistory`。
修改 `@/config/routes.ts` 中的 `createWebHashHistory` 为 `createWebHistory` 即可

```ts
const router = createRouter({
	scrollBehavior() {
		return { left: 0, top: 0 };
	},
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: routes,
});
```

如果你使用的是静态站点，那么使用 `browserHistory` 可能会无法访问你的应用，因为假设你访问 `http://localhost:3000/home`，那么其实你的静态服务器并没有能够映射的文件，而使用 `hashHistory` 则不会有这个问题，因为它的页面路径是以 `#` 开始的，所有访问都在前端完成，如：`http://localhost:3000/#/home/`。

不过如果你有对应的后台服务器，那么我们推荐采用 `browserHistory`，只需要在服务器做一个映射，比如：

Apache

```bash
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

nginx

```bash
location / {
  try_files $uri $uri/ /index.html;
}
```


















