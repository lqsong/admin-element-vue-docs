# 多语言

## 介绍

在实际的项目开发中，我们有可能会用到多语言，并且为了方便开发与统一维护，项目集成了自动导入多语言功能。

> 目前项目多语言配置了 `en-US`英文、`zh-CN`中文简体、`zh-TW`中文繁体三类语种。


::: tip 重点：
项目会自动导入 `@/locales`全局国际化文件目录下语言配置文件、`@/components/***/locales`全局公用组件下语言配置文件、`@/layouts/***/locales`项目 layout下语言配置文件、`@/views/***/locales`页面组件目录下语言配置文件，以上4个相对位置。

**如果多语言语种文件中下标key出现重名，权重如下：**

> `@/locales` &gt; `@/components/***/locales` &gt; `@/layouts/***/locales` &gt; `@/views/***/locales`

:::

## 语种文件名规则

为了实现自动化导入，并为了方便开发与统一维护，**多语言语种配置文件名，命名规则** 必不可少，并且需要在以上述说的4个位置中创建。

文件名规则：`/^([a-z]{2})-?([A-Z]{2})?\.ts$/`，比如：`zh-CN.ts`。


## 多语言使用

目前项目多语言有`en-US`英文、`zh-CN`中文简体、`zh-TW`中文繁体三类语种。如果你创建的`Layout`、`组件`或`页面`使用多语言，以`@/views/home`页面为例：

```sh
views                  
└── home              
    ├── locales          # 当前页面国际化目录
    │   ├── en-US.ts     # 当前页面英文国际化配置
    │   ├── zh-CN.ts     # 当前页面中文简体国际化配置
    │   └── zh-TW.ts     # 当前页面中文繁体国际化配置
    ├── index.vue        # 当前页面入口
```

以上可以看出：

- 1、`@/views/home` 下创建 `locales` 目录。

- 2、在 `locales` 目录中创建 `en-US.ts` 、 `zh-CN.ts` 、`zh-TW.ts` 对应语种文件。

- 3、语种文件中书写格式：

```ts
export default {
    'key': 'value',
};
```

- 4、`index.vue` 文件模板中使用：

```vue
<template>
    <div >
     {{t('key')}}
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
export default defineComponent({
    setup() {
        const { t } = useI18n();

        return {
            t
        }
    }
})
</script>
```



## 新增多语言语种

目前项目多语言有`en-US`英文、`zh-CN`中文简体、`zh-TW`中文繁体三类语种。如果您需要新增语种如下操作即可，以`葡萄牙语`为例：

#### 1、`@/config/i18n.ts` 中引入 `Element Plus` 的 `葡萄牙语`并配置

```ts
/**
 * elementUI 多语言 配置
 */
import enUS from 'element-plus/lib/locale/lang/en';
import zhCN from 'element-plus/lib/locale/lang/zh-cn';
import zhTW from 'element-plus/lib/locale/lang/zh-tw';
import ptBR from 'element-plus/lib/locale/lang/pt-br';
export const elementPlusMessages: { [key: string]: any} = {
    'zh-CN': zhCN,
    'zh-TW': zhTW,
    'en-US': enUS,
    'pt-BR': ptBR, // 葡萄牙语
}

```

#### 2、`@/components/SelectLang` 配置下拉选项

```ts
const locales: string[] = ['zh-CN', 'zh-TW', 'en-US', 'pt-BR'];
const languageLabels: {[key: string]: string} = {
    'zh-CN': '简体中文',
    'zh-TW': '繁体中文',
    'en-US': 'English',
    'pt-BR': 'Português' // 葡萄牙语
};
const languageIcons: {[key: string]: string} = {
    'zh-CN': '🇨🇳',
    'zh-TW': '🇭🇰',
    'en-US': '🇺🇸',
    'pt-BR': '🇧🇷' // 葡萄牙语
};
```

#### 3、 在以上"重点"中述说的4个相对位置中创建 `pt-BR.ts` 文件

内容格式如下，以`@/locales`全局国际化文件目录下语言配置文件为例：

```ts
// @/locales/pt-BR.ts
export default {
    'empty': 'vazio',
    'app.global.menu.notfound': 'Não encontrado',
    'app.global.form.validatefields.catch': 'A verificação não foi aceitada. por favor, verifique',
};
```

