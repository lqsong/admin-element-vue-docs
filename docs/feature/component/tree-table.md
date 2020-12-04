# 树形表格


## 简介

此组件是基于`element-ui`的 Tree 组件实现，通过`el-tree`，并且利用 `vue` 插槽的特性让用户来自定义操作栏内容。

## Props

| 名称     | 类型    | 默认值                      | 说明                                                                           |
| -------- | ------ | -------------------------- | ------------------------------------------------------------------------------------- |
| column   | Array  |  必填，没有默认值            | 内容格式: [ { title: '标题',  label: 'label',  minWidth: 300 }]  |
| operationOpen  | Boolean |  true          |  操作栏目是否开启                                                                 |
| operationText   | String |   '操作'             | 操作栏目标题                                  |
| operationWidth | Number | 200                    | 操作栏目宽度                   |
| data | Array | []                    | 数据，参照  `element-ui`-`el-tree`文档                 |
| emptyText | String | '暂无数据'                    | 参照  `element-ui`-`el-tree`文档                 |
| data | Array | []                    | 数据，参照  `element-ui`-`el-tree`文档                 |
| nodeKey | String | 必填                    | 参照  `element-ui`-`el-tree`文档                 |
| lazy | Boolean | false                   | 参照  `element-ui`-`el-tree`文档                 |
| load | Function | -                    | 参照  `element-ui`-`el-tree`文档                 |
| props | Object | { label: 'label', children: 'children', isLeaf: 'leaf'}    | 参照  `element-ui`-`el-tree`文档                 |
| defaultExpandedKeys | Array | []                    | 参照  `element-ui`-`el-tree`文档                 |
| showCheckbox | Boolean | false                    | 参照  `element-ui`-`el-tree`文档                 |
| checkStrictly | Boolean | false                    | 参照  `element-ui`-`el-tree`文档                 |
| defaultCheckedKeys | Array | []                    | 参照  `element-ui`-`el-tree`文档                 |
| accordion | Boolean | false                    | 参照  `element-ui`-`el-tree`文档                 |
| iconClass | String | ''                    | 参照  `element-ui`-`el-tree`文档                 |
| expandOnClickNode | Boolean | true                    | 参照  `element-ui`-`el-tree`文档                 |


与  `element-ui`的 tree 组件 Props 一致，不过只用一部分其他的都未定义，你可以根据自己需求进行调整，[@/components/TreeTable](https://github.com/lqsong/admin-element-vue/blob/javascript.v1/src/components/TreeTable/index.vue)。

详细说明：[element-ui > tree 文档](https://element.eleme.cn/#/zh-CN/component/tree)

## Methods

与  `element-ui`的 tree 组件 Methods 一致，不过只用一部分其他的都未定义，你可以根据自己需求进行调整，[@/components/TreeTable](https://github.com/lqsong/admin-element-vue/blob/javascript.v1/src/components/TreeTable/index.vue)。

详细说明：[element-ui > tree 文档](https://element.eleme.cn/#/zh-CN/component/tree)



## 代码示例

```html
<template>
    <div class="main-conent main-conent-minheight">
        <el-card shadow="never" class="border-none">
            <div slot="header">
                <el-row>
                    <el-col>
                        <el-button type="primary" @click="add(0)">新增一级</el-button>
                    </el-col>
                </el-row>              
            </div>


            <tree-table
                :data="data"
                class="height-100"
                :column="treeTableColumn"
                node-key="id"
                >
                <template v-slot:default="{ node, data }">
                    <el-button
                        type="text"
                        size="mini"
                        @click.stop="add(node.level, data)">
                        新增下级
                    </el-button>
                    <el-button
                        type="text"
                        size="mini"
                        @click.stop="add(node.level, data)">
                        修改
                    </el-button>
                    <el-button
                        type="text"
                        size="mini"
                        @click.stop="del(data)">
                        删除
                    </el-button> 
                </template>
            </tree-table>
            
          </el-card>
    </div>
</template>
<script>
import TreeTable from '@/components/TreeTable';
export default {
    components: {
        TreeTable
    },
    data () {
      return {
            treeTableColumn: [
                {
                    title: '分类列表',
                    label: 'label1',
                    minWidth: 300
                },
                {
                    title: '简称',
                    label: 'short',
                    minWidth: 300
                }
            ],
            data: [
                {
                    id: 1,
                    label1: '一级 1',
                    short: 'one 1',
                    children: [{
                    id: 4,
                    label1: '二级 1-1',
                    short: 'two 1-1',
                    children: [{
                        id: 9,
                        label1: '三级 1-1-1',
                        short: 'three 1-1-1'
                    }, {
                        id: 10,
                        label1: '三级 1-1-2',
                        short: 'three 1-1-1'
                    }]
                    }]
                }, 
                {
                    id: 2,
                    label1: '一级 2',
                    short: 'one 2',
                    children: [{
                    id: 5,
                    label1: '二级 2-1',
                    short: 'two 2-1'
                    }, {
                    id: 6,
                    label1: '二级 2-2',
                    short: 'two 2-3'
                    }]
                },
                {
                    id: 3,
                    label1: '一级 3',
                    short: 'one 3',
                    children: [{
                    id: 7,
                    label1: '二级 3-1',
                    short: 'tow 3-1'
                    }, {
                    id: 8,
                    label1: '二级 3-2',
                    short: 'tow 3-2'
                    }]
                },
                {
                    id: 20,
                    label1: '一级 4',
                    short: 'one 4',
                    children: [{
                    id: 21,
                    label1: '二级 4-1',
                    short: 'tow 4-1'
                    }, {
                    id: 22,
                    label1: '二级 4-2',
                    short: 'tow 4-2'
                    }]
                },
                {
                    id: 30,
                    label1: '一级 5',
                    short: 'one 5',
                    children: [{
                    id: 31,
                    label1: '二级 5-1',
                    short: 'tow 5-1'
                    }, {
                    id: 32,
                    label1: '二级 5-2',
                    short: 'tow 5-2'
                    }]
                }
            ]
        
      };
    },
    methods: {
        add(level, data) {
            console.log(level, data);
            this.$message({
                message: '这里可以显示一个弹框表单',
                type: 'success'
            });
        },
        del(data) {
            console.log(data);
            const _this = this;
            _this.$confirm('是否确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _this.$message({
                    message: '删除成功',
                    type: 'success'
                });
            }).catch(()=>{});
        }
    }
};
</script>
```

详细示例 [Demo](https://github.com/lqsong/admin-element-vue/tree/javascript.v1/src/views/Component/Tree)
