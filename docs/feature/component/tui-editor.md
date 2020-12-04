# tui-editor

[TuiEditor](https://github.com/lqsong/admin-element-vue/tree/typescript.v2/src/components/TuiEditor) 组件基于 `tui-editor` 封装，是一款 Markdown 编辑器；`tui-editor` [官网](https://ui.toast.com/tui-editor/)，[GitHub](https://github.com/nhnent/tui.editor)。

## Editor

### Props

| 名称     | 类型    | 默认值                      | 说明                                                                           |
| -------- | ------ | -------------------------- | ------------------------------------------------------------------------------------- |
| v-model   | String | " "                        | 编辑器的内容.                                       |
| toolbars | string[] |  `toolbarItems`          | tui.editor 工具栏的配置.                                                                    |
| height   | String | '300px'                    | 编辑器的高度.                                                                          |
| initialEditType   | String | 'markdown' |    | 编辑器的模式. (`markdown`or `wysiwyg`)                                                 |
| previewStyle | 'tab' \| 'vertical' \| undefined  | undefined             |  |

```js
const toolbarItems: string[] = [
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
  'codeblock',
];
```


## Viewer

### Props

| 名称     | 类型    | 默认值                      | 说明                                                                           |
| -------- | ------ | -------------------------- | ------------------------------------------------------------------------------------- |
| value    | String | " "                        | 显示的内容.                                       |


## 上传图片

组件统一了整个后台编辑器的上传图片api地址。相关代码如下,你可以自定义修改：

```vue
<template>
    <div ref="editorDiv"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, Ref, ref } from "vue";
import request from '@/utils/request';
import Editor from '@toast-ui/editor';
import 'codemirror/lib/codemirror.css'; // Editor's Dependency Style
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style

const toolbarItems: string[] = [
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
  'codeblock',
];

interface TuiEditorSetupData {
    editorDiv: Ref;
}

export default defineComponent({
    name: 'TuiEditor',
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        toolbars: {
            type: Array as PropType<string[]>,
            default: toolbarItems
        },
        height: {
            type: String,
            default: '300px'
        },
        previewStyle: {
            type: String as PropType<'tab' | 'vertical'>,
            default: ''
        },
        initialEditType: {
            type: String as PropType<'wysiwyg' | 'markdown'>,
            default: 'markdown'
        },
        useCommandShortcut: {
            type: Boolean,
            default: true
        }
    },
    setup(props, { emit }): TuiEditorSetupData {

        const editorDiv = ref<HTMLElement>();

        onMounted(()=> {
            if(editorDiv.value) {
                const editor = new Editor({
                    el: editorDiv.value,
                    toolbarItems: props.toolbars,
                    initialValue: props.modelValue,
                    height: props.height,
                    previewStyle: props.previewStyle,
                    initialEditType: props.initialEditType,
                    useCommandShortcut: props.useCommandShortcut,
                    events: {
                        /* load: (editor: any) => {
                        }, */
                        change: (/* param: { source: SourceType | 'viewer'; data: MouseEvent } */) => {
                            const value = editor.getMarkdown();
                            emit('update:modelValue', value);
                        },
                    },
                    hooks: {
                        addImageBlobHook: (fileOrBlob, callback) => {
                            const param = new FormData();
                            param.append('file', fileOrBlob);

                            request({
                                headers: { 'Content-Type': 'multipart/form-data' },
                                url: '/uploads',
                                method: 'POST',
                                data: param,
                            })
                            .then(res => {
                                const { data } = res;
                                const { url, name } = data;
                                callback(url, name);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                        },
                    }
                })
            }
        })

        return {
            editorDiv
        }

    }
})
</script>
```


## Example

[在线链接](http://tsv2-demo.admin-element-vue.liqingsong.cc/#/component/editor/tuieditor)

## 卸载

如果你不需要此组件，然后代码打包感觉不需要，可以卸载此组件。

1、CMD 运行

```bash
npm uninstall @toast-ui/editor
```

2、删除组件文件目录 [@/components/TuiEditor](https://github.com/lqsong/admin-element-vue/tree/typescript.v2/src/components/TuiEditor)