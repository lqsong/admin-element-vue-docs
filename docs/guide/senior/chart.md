# 图表

管理后台图表也是常见得需求。本项目目前用到的图表是 ECharts，功能齐全，社区 demo 也丰富 [gallery](http://gallery.echartsjs.com/explore.html)。

ECharts 支持 webpack 引入，图省事可以将 ECharts 整个引入 `var echarts = require('echarts')` 不过 ECharts 还是不小的，如果只使用它小部分功能或者图表类型的话建议按需引入。

```js
// 按需引入 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/bar')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

//全部引入
var echarts = require('echarts')
```

[webpack 中使用 ECharts 文档](http://echarts.baidu.com/tutorial.html#%E5%9C%A8%20webpack%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20ECharts)

[ECharts 按需引入模块文档](https://github.com/ecomfe/echarts/blob/javascript.v1/index.js)

接下来我们就要在 vue 中声明初始化 ECharts 了。因为 ECharts 初始化必须绑定 dom，所以我们只能在 vue 的 mounted 生命周期里进行初始化。

```js
import echarts from 'echarts';
data() {
    return {
      chart: null
    };
},
mounted() {
  this.initCharts();
},
methods: {
  initCharts() {
    this.chart = echarts.init(document.getElementById('chartdemo'));
    this.setOptions();
  },
  setOptions() {
    this.chart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    })
  }
}
```

就这样简单，ECharts 就配置完成了，这时候你想说我的 data 是远程获取的，或者说我动态改变 ECharts 的配置该怎么办呢？我们可以通过 watch 来触发 setOptions 方法

```js
//第一种 watch options变化 利用vue的深度 watcher，options 一有变化就重新setOption
watch: {
  options: {
    handler(options) {
      this.chart.setOption(this.options)
    },
    deep: true
  },
}
//第二种 只watch 数据的变化 只有数据变化时触发ECharts
watch: {
  seriesData(val) {
    this.setOptions({series:val})
  }
}
```

其他操作和参数请参考 [ECharts 官方文档](https://www.echartsjs.com/zh/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts)。

::: tip
具体实例可参照 [@/views/Chartstatistic/Echarts/](https://github.com/lqsong/admin-element-vue/tree/javascript.v1/src/views/Chartstatistic/Echarts) 下 vue 文件
:::

## 其它

当然还有其他比较优秀的图表插件 [highcharts](https://www.highcharts.com.cn) , [d3](https://github.com/d3/d3) , [Chart.js](https://github.com/chartjs/Chart.js) , [chartist-js](https://github.com/gionkunz/chartist-js) 等封装方法都是大同小异差不多的，这里就不再展开了。
