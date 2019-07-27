module.exports = {
  title: '学习笔记',
  description: '每天进步一丢丢',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    lastUpdated: 'Last Updated',
    sidebarDepth: 2,
    sidebar: 'auto',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'CSS3Note', link: '/views/CSS3Note/' },
      { text: 'JSNote', link: '/views/JSNote/' },
      { text: 'OtherNote', link: '/views/OtherNote/' }
    ],
    sidebar: {
      '/views/CSS3Note/': [
        '',
        {
          title: '背景与边框',
          collapsable: false,
          children: [
            'backgroundAndBorder/1-1/'
          ]
        },
      ]
    }
  }
}