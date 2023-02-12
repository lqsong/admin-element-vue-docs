# 环境准备 {#index}

你需要在本地安装 [node >=14.18.0](http://nodejs.org/)。


## 安装编辑器 {#install-vscode}

这里推荐 [Visual Studio Code](https://code.visualstudio.com/)，请下载，并安装。

## 配置 Visual Studio Code 插件 {#config-vscode}

在 `vscode` 编辑器扩展中搜索以下插件，并安装。

### EditorConfig {#config-vscode-editconfig}

因为 `vscode` 是没有绑定 EditorConfig，所以才会需要此插件，实际上真正作用的是 [EdiorConfig](https://editorconfig.org/)，它用来取代 各个开发工具或者编辑器 默认的 格式化内容功能 ，简单来说，就是由你自己来决定开发工具或者编辑器在格式化时对于内容的排版，这样的好处是不同的开发工具，相同的项目，内容风格统一！


### Vue Language Features(Volar) {#config-vscode-vue-volar}

为Vue、Vitepress和tite- Vue构建的语言支持扩展。

### TypeScript Vue Plugin(Volar) {#config-vscode-typescriptvue}

一个TS服务器插件，使TS服务器知道*.vue文件。

### Prettier - Code formatter {#config-vscode-prettier}

代码格式化工具，专门为了格式化代码而生的，擅长格式化代码。

### ESLint {#config-vscode-eslint}

代码检查工具，用来检查你的代码是否符合指定的规范，擅长发现代码的错误。

> 设置[编辑器的 ESLint 快捷键](http://liqingsong.cc/article/detail/35)

### TSLint Vue {#config-vscode-tslintvue}

typescript格式验证工具，vue模板中。

### Stylelint {#config-vscode-stylelint}

在前端项目中，除了JavaScript代码需要被lint之外，css代码同样需要被lint。对于css的lint操作，Stylelint必是首选。

### DotENV {#config-vscode-dotenv}

编辑.env文件时添加了便捷的语法高亮显示功能。



## 安装 Nvm，配置 Nodejs 环境 {#install-nvm}

这里以 `Windows` 系统为例， [安装教程](http://liqingsong.cc/article/detail/4)。

### 安装 Node.js {#install-node}

```sh
# 这里安装node 14.20.0 版本为例
nvm install v14.20.0
```

### 安装 pnpm {#install-pnpm}


```sh
npm install pnpm -g
```

> 推荐使用 `pnpm`, [pnpm的安装与使用](http://liqingsong.cc/article/detail/26)。


