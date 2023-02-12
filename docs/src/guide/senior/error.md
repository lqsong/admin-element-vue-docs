# 错误处理 {#index}

## 页面 {#page}

**1、404**

页面级的错误处理是由 `vue-router` 统一处理，所有匹配不到正确路由的页面都会进 `404`页面。

```ts
{
    path: "/:pathMatch(.*)*",
    component: () => import("@/pages/404/index.vue"),
},
```

::: warning 注意事项
 这里有一个需要非常注意的地方就是 `404` 页面路由一定要在所有路由最后
:::


**2、500**

你也可以自定义一个 `500` 页面，然后后端请求出错，你也可以跳转到此路由。

```ts
{
    path: "/500",
    component: () => import("@/pages/500/index.vue"),
},
```
::: tip 
 同理其他错误页面，可以都这样定义。
:::



## 请求 {#request}


项目里所有的请求都会走 `/src/utils/request.ts` 里面创建的的 `Axios` 实例，它统一做了错误处理，详细内容请查看[数据请求](/guide/server.html#fun)。


你可以在`errorHandler` 中根据自己的实际业务统一针对不同的状态码或者根据自定义 code 来做错误处理。如：

```ts
/**
 * @description: 异常处理程序
 * @returns Promise
 */
const errorHandler = (error: any) => {
	const { response, message } = error;
	if (message === "CustomError") {
		// 自定义错误
		const { config, data } = response;
		const { url, baseURL } = config;
		const { code, msg } = data;
		const reqUrl = url.split("?")[0].replace(baseURL, "");
		const noVerifyBool = ajaxResponseNoVerifyUrl.includes(reqUrl);
		if (!noVerifyBool) {
			alert(customCodeMessage[code] || msg || "Error");

			if (code === ResultCodeEnum.LOGININVALID) {
				// 如果未登录或失效，这里可以跳转到登录页面
				router.push("/user/login");
			}
		}
	} else if (response && response.status) {
		const errorText = serverCodeMessage[response.status] || response.statusText;
		const { status, request } = response;
		alert(`请求错误 ${status}: ${request.responseURL}\n${errorText}`);
	} else if (!response) {
		alert("网络异常：您的网络发生异常，无法连接服务器");
	}

	return Promise.reject(error);
};
```


