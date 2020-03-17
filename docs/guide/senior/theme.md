# 主题

本项目有两套主题代码，样例如下：

**[Default version demo](http://demo.admin-element-vue.liqingsong.cc/)**             |  **[BgImg version demo](http://bgimg-demo.admin-element-vue.liqingsong.cc/)**
:-------------------------:|:-------------------------:
![Default version demo](https://gitee.com/lqsong/public/raw/master/admin-element-vue/admin1.png)  |  ![BgImg version demo](https://gitee.com/lqsong/public/raw/master/admin-element-vue/admin2.png)

项目是基于 element-ui 的视觉风格进行调整搭建的。如果对视觉风格有额外的要求可以按照[官方自定义主题指导](http://element-cn.eleme.io/#/zh-CN/component/custom-theme)。该方案是通过样式变量覆盖的方式 [@/assets/css/element-variables.scss](https://github.com/lqsong/admin-element-vue/blob/master/src/assets/css/element-variables.scss) 中进行设置。

你可以比较两个样例的代码，也只是多了个样式重置而已。
```
/Default version                              /BgImg version

├── css                                       ├── css
│   ├── element-variables.scss                │   ├── element-variables.scss 
│   ├── global.scss                           │   ├── global.scss  
│   ├── mixin.scss                            │   ├── mixin.scss 
│   ├── sidebar-menu.scss                     │   ├── sidebar-menu.scss  
│   └── variables.scss                        │   ├── variables.scss   
                                              │   ├── bg-img
                                              │   │   ├── index.scss
                                              │   │   └── variables.scss
```
