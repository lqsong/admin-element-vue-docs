# 与服务端交互

## 前端请求流程

在 `admin-element-vue` <Version /> 中，一个完整的前端 UI 交互到服务端处理流程是这样的：

1.  UI 组件交互操作；
2.  调用统一管理的 `@/service` api 请求函数；
3.  使用封装的 `@/service/lib/request.js` 发送请求；
4.  获取服务端返回；
5.  更新 data；

从上面的流程可以看出，为了方便管理维护，统一的请求处理都放在 `@/service` 文件夹中，并且一般按照 model 纬度进行拆分文件，如：

```
service/
  login.js
  user.js
  pagesample.js  
  ...
```

## request.js

其中，`@/service/lib/request.js` 是基于 [axios](https://github.com/axios/axios) 的封装，便于统一处理 POST，GET 等请求参数，请求头，以及错误提示信息等。具体可以参看 [request.js](https://github.com/lqsong/admin-element-vue/blob/javascript.v1/src/service/lib/request.js)。
它封装了全局 `request拦截器`、`response拦截器`、`统一的错误处理`、`统一做了超时处理`、`baseURL设置等`。

## 一个请求用户列表页的例子：

```js
// @/server/user.js
import request from '@/service/lib/request';
export function userList(data) {
    return request({
      url: '/user/list',
      method: 'post',
      data
    });
}

// @/views/user/list
import { userList } from '@/service/user';
export default {
  data() {
    list: null,
    loading: true
  },
  methods: {
    getList() {
      this.loading = true;
      const paramData = {
          page: 1,
          per: 10
      };
      userList(paramData).then(response => {
        this.list = response.data.list;
        this.loading = false;
      })
    }
  }
}
```
