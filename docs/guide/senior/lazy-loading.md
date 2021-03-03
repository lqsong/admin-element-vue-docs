# 懒加载组件

当打包构建应用时，Javascript 包会变得非常大，影响页面加载速度。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

结合 Vue3.x 的 `defineAsyncComponent` 样例如下：

[在线代码](https://github.com/lqsong/admin-element-vue/blob/vite.ts/src/views/home/index.vue);

```vue
<template>
  <div class="indexlayout-main-conent">
      <ArticleChartCard />
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";

import PageLoading from './components/PageLoading/index.vue';
const ArticleChartCard = defineAsyncComponent({
  loader: () => import('./components/ArticleChartCard/index.vue'),
  loadingComponent: PageLoading
});

export default defineComponent({
  name: 'Home',
  components: {
    ArticleChartCard,    
  }
});
</script>
```
