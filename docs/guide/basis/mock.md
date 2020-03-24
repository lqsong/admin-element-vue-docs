# Mock Data

Mock 数据是前端开发过程中必不可少的一环，是分离前后端开发的关键链路。通过预先跟服务器端约定好的接口，模拟请求数据甚至逻辑，能够让前端开发更加独立自主，不会被服务端的开发所阻塞。

## Mockjs

本项目，目前所有的数据都是用 [mockjs](https://github.com/nuysoft/Mock) 模拟生成。它的原理是: 拦截了所有的请求并代理到本地，然后进行数据模拟，所以你会发现 `network` 中没有发出任何的请求。

但它的最大的问题是就是它的实现机制。它会重写浏览器的`XMLHttpRequest`对象，从而才能拦截所有请求，代理到本地。大部分情况下用起来还是蛮方便的，但就因为它重写了`XMLHttpRequest`对象，所以比如`progress`方法，或者一些底层依赖`XMLHttpRequest`的库都会和它发生不兼容，并且因为是它本地模拟的数据，实际上不会走任何网络请求。所以本地调试起来很蛋疼，只能通过`console.log`来调试。所以此插件也只是临时用用，如果为了前端方便开发，此插件不建议使用，所以项目中把它放到了 `@/main.ext.js` 中，你可把它隐藏。

## 开源的api文档管理系统

线上有很多开源的api文档管理系统，如果个人或公司满足业务需求条件的情况下，可以自己进行安装、调试以供开发使用。

### 1、阿里的RAP（JAVA）
::: warning 注意：
新版 RAP2 已不是 JAVA 开发 具体请看 [**说明**](https://github.com/thx/rap2-delos#rap2-delos-开源社区版本-后端-api-服务器)
:::
Web接口管理工具，开源免费，接口自动化，MOCK数据自动生成，自动化测试，企业级管理。阿里妈妈MUX团队出品！阿里巴巴都在用！1000+公司的选择！一直被抄袭，从未被超越 。
[GitHub](https://github.com/thx/rap2-delos)

### 2、ShowDoc（PHP）
国内开源的非常好用的一款API文档管理系统，安装也非常方便，只需将源代码放到项目目录下自动安装运行即可。
[GitHub](https://github.com/star7th/showdoc)

当然还有一些其它的产品 [swagger](https://swagger.io/) 、[eoapi](https://www.eoapi.cn/)、[postman](https://www.postman.com/) 等等，这里就不一一列举了，自己有兴趣可以自己去查找资料。

