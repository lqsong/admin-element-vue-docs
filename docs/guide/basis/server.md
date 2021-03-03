# 与服务端交互

## 前端请求流程

在 `admin-element-vue-vite-ts` 中，一个完整的前端 UI 交互到服务端处理流程是这样的：

1.  UI 组件交互操作；
2.  调用统一管理的 `store.ts` StoreModel；(此步可以省略，可以直接进行下步)
3.  `store.ts` 调用 `service.ts` api 请求函数；
4.  使用封装的 `@/utils/request.ts` 发送请求；
5.  获取服务端返回；
6.  更新 data；


##  request.ts

`@/utils/request.ts` 是基于 [Axios](https://github.com/axios/axios) 的封装，便于统一处理 POST，GET 等请求参数，请求头，以及错误提示信息等。具体可以参看 [@/utils/request.ts](https://github.com/lqsong/admin-element-vue/blob/vite.ts/src/utils/request.ts)。
它封装了全局 `request拦截器`、`response拦截器`、`统一的错误处理`、`统一做了超时处理`、`baseURL设置等`。

## 一个表单提交例子：

[代码](https://github.com/lqsong/admin-element-vue/tree/vite.ts/src/views/pagesample/form/basic)


```ts
// @/views/pagesample/form/basic/service.ts
import request from '@/utils/request';
import { FormDataType } from './data.d';

export async function createData(params: FormDataType): Promise<any> {
  return request({
    url: '/pages/form',
    method: 'POST',
    data: params,
  });
}

```

```ts
// @/views/pagesample/form/basic/store.ts
import { Mutation, Action } from 'vuex';
import { StoreModuleType } from "@/utils/store";
import { createData } from './service';
import { FormDataType } from "./data.d";

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface StateType {}

export interface ModuleType extends StoreModuleType<StateType> {
    state: StateType;
    mutations: {
    };
    actions: {
        create: Action<StateType, StateType>;
    };
}

const initState: StateType = {};

const StoreModel: ModuleType = {
    namespaced: true,
    name: 'FormBasic',
    state: {
        ...initState
    },
    mutations: {        
    },
    actions: {
        async create({ commit }, payload: FormDataType) {
            try {
                await createData(payload);
                return true;
            } catch (error) {
                return false;
            }
        }
    }
}

export default StoreModel;
```

```ts
// @/views/pagesample/form/basic/index.vue
```
```vue
<template>
    <div class="indexlayout-main-conent">
      <el-card shadow="never" class="cus-card">
        <el-row>
            <el-col :xs="0" :sm="2"  :md="4" :lg="6" :xl="6" class="border-solid-transparent"></el-col>
            <el-col :xs="24" :sm="20"  :md="16" :lg="12" :xl="12">
                <el-form :model="modelRef" :rules="rulesRef" ref="formRef" label-width="100px">
                    <el-form-item  label="标题" prop="title">
                        <el-input v-model="modelRef.title" placeholder="请输入"  />
                    </el-form-item>
                    <el-form-item label="起止日期" prop="date">
                        <el-date-picker 
                          type="daterange" 
                          v-model="modelRef.date" 
                          range-separator="至"  
                          start-placeholder="开始日期" 
                          end-placeholder="结束日期"
                          class="form-basic-width100">                            
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item  label="下拉选择" prop="select">
                        <el-select v-model="modelRef.select" placeholder="请选择" clearable style="width:100%">
                            <el-option label="select1" value="1"></el-option>
                            <el-option label="select2" value="2"></el-option>
                            <el-option label="select3" value="3"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item  label="单选按钮1" prop="radio1">
                        <el-radio-group v-model="modelRef.radio1">
                            <el-radio label="1">item 1</el-radio>
                            <el-radio label="2">item 2</el-radio>
                            <el-radio label="3">item 3</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item  label="单选按钮2" prop="radio2">
                        <el-radio-group v-model="modelRef.radio2">
                            <el-radio-button label="1">item 1</el-radio-button>
                            <el-radio-button label="2">item 2</el-radio-button>
                            <el-radio-button label="3">item 3</el-radio-button> 
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item  label="复选框" prop="checkbox">                        
                        <el-checkbox-group v-model="modelRef.checkbox">
                            <el-checkbox label="1">item 1</el-checkbox>
                            <el-checkbox label="2">item 2</el-checkbox>
                            <el-checkbox label="3">item 3</el-checkbox>
                            <el-checkbox label="4" disabled>item 4</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item  label="备注" prop="remark"> 
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="请输入内容"
                            v-model="modelRef.remark">
                        </el-input>
                    </el-form-item>



                    
                    <el-form-item>
                        <el-button type="primary" @click="handleSubmit" :loading="submitLoading">
                        提交
                        </el-button>  
                        <el-button @click="resetFields">
                        重置
                        </el-button>                           
                    </el-form-item>


                </el-form>

            </el-col>
        </el-row>

      </el-card>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import { ElForm, ElMessage } from "element-plus";
import { FormDataType } from "./data.d";
import { StateType as FormStateType } from "./store";


interface FormBasicPageSetupData {
    modelRef: FormDataType;
    rulesRef: any;
    formRef: typeof ElForm;
    resetFields: () => void;
    submitLoading: boolean;
    handleSubmit: () => Promise<void>;
}

export default defineComponent({
    name: 'FormBasicPage',
    setup(): FormBasicPageSetupData {

        const store = useStore<{FormBasic: FormStateType}>();

        // 表单值
        const modelRef = reactive<FormDataType>({
            title: '',
            date: [],
            select: '',
            radio1: '',
            radio2: '',
            checkbox: [],
            remark: ''
        });
        // 表单验证
        const rulesRef = reactive({
            title: [
                {
                    required: true,
                    message: '必填',
                },
            ],
            date: [
                {
                    required: true,
                    message: '必填',
                    trigger: 'change', 
                    type: 'array' 
                },
            ],  
            select: [
                {
                    required: true,
                    message: '请选择',
                },
            ],  
            radio1: [],  
            radio2: [
                {
                    required: true,
                    message: '请选择',
                },
            ],
            checkbox:[],
            remark: []       
        });
        // form
        const formRef = ref<typeof ElForm>();
        // 重置
        const resetFields = () => {
            formRef.value && formRef.value.resetFields();
        }
        // 提交loading
        const submitLoading = ref<boolean>(false);
        // 提交
        const handleSubmit = async () => {
            submitLoading.value = true;
            try {
                const valid: boolean =  formRef.value ? await formRef.value.validate() : false;
                if(valid === true) {
                    const res: boolean = await store.dispatch('FormBasic/create',modelRef);                
                    if (res === true) {
                        ElMessage.success('提交成功');
                        resetFields();                 
                    }
                }
                
            } catch (error) {
                // console.log('error', error);
            }
            submitLoading.value = false;
        };

        return {
            modelRef,
            rulesRef,
            formRef: formRef as unknown as typeof ElForm,
            resetFields,
            submitLoading: submitLoading as unknown as boolean,
            handleSubmit,
        }



    }
})
</script>
<style lang="scss">
.form-basic-width100.el-input__inner {
    width: 100%;
}
</style>
```
