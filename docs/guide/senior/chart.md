# 图表

管理后台图表也是常见得需求。本项目目前用到的图表是 ECharts，功能齐全，社区 demo 也丰富 [gallery](http://gallery.echartsjs.com/explore.html)。

ECharts 支持 webpack 引入，图省事可以将 ECharts 整个引入 `var echarts = require('echarts')` 不过 ECharts 还是不小的，如果只使用它小部分功能或者图表类型的话建议按需引入。

本项目封装了一个 Echarts Composables Api:

详细使用方法，请查看[useEcharts](/feature/composables/echarts.md) Composables Api 文档。


## 其它

当然还有其他比较优秀的图表插件 [highcharts](https://www.highcharts.com.cn) , [d3](https://github.com/d3/d3) , [Chart.js](https://github.com/chartjs/Chart.js) , [chartist-js](https://github.com/gionkunz/chartist-js) 等封装方法都是大同小异差不多的，这里就不再展开了。
