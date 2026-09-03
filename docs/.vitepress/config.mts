import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "25计算机1知识库",
  description: "班级文档",
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: 'favicon.png',
    nav: [
      { text: '主页', link: '/' },
      { text: '实例', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: '实例',
        items: [
          { text: '实例', link: '/markdown-examples' },
          { text: 'API 参考', link: '/api-examples' }
        ]
      },
      {
        text: '文档',
        items: [
          { text: '学生宿舍7S管理标准', link: '/7s' }
        ]
      },
      {
        text: '贡献',
        items: [
          { text: '赞赏', link: '/funding' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mantoujun-lab' },
      { icon: {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path d="M0 0h16v16H0z" fill="none" /><path fill="currentColor" d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" /></svg>'
      }, link: 'https://hjx-25pc1.xyz' }
    ]
  }
})
