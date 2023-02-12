# 多语言 {#index}

在实际的项目开发中，我们有可能会用到多语言，本项目结合大量实践，考虑到实际应用情况，基于够用为原则。基于 `pinia` 封装了简易版多语言功能。

## 全局多语言目录 {#global}

项目创建了全局多语言目录 `/src/locales`, 目录下有以下文件：

```bash
├── locales                # 多语言全局目录
│   ├── en-US.ts           # 英文
│   ├── index.ts           # 全局多语言入口
│   ├── zh-CN.ts           # 简体
│   └── zh-TW.ts           # 繁体
```

> 如果有公共的语言内容，你可以在此目录下文件中进行添加。

## 多语言组合式函数 {#composables}

项目在 `/src/composables/useI18n.ts` 文件中，定义了多语言组合式函数 `useI18n` ，内容如下：

```ts
import { useI18nStore } from "@/store/i18n";
import { TI18n } from "@/@types/i18n";

/**
 * @description  引入语言包
 * @param locales  当前本地(文件夹下)语言包
 * @returns (key: string, format?: TUseFormat) => string
 * @author LiQingSong
 */
export const useI18n = (locales?: TI18n) => {
	const i18n = useI18nStore();
	return i18n.use(locales);
};
```

## 使用方法 {#action}

请参照页面代码：

```vue
<script setup lang="ts">
import { useI18n } from "@/composables/useI18n";
import locales from "./locales"; // 当前页面文件同级目录locales
const t = useI18n(locales);
</script>

<template>
	<div>
		{{t('app.global.nodata')}}
	</div>
</template>
```

> 如果当前页面，没有需要使用的多语言，只存在使用全局的多语言，`useI18n` 组合式函数的 `locales` 参数可以不传。


## 新增一种语言 {#add}

在实际项目应用中，我们可能不止 `zh-CN`中文简体、`zh-TW`中文繁体、`en-US`英文这三种语言，还有其他可能的语言需要，以新增`葡萄牙语`为例：

一、`/src/@types/i18n.d.ts` TS类型文件中 `TI18nKey`类型需要调整，如下:

```ts
/**
 * @description: 语言名类型
 */
export type TI18nKey = "zh-CN" | "zh-TW" | "en-US" | "pt-BR";
```

二、全局多语言目录 `/src/locales`, 下新增 `pt-BR.ts` 文件：

```bash{4}
├── locales                # 多语言全局目录
│   ├── en-US.ts           # 英文
│   ├── index.ts           # 全局多语言入口
│   ├── pt-BR.ts           # 葡萄牙语
│   ├── zh-CN.ts           # 简体
│   └── zh-TW.ts           # 繁体
```

> `pt-BR.ts` 文件内容格式与其他语言内容格式保持一致。

三、在其他相对应使用多语言的位置都需要增加 `pt-BR.ts` 文件。





