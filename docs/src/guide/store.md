# 状态管理 {#index}

对于每个大项目来说，使用状态树 (store) 管理状态 (state) 十分有必要。

本项目集成了 `pinia`。同时创建了一个[状态管理配置](/guide/config.html#store)。


## 全局目录

项目创建了一个状态管理全局公共目录 `/src/store`，类似 `/src/store/global.ts`、`/src/store/user.ts` 这样的公共store，你可以写在此目录下。

## 页面store

针对页面你也可以创建独立的store，如下结构：

```bash{11}
├── src  
│   ├── pages                  # 页面目录
│   │   ├── home               # 首页
│   │   │   ├── components
│   │   │   │   └── HelloWorld.vue
│   │   │   ├── locales
│   │   │   │   ├── en-US.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── zh-CN.ts
│   │   │   │   └── zh-TW.ts   
│   │   │   ├── store.ts
│   │   │   ├── server.ts
│   │   │   └── index.vue
```

::: tip 说明：
`pinia` 详细使用规则请查看：[官方文档](https://pinia.vuejs.org/)
:::



