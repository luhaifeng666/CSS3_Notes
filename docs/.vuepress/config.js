module.exports = {
  title: '学习笔记',
  description: '每天进步一丢丢',
  base: '/Notes/',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    lastUpdated: 'Last Updated',
    sidebarDepth: 3,
    sidebar: 'auto',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'CSS3Note', link: '/views/CSS3Note/' },
      { text: 'JSNote', link: '/views/JSNote/' },
      // { text: 'OtherNote', link: '/views/OtherNote/' },
      { text: 'GitHub', link: 'https://luhaifeng666.github.io/Notes/' },
      { text: 'LBUI', link: 'https://github.com/luhaifeng666/LBUI' }
    ],
    sidebar: {
      '/views/CSS3Note/': [
        '',
        {
          title: '背景与边框',
          collapsable: false,
          children: [
            'backgroundAndBorder/BAB-1',
            'backgroundAndBorder/BAB-2',
            'backgroundAndBorder/BAB-3',
          ]
        },
      ],
      '/views/JSNote/': [
        '',
        {
          title: '201907归档',
          collapsable: false,
          children: [
            '201907/10',
            '201907/11'
          ]
        }
      ],
      // '/views/OtherNote': [
      //   '',
      //   {
      //     title: '201907',
      //     collapsable: false,
      //     children: [
      //       '201907/10'
      //     ]
      //   }
      // ]
    }
  }
}