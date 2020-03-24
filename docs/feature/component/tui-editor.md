# tui-editor

[TuiEditor](https://github.com/lqsong/admin-element-vue/blob/master/src/components/TuiEditor/) 组件基于 `tui-editor` 封装，是一款 Markdown 编辑器；`tui-editor` [官网](https://ui.toast.com/tui-editor/)，[GitHub](https://github.com/nhnent/tui.editor)。

## Editor

### Props

| 名称     | 类型    | 默认值                      | 说明                                                                           |
| -------- | ------ | -------------------------- | ------------------------------------------------------------------------------------- |
| value    | String | " "                        | 编辑器的内容. **如果使用 `v-model`, 不要使用它**.                                      |
| id       | String | `'tui-editor-' + +new Date() + Math.floor(Math.random() * 1000);` | 编辑器的ID     |
| options  | Object |  `defaultOptions`          | tui.editor 的配置.                                                                    |
| height   | String | '300px'                    | 编辑器的高度.                                                                          |
| mode     | String | 'markdown'                 | 编辑器的模式. (`markdown`or `wysiwyg`)                                                 |
| language | String | 'zh-CN'                    | 语言(`en_US` or `zh-CN`) ,如果需要其他语言，请自己扩充                   |

```js
const defaultOptions = {
  minHeight: '200px',
  previewStyle: 'vertical',
  useCommandShortcut: true,
  useDefaultHTMLSanitizer: true,
  usageStatistics: false,
  hideModeSwitch: false,
  toolbarItems: [
    'heading',
    'bold',
    'italic',
    'strike',
    'divider',
    'hr',
    'quote',
    'divider',
    'ul',
    'ol',
    'task',
    'indent',
    'outdent',
    'divider',
    'table',
    'image',
    'link',
    'divider',
    'code',
    'codeblock'
  ]
}
```

### Methods

| 名称           | 说明    | 参数                    | 
| --------      | ------  | -------------------------- | 
| setLanguage   | 设置新的语言 | （ name: 语言名, Obj: 内容 ）[样例](https://github.com/lqsong/admin-element-vue/blob/master/src/components/TuiEditor/index.vue#L97)  | 
| setValue      | 设置编辑器内容 | （ value: 编辑器内容 Markdown 类型 ） | 
| getValue      | 获取编辑器内容 Markdown 类型 | - | 
| setHtml      | 设置编辑器html内容 | （ value: 编辑器内容 html 类型 ） | 
| getHtml      | 获取编辑器html内容  | - | 


## Viewer

### Props

| 名称     | 类型    | 默认值                      | 说明                                                                           |
| -------- | ------ | -------------------------- | ------------------------------------------------------------------------------------- |
| value    | String | " "                        | 显示的内容. **如果使用 `v-model`, 不要使用它**.                                      |
| id       | String | `'tui-editor-viewer' + +new Date() + Math.floor(Math.random() * 1000);` | 查看器的ID     |

### Methods

| 名称           | 说明    | 参数                    | 
| --------      | ------  | -------------------------- | 
| setValue      | 设置查看器内容 | （ value: 查看器内容 Markdown 类型 ） | 
| getHtml       | 获取查看器html内容  | - | 




## Example

```html
<template>
    <div  class="main-conent main-conent-minheight">
        <el-card shadow="never" class="border-none">
            <tui-editor ref="tuieditor" v-model="content" ></tui-editor>
        </el-card>

        <el-card shadow="never" class="border-none"  style="margin-top:4px;">
            <el-button @click="getContent">获取HTML</el-button>
            <hr>
            <div v-html="contentHtml"></div>
        </el-card>

        <el-card shadow="never" class="border-none"  style="margin-top:24px;">
            <tui-editor-viewer v-model="content"></tui-editor-viewer>
        </el-card>
        
    </div>
</template>
<script>

import TuiEditor from '@/components/TuiEditor';
import TuiEditorViewer from '@/components/TuiEditor/Viewer';
export default {
  components: {
    TuiEditor,
    TuiEditorViewer
  },
  data() {
    return {
      content: '# This is Test.',
      contentHtml: ''
    };
  },
  computed: {
  },
  watch: {
  },
  methods: {
      getContent() {
          this.contentHtml = this.$refs.tuieditor.getHtml();
      }
  },
  mounted() {
  }
};
</script>
```

## 卸载

如果你不需要此组件，然后代码打包感觉不需要，可以卸载此组件。

1、CMD 运行

```bash
npm uninstall @toast-ui/editor
```

2、删除组件文件目录

[TuiEditor](https://github.com/lqsong/admin-element-vue/blob/master/src/components/TuiEditor/)