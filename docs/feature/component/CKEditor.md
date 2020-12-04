# CKEditor


[CKEditor](https://github.com/lqsong/admin-element-vue/blob/javascript.v1/src/components/CKEditor/) 组件基于 `CKEditor 5` 封装，是一款 富文本编辑器；`CKEditor` [官网](https://ckeditor.com/)。


## Props

| 名称     | 类型    | 默认值                      | 说明                                                                           |
| -------- | ------ | -------------------------- | ------------------------------------------------------------------------------------- |
| value    | String | " "                        | 编辑器的内容. **如果使用 `v-model`, 不要使用它**.                                      |
| options  | Object |  `defaultOptions`          | 编辑器 Config 配置.                                                                    |
| toolbar   | Array,Object |      `defaultOptions.toolbar`             | 编辑器的工具栏内容.                                  |
| language | String, Object | 'zh-cn'                    | 语言,如果需要其他语言，除了英语，需要自己引入语言                   |

```js
const defaultOptions = {
    toolbar: [
        "heading",
        "|",
        "bold",
        "italic", 
        "link",
        "bulletedList",
        "numberedList",
        "|",
        "indent",
        "outdent",
        "|",
        /* "imageUpload", */
        "blockQuote", 
        "insertTable",
        "mediaEmbed",
        "undo",
        "redo"
    ],
    language: 'zh-cn'
}
```


## Example

```html
<template>
    <div  class="main-conent main-conent-minheight">        
        <el-card shadow="never" class="border-none">
            <CKEditor v-model="editorData"></CKEditor>
        </el-card>

        <el-card shadow="never" class="border-none"  style="margin-top:4px;">
            <div v-html="editorData"></div>
        </el-card>


    </div>
</template>
<script>
import CKEditor from '@/components/CKEditor';
export default {
    components: {
        CKEditor
    },
    data(){
        return {
            editorData: '<p>Content of the editor.</p>'
        };
    }
};
</script>
```

## 扩展

> 因为此组件只是简单的基于 `@ckeditor/ckeditor5-build-classic` 创建，比如 `@ckeditor/ckeditor5-build-decoupled-document` 中的 `字体大小`、`字体颜色`、`下划线` 等等, `@ckeditor/ckeditor5-build-classic` 默认是没有的，有两种扩展方法:

1、卸载 `@ckeditor/ckeditor5-build-classic` 安装 `@ckeditor/ckeditor5-build-decoupled-document`：

```bash
npm uninstall @ckeditor/ckeditor5-build-classic
npm install @ckeditor/ckeditor5-build-decoupled-document
```

然后修改组件 [CKEditor](https://github.com/lqsong/admin-element-vue/blob/javascript.v1/src/components/CKEditor/index.vue) `@ckeditor/ckeditor5-build-classic` 替换成 `@ckeditor/ckeditor5-build-decoupled-document`，就ok了。

2、安装对应的 `字体大小`、`字体颜色`、`下划线` 等插件；然后在组件 [CKEditor](https://github.com/lqsong/admin-element-vue/blob/javascript.v1/src/components/CKEditor/index.vue)修改集成插件即可，如:

```bash
npm install --save @ckeditor/ckeditor5-font
```

[CKEditor](https://github.com/lqsong/admin-element-vue/blob/javascript.v1/src/components/CKEditor/index.vue) 组件中引入：

```js
import Font from '@ckeditor/ckeditor5-font/src/font';

// 再在 配置中进行配置
const defaultOptions = {
    toolbar: [
        'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',
    ],
    plugins: [ Font, ... ]
}
```
此样例 CKEditor [官方Demo](https://ckeditor.com/docs/ckeditor5/latest/features/font.html#installation)

::: tip
同理，你可以查看 CKEditor [官方文档](https://ckeditor.com/docs/ckeditor5/latest/api/)，进行组件功能的扩展。
:::







## 卸载

如果你不需要此组件，然后代码打包感觉不需要，可以卸载此组件。

1、CMD 运行

```bash
npm uninstall @ckeditor/ckeditor5-build-classic
npm uninstall @ckeditor/ckeditor5-vue
```

2、删除组件文件目录 [CKEditor](https://github.com/lqsong/admin-element-vue/blob/javascript.v1/src/components/CKEditor/)