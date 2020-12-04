# StoreModule 

## 介绍

在实际的项目开发中，**状态管理**必不可少，为了方便开发与统一维护，项目集成了`Vuex`，并实现了自动导入功能，且制定了 `StoreModule规则`。

::: tip 重点：
项目会自动导入 `@/store/***.ts`(全局 Store 数据模型目录下所有`StoreModule`文件)、`@/views/***/store.ts`(页面组件目录下所有文件名为`store.ts`文件)。

**如果`StoreModule`的 `name`字段参数出现重名，权重如下：**

> `@/store/***.ts` &gt; `@/views/***/store.ts`

:::

## StoreModuleType

为了规范统一方便开发与维护，实现自动化导入，项目制定了 `StoreModuleType` 规则。

```ts
// @/utils/store.ts

import { Module } from 'vuex';

/**
 * 自定义项目 Store Module 类型
 * 为自动导入的 store 做类型限制
 * [@/store文件夹下定义的 store]与[@/views文件夹下定义的`文件store.ts`] 必须继承此类型
 * @author LiQingSong
 */
export interface StoreModuleType<S> extends Module<S, S> {
  namespaced: true;
  name: string;
}
```

::: tip 注意重点：
 `@/store/***.ts` 与 `@/views/***/store.ts` 必须继承 `StoreModuleType` 此类型，因为`StoreModuleType`定义了`name`字段参数必填，这样做的原因是自动导入需求需要`name`。
:::

## 使用

项目允许在 `@/store目录下` 创建任意文件名的`.ts`文件与 `@/views目录下`任意目录下`store.ts`文件会被自动导入。

```sh
├── src                        # 源代码
│   ├── store                  # 全局 Store 数据模型目录（Vuex）
│   │   ├── global.ts          # 全局 StoreModule
│   │   └── user.ts            # user 公共StoreModule
│   ├── views                  # 页面组件目录(所有页面放在这里)
│   │   └── home               # 页面-首页
│   │       ├── data.d.ts      # TS 类型定义文件(可选)
│   │       ├── index.vue      # 当前页面入口
│   │       ├── service.ts     # 当前页面数据接口文件(可选)
│   │       └── store.ts       # 当前页面数据模型文件(可选)
```

以上可以看出 `@/store`目录下的 `global.ts` 、 `user.ts` 与 `@/views/home`目录下的 `store.ts` 就是 `StoreModule`。

### 1、定义

以 `@/store/user.ts` 为例，其内容如下：

```ts
import { Mutation, Action } from 'vuex';
import { StoreModuleType } from "@/utils/store";
import { ResponseData } from '@/utils/request';
import { queryCurrent, queryMessage } from "@/services/user";
import { removeToken } from "@/utils/localToken";


export interface CurrentUser {
  id: number;
  name: string;
  avatar: string;
  roles: string[];
}

// 定义 state 类型
export interface StateType {
  currentUser: CurrentUser;
  message: number;
}

// 定义 全局user模型类型，必须继承 `StoreModuleType` 这样可以限制 `name` 参数必填
export interface ModuleType extends StoreModuleType<StateType> {
  // state 类型
  state: StateType;
  // mutations(同步) 定义
  mutations: {
    saveCurrentUser: Mutation<StateType>;
    saveMessage: Mutation<StateType>;
  };
  // actions(异步) 定义
  actions: {
    fetchCurrent: Action<StateType, StateType>;
    fetchMessage: Action<StateType, StateType>;
    logout: Action<StateType, StateType>;
  };
}

// 定义 state 初始化值
const initState: StateType = {
  currentUser: {
    id: 0,
    name: '',
    avatar: '',
    roles: [],
  },
  message: 0,
}

// 定义 UserStoreModel
const StoreModel: ModuleType = {
  namespaced: true,
  // 名称必填，且唯一
  name: 'user',
  // state 初始化值必须解构赋值
  state: {
    ...initState
  },
  mutations: {
    saveCurrentUser(state, payload) {
      state.currentUser = {
        ...initState.currentUser,
        ...payload,
      }
    },
    saveMessage(state, payload) {
      state.message = payload;
    }
  },
  actions: {
    async fetchCurrent({ commit }) {
      try {
        const response: ResponseData = await queryCurrent();
        const { data } = response;
        commit('saveCurrentUser', data || {});
        return true;
      } catch (error) {
        return false;
      }
    },
    async fetchMessage({ commit }) {
      try {
        const response: ResponseData = await queryMessage();
        const { data } = response;        
        commit('saveMessage', data || 0);
        return true;
      } catch (error) {
        return false;
      }
    },
    async logout({ commit }) {
      try {
        await removeToken();
        commit('saveCurrentUser', { ...initState.currentUser });
        return true;
      } catch (error) {
        return false;
      }
    }
  }
}


// 最终导出定义 Model
export default StoreModel;
```

### 2、使用

```vue
<template>
    <div v-if="loading">加载中</div>
    <div v-else>{{currentUser}}</div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { StateType as UserStateType, CurrentUser } from "@/store/user";

interface DemoSetupData {
    loading: boolean;
    currentUser: CurrentUser;
}

export default defineComponent({
    name: 'Demo',
    setup(): DemoSetupData {
       
        const store = useStore<{user: UserStateType}>();

        // 获取当前登录用户信息
        const currentUser = computed<CurrentUser>(()=> store.state.user.currentUser);

        const loading = ref<boolean>(false);
        const getUser = async () => {
            loading.value = true;
            await store.dispatch('user/fetchCurrent');                  
            loading.value = false;
        }

        onMounted(() => {
            getUser();
        })

        return {
            loading: loading as unknown as boolean,
            currentUser: isLogin as unknown as CurrentUser,           
        }
    }
})
</script>
```


