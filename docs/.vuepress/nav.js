module.exports = [
    {
        text: '指南', link: '/guide/'
    },
    {
        text: '功能',
        items: [
			{
                text: '组件',
				items: [
					{text: 'tui-editor', link: '/feature/component/tui-editor'},
					{text: 'CKEditor', link: '/feature/component/CKEditor'},
                    {text: 'IconSvg', link: '/feature/component/icon-svg'},
                    {text: 'IconFont', link: '/feature/component/icon-font'}
				]
            },
            {
                text: 'Composables Api',
				items: [
					{text: 'useEcharts', link: '/feature/composables/echarts'}
				]
            },
            {
                text: 'Directives',
				items: [
					{text: 'v-permission', link: '/feature/directives/permission'}
				]
            },
			{
                text: 'Script',
				items: [
					{text: 'Svgo', link: '/feature/script/svgo'}
				]
            }
        ]
    },
    {
        text: '捐赠', link: '/donate/'
    },
    {
        text: '生态',
		items: [
            {text: 'admin-antd-react', link: 'http://admin-antd-react.liqingsong.cc'},
            {text: 'admin-antd-vue', link: 'http://admin-antd-vue.liqingsong.cc'},
        ]
    },
    {
        text: 'ts.v2',
        items: [
            {
                text: '其他版本',
                items: [
                    {text: 'js.v1', link: 'http://admin-element-vue.liqingsong.cc/jsv1/'},
                ] 
            }            
        ]
    },
    {
        text: '预览', link: 'http://tsv2-demo.admin-element-vue.liqingsong.cc'
    },
    {
        text: 'GitHub',
		items: [
            {text: 'Github', link: 'https://github.com/lqsong/admin-element-vue'},
            {text: 'Gitee', link: 'https://gitee.com/lqsong/admin-element-vue'},
        ]
    }
]