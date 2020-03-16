# 样式

## CSS Modules

在样式开发过程中，有两个问题比较突出：

- 全局污染 —— CSS 文件中的选择器是全局生效的，不同文件中的同名选择器，根据 `npm run build` 生成文件中的先后顺序，后面的样式会将前面的覆盖；

- 选择器复杂 —— 为了避免上面的问题，我们在编写样式的时候不得不小心翼翼，类名里会带上限制范围的标示，变得越来越长，多人开发时还很容易导致命名风格混乱，一个元素上使用的选择器个数也可能越来越多，最终导致难以维护。

好在 vue 为我们提供了 [scoped](https://vue-loader.vuejs.org/guide/scoped-css.html#mixing-local-and-global-styles) 可以很方便的解决上述问题。
它顾名思义给 css 加了一个域的概念。

```css
/* 编译前 */
.example {
  color: red;
}

/* 编译后 */
.example[_v-f3f3eg9] {
  color: red;
}
```

只要加上 `<style scoped>` 这样 css 就只会作用在当前组件内了。详细文档见 [vue-loader](https://vue-loader.vuejs.org/guide/scoped-css.html#mixing-local-and-global-styles)

::: tip 注意：
使用 scoped 后，父组件的样式将不会渗透到子组件中。不过一个子组件的根节点会同时受其父组件的 scoped CSS 和子组件的 scoped CSS 的影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。
:::


## 目录结构

admin-element-vue 所有全局样式都在 `@/assets/css` 目录下设置

```bash
├── css
│   ├── element-variables.scss       # 全局自定义 element-ui 样式
│   ├── global.scss                  # 全局通用样式
│   ├── mixin.scss                   # 全局 mixin
│   ├── sidebar-menu.scss            # el-menu 侧边栏 - 菜单 样式 重置
│   └── variables.scss               # 全局变量
```

常见的工作流程是，全局样式都写在 `@/assets/css` 目录下，每个页面自己对应的样式都写在自己的 `.vue` 文件之中

```css
<style>
/* global styles */
</style>

<style lang="scss" scoped>
/* local styles */
</style>
```


## 父组件改变子组件样式 深度选择器

当你子组件使用了 `scoped` 但在父组件又想修改子组件的样式可以 通过 `>>>` 来实现：

```css
<style scoped>
.a >>> .b { /* ... */ }
</style>
```

将会编译成

```css
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```

如果你使用了一些预处理的东西，如 `sass` 你可以通过 `/deep/` 来代替 `>>>` 实现想要的效果。

```css
.a {
    /deep/ .b{
        /* ... */
    }
}
```

所以你想覆盖某个特定页面 `element` 的 button 的样式，你可以这样做：

```css
.xxx-container >>> .el-button{
  xxxx
}
```

[官方文档](https://vue-loader.vuejs.org/en/features/scoped-css.html)
