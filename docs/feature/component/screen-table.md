# ScreenTable

## 简介

此组件是结合 `Layout/Index` 布局，考虑到部分用户习惯，查看[Demo](http://jsv1-demo.admin-element-vue.liqingsong.cc/#/pagesample/list/three)调整浏览器高度观察效果,
它基于`element-ui`的 table 组件实现，通过`el-table`，并且利用 `vue` 插槽的特性来方便用户自定义。

## Props 说明

与  `element-ui`的 table 组件 Props 一致，不过只用一部分其他的都未定义，你可以根据自己需求进行调整，[@/components/ScreenTable](https://github.com/lqsong/admin-element-vue/blob/javascript.v1/src/components/ScreenTable/index.vue)。

详细说明：[element-ui > table 文档](https://element.eleme.cn/#/zh-CN/component/table)


## 代码示例

```html
<screen-table
    class="screen-conent"
    table-class="custom-table"
    header-row-class-name="custom-table-header"
    :data="tableData">
        <el-table-column
            fixed
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            fixed
            prop="date"
            label="日期"
            width="150">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            min-width="120">
        </el-table-column>
        <el-table-column
            prop="province"
            label="省份"
            min-width="120">
        </el-table-column>
        <el-table-column
            prop="city"
            label="市区"
            min-width="120">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址"
            min-width="300">
        </el-table-column>
        <el-table-column
            prop="zip"
            label="邮编"
            min-width="120">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text">查看</el-button>
                <el-dropdown class="margin-l5">
                    <span class="cursor-pointer">
                        <el-button type="text" >更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="tableEdit(scope.row)">编辑</el-dropdown-item>
                        <el-dropdown-item @click.native="tableDel(scope.row)">删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </template>
        </el-table-column>
</screen-table>
```

详细示例 [Demo](https://github.com/lqsong/admin-element-vue/blob/javascript.v1/src/views/Pagesample/List/three.vue)
