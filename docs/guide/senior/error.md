# 错误处理

## 页面

**404**

页面级的错误处理是由 `vue-router` 统一处理，所有匹配不到正确路由的页面都会进 `404`页面。

```js
{
  title: 'app.global.menu.notfound',
  path: '/:pathMatch(.*)*',
  component: () => import('@/views/404/index.vue'),
}
```

::: warning 注意事项
 这里有一个需要非常注意的地方就是 `404` 页面路由一定要在所有路由最后
:::


## 请求

项目里所有的请求都会走 `@/utils/request.ts` 里面创建的的 `Axios` 实例，它统一做了错误处理，[完整代码](https://github.com/lqsong/admin-element-vue/blob/typescript.v2/src/utils/request.ts)。

你可以在`errorHandler` 中根据自己的实际业务统一针对不同的状态码或者根据自定义 code 来做错误处理。如：

```ts
/**
 * 异常处理程序
 */
const errorHandler = (error: any) => {
    const { response, message } = error;
    if (message === 'CustomError') {
        // 自定义错误
        const { config, data } = response;
        const { url, baseURL} = config;
        const { code, msg } = data;
        const reqUrl = url.split("?")[0].replace(baseURL, '');
        const noVerifyBool = settings.ajaxResponseNoVerifyUrl.includes(reqUrl);
        if (!noVerifyBool) {
            ElNotification({
                type: 'error',
                title: `提示`,
                message: customCodeMessage[code] || msg || 'Error',
            });

            if (code === 10002) {
                router.replace('/user/login');
            }
        }
    } else if (message === 'CancelToken') {
        // 取消请求 Token
        // eslint-disable-next-line no-console
        console.log(message);
    } else if (response && response.status) {
        const errorText = serverCodeMessage[response.status] || response.statusText;
        const { status, request } = response;
        ElNotification({
            type: 'error',
            title: `请求错误 ${status}: ${request.responseURL}`,
            message: errorText,
        });
    } else if (!response) {
        ElNotification({
            type: 'error',
            title: '网络异常',
            message: '您的网络发生异常，无法连接服务器',
        });
    }

    return Promise.reject(error);
}

```
