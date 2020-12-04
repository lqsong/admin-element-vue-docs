# CKEditor


[CKEditor](https://github.com/lqsong/admin-element-vue/tree/typescript.v2/src/components/CKEditor/) 组件基于 `CKEditor 5` 封装，是一款 富文本编辑器；`CKEditor` [官网](https://ckeditor.com/)。


## Props

| 名称     | 类型    | 默认值                      | 说明                                                                           |
| -------- | ------ | -------------------------- | ------------------------------------------------------------------------------------- |
| v-model    | String |                      | 编辑器的内容.                                    |
| toolbars  | string[] |  `CKEditorConfig.toolbar`          | 编辑器 工具栏 配置.                                                                    |

```js
export const CKEditorConfig = {
  toolbar: [
    'heading',
    '|',
    'fontfamily',
    'fontsize',
    'fontColor',
    'fontBackgroundColor',
    '|',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    '|',
    'alignment',
    '|',
    'numberedList',
    'bulletedList',
    '|',
    'indent',
    'outdent',
    '|',
    'link',
    'blockquote',
    'imageUpload',
    'insertTable',
    'mediaEmbed',
    '|',
    'undo',
    'redo',
  ],
};

```


## Example

[在线链接](http://tsv2-demo.admin-element-vue.liqingsong.cc/#/component/editor/ckeditor)


## 卸载

如果你不需要此组件，然后代码打包感觉不需要，可以卸载此组件。

1、CMD 运行

```bash
npm uninstall @ckeditor/ckeditor5-build-decoupled-document
npm uninstall @ckeditor/ckeditor5-vue
```

2、删除组件文件目录 [@/components/CKEditor](https://github.com/lqsong/admin-element-vue/tree/typescript.v2/src/components/CKEditor/)