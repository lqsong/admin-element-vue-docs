# 错误处理

## 页面

**404**

页面级的错误处理由 `vue-router` 统一处理，所有匹配不到正确路由的页面都会进 `404`页面。

```js
{ path: '*', redirect: '/404' }
```

::: warning 注意事项
 这里有一个需要非常注意的地方就是 `404` 页面一定要最后加载，如果放在 constantRoutes 一同声明了 `404` ，后面的所有页面都会被拦截到`404` ，详细的问题见 [addRoutes when you've got a wildcard route for 404s does not work](https://github.com/vuejs/vue-router/issues/1176)
:::

**401**

本项目没有做 `401` 没有权限的判断跳转，因为本项目的权限路由是根据用户权限生成的动态路由，所以如果没有某个页面的权限，则这个页面的路由是不存在的也就是`404`。


## 请求

项目里所有的请求都会走 `@/service/lib/request.js` 里面创建的的 axios 实例，它统一做了错误处理，[完整代码](https://github.com/lqsong/admin-element-vue/blob/javascript.v1/src/service/lib/request.js)。

你可以在`service.interceptors.response` response 拦截器之中根据自己的实际业务统一针对不同的状态码或者根据自定义 code 来做错误处理。如：

```js
// 响应拦截器
service.interceptors.response.use(
  
  /**
   * 通过自定义代码确定请求状态
   * 这只是一个例子
   * 您还可以通过HTTP状态码来判断状态
   */
  response => {
    const res = response.data;
    const { code } = res;

    // 如果自定义代码不是200，则判断为错误。
    if (code !== 200) {
      // 获取替换后的字符串
      const reqUrl = response.config.url.split("?")[0].replace(response.config.baseURL, '');
      const noVerifyBool = ajaxResponseNoVerifyUrl.includes(reqUrl);
      
      switch (code) {
        case 401: // 未登陆

            if (!noVerifyBool) {
              MessageBox({
                title: '提示',
                showClose: false,
                closeOnClickModal: false,
                closeOnPressEscape: false,
                message: '当前用户登入信息已失效，请重新登入再操作',
                beforeClose: (action, instance, done) => {                  
                  if (isExternal(serverLoginUrl)) {
                      window.location.href = serverLoginUrl;
                  } else {
                      window.location.reload();                    
                  }
                  console.log(action, instance, done);
                }
              });
            }
            
            break;
      
        default:
            if (!noVerifyBool) {
              Message({
                message: res.msg || 'Error',
                type: 'error',
                duration: 5 * 1000
              });
            }
            break;
      }

      // 返回错误 走 catch 
      return Promise.reject(res);
      // return Promise.reject(new Error(res.msg || 'Error'));
      // return res;
    } else {
      return res;
    }
  },
  error => {
    console.log('err' + error); // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

```

因为所有请求返回的是`promise`，所以你也可以对每一个请求通过`catch` 错误，从而进行单独的处理。

```js
getUserInfo()
  .then(res => {})
  .catch(err => {
    xxxx
  })
```
