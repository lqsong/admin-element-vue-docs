# Mock Data {#index}

Mock 数据是前端开发过程中必不可少的一环，是分离前后端开发的关键链路。通过预先跟服务器端约定好的接口，模拟请求数据甚至逻辑，能够让前端开发更加独立自主，不会被服务端的开发所阻塞。


## 约定式 Mock 文件 {#file}

项目基于 [`vite`](https://github.com/vitejs/vite) 的插件 `vite-plugin-mock` 实现了本地 MOCK 服务，并集成了[mockjs](https://github.com/nuysoft/Mock)。


`/mock` 文件夹下所有文件为 mock 文件。

比如：

```
├── mock
    ├── global.ts
    └── users.ts
```

## mock文件内容格式 {#content}

以 `global.ts` 为例：

```ts
import { MockMethod } from "vite-plugin-mock";

export default [
	{
		url: "/api/test",
		method: "get",
		response: ({ headers, body }) => {
			return {
				code: 0,
				data: "测试mock接口功能",
			};
		},
	},
	{
		url: "/api/500",
		method: "get",
		// statusCode: 401,
		response: ({ headers, body }) => {
			return {
				timestamp: 1513932555104,
				status: 500,
				error: "error",
				message: "error",
				path: "/500",
			};
		},
	},
] as MockMethod[];
```

## 开源的api文档管理系统 {#open-source}


线上有很多开源的api文档管理系统，如果个人或公司满足业务需求条件的情况下，可以自己进行安装、调试以供开发使用。



**1、YApi(百度)**

YApi 是高效、易用、功能强大的 api 管理平台，旨在为开发、产品、测试人员提供更优雅的接口管理服务。可以帮助开发者轻松创建、发布、维护 API，YApi 还为用户提供了优秀的交互体验，开发人员只需利用平台提供的接口数据写入工具以及简单的点击操作就可以实现接口的管理。[Github](https://github.com/YMFE/yapi)

**2、RAP(阿里)**

Web接口管理工具，开源免费，接口自动化，MOCK数据自动生成，自动化测试，企业级管理。阿里妈妈MUX团队出品！阿里巴巴都在用！1000+公司的选择！一直被抄袭，从未被超越 。
[GitHub](https://github.com/thx/rap2-delos)

**3、ShowDoc（PHP）**

国内开源的非常好用的一款API文档管理系统，安装也非常方便，只需将源代码放到项目目录下自动安装运行即可。
[GitHub](https://github.com/star7th/showdoc)

当然还有一些其它的产品 [swagger](https://swagger.io/) 、[eoapi](https://www.eoapi.cn/)、[postman](https://www.postman.com/) 等等，这里就不一一列举了，自己有兴趣可以自己去查找资料。
