# 新增页面

查看 [@/views/home](https://github.com/lqsong/admin-element-vue/tree/typescript.v2/src/views/home) 首页样例代码，其目录格式如下：

```
views                  # 页面组件目录(所有页面放在这里)
└── home               # 页面-首页(这里作为说明样例)
    ├── components     # 当前页面组件目录(可选)
    ├── composables    # 当前页面组合式 API(可选)
    ├── locales        # 当前页面国际化目录(可选)
    ├── data.d.ts      # TS 类型定义文件(可选)
    ├── index.vue      # 当前页面入口
    ├── service.ts     # 当前页面数据接口文件(可选)
    └── store.ts       # 当前页面数据模型文件(可选)
```
:::tip 重点
根据以上可以看出，每个页面以模块的方式存在，其内容包括 vue template、StoreModel、service、locales、page components、page composables，方便统一维护与复用。
:::


## 绑定路由

页面组件创建完成后，需要进行路由绑定才能进行展示，方法请参照：[布局/配置路由导航](/guide/basis/layout.md#配置路由导航)。

