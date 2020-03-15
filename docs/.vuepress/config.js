module.exports = {
    title: 'admin-element-vue',
    description: 'Element-ui Vue Admin',
    dest: './dist',
    port: '8080',
    head: [
        ['link', {rel: 'icon', href: '/favicon.ico'}]
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav: require('./nav'),
        sidebar: require('./sidebar'),
        sidebarDepth: 3,
        lastUpdated: 'Last Updated',
        searchMaxSuggestoins: 10,
        serviceWorker: {
            updatePopup: {
                message: "有新的内容.",
                buttonText: '更新'
            }
        },
        editLinks: false,
        editLinkText: '在 GitHub 上编辑此页 ！'
    }
}