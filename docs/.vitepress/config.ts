import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  lastUpdated: true,
  base: '/vitets2/',
  outDir: './.vitepress/vitets2',
  srcDir: 'src',
  title: 'admin-element-vue',
  titleTemplate: 'vite.ts2',
  description: 'Vite Element Plus Vue3.x Admin',
  head: [
    ['link', {rel: 'icon', href: '/favicon.ico'}],
    ['script', {type: 'text/javascript', src: 'https://hm.baidu.com/hm.js?8a4ba07cd2305cef8c42e01569f7658b'}]
  ],
  markdown: {
    theme: 'material-palenight',
    lineNumbers: true
  },
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/', activeMatch: '/guide/' },
      { text: '捐赠', link: '/donate/', activeMatch: '/donate/' },
      {
        text: '生态',
        items: [
          {
            text: '框架模板',
            items: [
              {text: 'frame-template-vue', link: 'http://frame-template-vue.liqingsong.cc'},
            ],
          },
          {
            text: '后台框架',
            items: [
              {text: 'admin-element-vue', link: 'http://admin-element-vue.liqingsong.cc'},
              {text: 'admin-antd-vue', link: 'http://admin-antd-vue.liqingsong.cc'},
              {text: 'admin-antd-react', link: 'http://admin-antd-react.liqingsong.cc'},
              {text: 'electron-admin-element-vue', link: 'http://admin-element-vue.liqingsong.cc/tsv2/guide/senior/electron.html'},
              {text: 'electron-admin-antd-vue', link: 'http://admin-antd-vue.liqingsong.cc/webpackts/guide/senior/electron.html'},
              {text: 'electron-admin-antd-react', link: 'http://admin-antd-react.liqingsong.cc/guide/senior/electron.html'},
              {text: 'admin-vue3-micro-qiankun', link: 'http://admin-vue3-micro-qiankun.liqingsong.cc'},
            ],
          },
          {
            text: '前台框架',
            items: [
              {text: 'midway-vue3-ssr', link: 'http://midway-vue3-ssr.liqingsong.cc'},
              {text: 'midway-react-ssr', link: 'http://midway-react-ssr.liqingsong.cc'},
              {text: 'template-vant-vue', link: 'http://template-vant-vue.liqingsong.cc'},
            ],
          },
          
        ],
      },
      {
        text: 'vite.ts2',
        items: [
            {
                text: '其他版本',
                items: [
                  {text: 'vite.ts', link: 'http://admin-element-vue.liqingsong.cc/vitets/'},
                  {text: 'ts.v2', link: 'http://admin-element-vue.liqingsong.cc/tsv2/'},
                  {text: 'js.v1', link: 'http://admin-element-vue.liqingsong.cc/jsv1/'},
                ] 
            }            
        ]
    },
    {
        text: '预览', link: 'http://vitets2-demo.admin-element-vue.liqingsong.cc'
    },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '开始',
          collapsible: true,
          items: [
            { text: '简介', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' },
          ]
        },
        {
          text: '基础',
          collapsible: true,
          items: [          
            { text: '环境准备', link: '/guide/env-prepare' },
            { text: '配置', link: '/guide/config' },
            { text: '布局', link: '/guide/layout' },
            { text: '路由', link: '/guide/router' },
            { text: '页面', link: '/guide/page' },
            { text: '状态管理', link: '/guide/store' },
            { text: '认证与权限', link: '/guide/permission' },
            { text: '多语言', link: '/guide/locales' },
            { text: '数据请求', link: '/guide/server' },
            { text: 'Mock Data', link: '/guide/mock' },
            { text: '构建与部署', link: '/guide/build-and-deploy' },
          ]
        },
        {
          text: '进阶',
          collapsible: true,
          items: [          
            { text: '跨域', link: '/guide/senior/cors' },
            { text: '错误处理', link: '/guide/senior/error' },
          ]
        },        
      ],
    },
    /* algolia: {
      indexName: 'admin-element-vue',
      appId: 'JUX5Q8NL56',
      apiKey: 'ca6d7a7ea1955d40fa7ebbe9266d03c3'
    }, */
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lqsong/admin-element-vue' },
    ],
    logo: '/images/logo.png',
    outlineTitle: '页面概要',
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2022-${new Date().getFullYear()} LiQingSong`
    },
    
  }
  // ...
})
