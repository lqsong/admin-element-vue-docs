# Svg Icon 图标

全局 Svg Icon 图标组件。

默认在 [@/components/SvgIcon](https://github.com/lqsong/admin-element-vue/blob/master/src/components/SvgIcon/index.js#L12) 中注册到全局中，可以在项目中任意地方使用。所以图标均可在 [@/assets/icons/svg](https://github.com/lqsong/admin-element-vue/tree/master/src/assets/icons/svg)。可自行添加或者删除图标，所以图标都会被自动导入，无需手动操作。

## 使用方式

```html
<!-- icon-class 为 @/assets/icons/svg 目录下 svg文件的名字 -->
<svg-icon icon-class="svg文件名" /> 
```

## 改变颜色

`svg-icon` 默认会读取其父级的 color `fill: currentColor;`

你可以改变父级的`color`或者直接改变`fill`的颜色即可。

## 大小

如果你是从 [iconfont](https://www.iconfont.cn/)下载的图标，记得使用如 Sketch 等工具规范一下图标的大小问题，不然可能会造成项目中的图标大小尺寸不统一的问题。

本项目中使用的图标都是 16\*16 网格大小规格的。
