# 跨域 {#index}

前后端分离大多数都难以避免跨域问题。

## CORS {#cors}

`cors` 全称为 Cross Origin Resource Sharing（跨域资源共享）。

这种方案对于前端来说没有什么工作量，和正常发送请求写法上没有任何区别，工作量基本都在后端这里。每一次请求，浏览器会先以 `OPTIONS` 请求方式发送一个预请求（不是所有请求都会发送 options），通过预检请求从而获知服务器端对跨源请求支持的 `HTTP` 方法。在确认服务器允许该跨源请求的情况下，再以实际的 `HTTP` 请求方法发送那个真正的请求。

只要第一次配好了，之后不管有多少接口和项目复用就可以了，一劳永逸的解决了跨域问题，而且不管是开发环境还是正式环境都能方便的使用。详细 [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)


## 代理 {#proxy}

**一、开发模式**

本地开发时 `env` 环境变量中，提供了以下配置，查看 `.env.development` 内容如下：

```sh{7-11}
# 本地环境
NODE_ENV = development

# mock 是否开启 true|false
VITE_APP_MOCK = true

# 接口地址
VITE_APP_API_URL = /api

# VITE_APP_API_URL对应的代理地址，空则不启用 (开发环境vite使用)
VITE_APP_API_URL_PROXY = http://yapi.liqingsong.cc/mock/11
```

`VITE_APP_API_URL_PROXY` 如果不为空，则启用vite自带的代理，必须是api网址。对应的 `VITE_APP_API_URL` 填写请求前缀就可以，这个在vite代理的时候默认替换为空。

**二、生产模式**

在生产环境中需要使用 `nginx` 进行反向代理。不管是 vite ,还是 nginx ，代理的原理都是一样的，通过搭建一个中转服务器来转发请求规避跨域的问题。


生产环境中 `VITE_APP_API_URL_PROXY` 设置空，`VITE_APP_API_URL` 填写请求前缀（如 `/api`），然后 `nginx` 配置代理，如下样列：


```sh
server {
  listen       8080;
  server_name  localhost;

  location /api/ {
    proxy_pass http://这里填写后端api地址/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }

}

```

> 如果 `VITE_APP_API_URL` 填写的是api网址，就需要 [CORS](#cors)方式了。


:::tip
如果前后端分离用的是 `token` 头验证登录状态(或其他状态)，此方法不存在问题；但是，如果用的是服务器 `SESSION` 验证登录状态(或其他状态),就需要特殊处理 `SESSION` 了。
:::