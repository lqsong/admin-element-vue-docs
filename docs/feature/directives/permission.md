# v-permission

[v-permission](https://github.com/lqsong/admin-element-vue/blob/typescript.v2/src/directives/permission/) 自定义指令，用于验证当前用户权限。

## Example

[在线链接](http://tsv2-demo.admin-element-vue.liqingsong.cc/#/roles/all)

在线代码

[@/views/roles/all/index.vue](https://github.com/lqsong/admin-element-vue/blob/typescript.v2/src/views/roles/all/index.vue)

## Props

| 名称     | 类型    | 默认值                      | 说明                                                                           |
| -------- | ------ | -------------------------- | ------------------------------------------------------------------------------------- |
| value    |  string \| string[] |               | 权限名称                                    |

### 样例代码：

```vue
<template>
     <a href="#" v-permission="'test'">删除</a>
     <a href="#" v-permission="['admin','test']">删除</a>
</template>
<script lang="ts">
import permission from '@/directives/permission';
import { defineComponent } from "vue";
export default defineComponent({
    directives: {
        permission
    }
})
</script>
```



