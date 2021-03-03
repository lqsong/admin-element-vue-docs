# IconFont

组件位置：[@/components/IconFont](https://github.com/lqsong/admin-element-vue/tree/vite.ts/src/components/IconFont)。

创建原因：方便统一管理使用 `iconfont.cn` 上 js 资源图标 。

[在线DOME](http://vitets-demo.admin-element-vue.liqingsong.cc/#/component/icon/font)

## 使用方法

### 1、iconfont.cn 上生成 js 资源。

登录 iconfont.cn 创建项目，添加需要的图标，生成js资源。

### 2、配置js资源

`@/config/settings.ts` 文件中 `iconfontUrl`参数， 配置 iconfont.cn 生成的js文件地址。

```ts
const settings: SettingsType = {
  iconfontUrl: [
    '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js',
    '//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js', 
  ],
};

export default settings;
```

### 3、使用Demo：

```vue
<template>
    <IconFont type="iconfont图标名称" class="" style=""/>
</template>
<script lang="ts">
import IconFont from '@/components/IconFont';
import { defineComponent } from "vue";
export default defineComponent({
    components: {
        IconFont
    }
})
</script>
```
