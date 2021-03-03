# useEcharts

[useEcharts](https://github.com/lqsong/admin-element-vue/blob/vite.ts/src/composables/useEcharts.ts) Composables Api 基于 `Echarts` 封装, [官网](https://echarts.apache.org)。

## Props

| 名称     | 类型    | 默认值                      | 说明                                                                           |
| -------- | ------ | -------------------------- | ------------------------------------------------------------------------------------- |
| labRef    |  Ref<HTMLDivElement \| HTMLCanvasElement \| undefined> |                      | 显示图表的DOM                                    |
| initOption  | EChartOption |         | echarts option                                                                    |
| theme | string \| object | macarons |  主题 |

## Example

[在线链接](http://vitets-demo.admin-element-vue.liqingsong.cc/#/home/workplace)

在线代码

[@/views/home/components/WorksChartCard](https://github.com/lqsong/admin-element-vue/blob/vite.ts/src/views/home/components/WorksChartCard/index.vue)

[@/views/home/components/TopicsChartCard](https://github.com/lqsong/admin-element-vue/blob/vite.ts/src/views/home/components/TopicsChartCard/index.vue)

[@/views/home/components/LinksChartCard](https://github.com/lqsong/admin-element-vue/blob/vite.ts/src/views/home/components/LinksChartCard/index.vue)

