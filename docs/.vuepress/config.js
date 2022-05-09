module.exports = {
    title: 'admin-element-vue',
    description: 'Vite Element Plus Vue3.x Admin',
    dest: './vitets',
    base: '/vitets/',
    port: '8080',
    head: [
        ['link', {rel: 'icon', href: '/favicon.ico'}],
        ['script', {type: 'text/javascript', src: 'https://hm.baidu.com/hm.js?8a4ba07cd2305cef8c42e01569f7658b'}]
        /* ['script', {type: 'text/javascript', src: 'https://s4.cnzz.com/z_stat.php?id=1278815770&web_id=1278815770'}],
        ['script', {type: 'text/javascript'}, `
            window.onload = function(){
                var oScript = document.createElement("script");
                oScript.type = "text/javascript";
                oScript.url = "https://s4.cnzz.com/z_stat.php?id=1278815770&web_id=1278815770";
                document.body.parentNode.appendChild(oScript);
            };
        `] */
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav: require('./nav'),
        sidebar: require('./sidebar'),
        sidebarDepth: 3,
        // lastUpdated: 'Last Updated',
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