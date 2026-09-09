import { defineConfig } from 'vitepress'

const siteUrl = 'https://hjx-25pc1.xyz'
const siteName = '25计算机1知识库'
const siteDescription =
  '海南省经济技术学校 25 级计算机应用 1 班官方知识库,系统整理课程笔记、编程示例、学习心得与实用工具,助力同学共同成长进步。'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: siteName,
  description: siteDescription,
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1' }],
    ['meta', { name: 'author', content: 'mantoujun-lab' }],
    ['meta', { name: 'robots', content: 'index,follow' }],
    ['meta', { name: 'googlebot', content: 'index,follow' }],
    ['meta', { name: 'baiduspider', content: 'index,follow' }],
    ['meta', { name: 'format-detection', content: 'telephone=no' }],

    // Open Graph (页面级 title/description/url 由 transformPageData 注入)
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: siteName }],
    ['meta', { property: 'og:image', content: `${siteUrl}/favicon.png` }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],

    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:image', content: `${siteUrl}/favicon.png` }],

    // Icons / manifest
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/favicon.png' }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: siteName, href: '/rss.xml' }],

    // JSON-LD 站点结构化数据
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl,
      description: siteDescription,
      inLanguage: 'zh-CN',
      author: {
        '@type': 'Organization',
        name: 'mantoujun-lab',
        url: 'https://github.com/mantoujun-lab'
      },
      publisher: {
        '@type': 'Organization',
        name: 'mantoujun-lab',
        url: 'https://github.com/mantoujun-lab'
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    }) + '\n']
  ],
  transformPageData(pageData) {
    const { frontmatter: fm, relativePath } = pageData
    const title = fm.title || siteName
    const description = fm.description || siteDescription
    const isHome = relativePath === 'index.md' || relativePath === 'README.md'
    const slug = relativePath
      .replace(/\.md$/, '')
      .replace(/\/index$/, '')
    const canonical = isHome || slug === '' ? `${siteUrl}/` : `${siteUrl}/${slug}`

    const head: Array<[string, Record<string, string>]> = [
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: canonical }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['link', { rel: 'canonical', href: canonical }]
    ]
    if (fm.keywords) {
      head.push(['meta', { name: 'keywords', content: fm.keywords }])
    }

    fm.head = [...(fm.head || []), ...head]
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: 'favicon.png',
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '清除查询条件',
            backButtonTitle: '返回',
            noResultsText: '无法找到相关结果',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        },
        // 中文站点 MiniSearch 默认按空白/标点切分,无法召回子串匹配
        // 这里用空白先分词,再把含中文的词扩展成 1-2 字 gram,既保留英文/数字整词匹配,也让中文子串可召回
        miniSearch: {
          options: {
            tokenize: (text: string) => {
              const cjkRun = /[\u3400-\u9fff\uf900-\ufaff]+/g
              return text
                .split(/(\s+|[^\u3400-\u9fff\uf900-\ufaffa-zA-Z0-9]+)/)
                .filter((token) => token && !/^\s+$/.test(token))
                .flatMap((token) => {
                  if (cjkRun.test(token)) {
                    cjkRun.lastIndex = 0
                    return Array.from(token).flatMap((c, i) => [
                      token.slice(i, i + 1),
                      token.slice(i, i + 2)
                    ].filter(Boolean))
                  }
                  return [token]
                })
            }
          }
        }
      }
    },
    nav: [
      { text: '主页', link: '/' },
      { text: '课程', link: '/course/' },
      { text: '指南', link: '/guide/' },
      { text: '资源', link: '/resources/' },
      { text: '班级', link: '/class/' }
    ],

    // 按路径分组的多侧边栏:进入某个栏目只显示该栏目的目录,避免全站共用一份菜单
    sidebar: {
      '/course/': [
        {
          text: '课程笔记',
          items: [
            { text: '栏目概览', link: '/course/' },
            {
              text: 'Python pandas 题型总结',
              items: [
                { text: '栏目概览', link: '/course/python-pandas/' },
                { text: '数据预览', link: '/course/python-pandas/preview' },
                { text: '数据清洗', link: '/course/python-pandas/cleaning' },
                { text: '数据打标签', link: '/course/python-pandas/labeling' }
              ]
            },
            {
              text: '数据分析讲义',
              items: [
                { text: '栏目概览', link: '/course/data-analysis/' },
                {
                  text: '第 1 章 Python 数据分析简介',
                  items: [
                    { text: '章节概览', link: '/course/data-analysis/ch01/' },
                    { text: '数据分析简介', link: '/course/data-analysis/ch01/01-introduction' },
                    { text: '开发环境搭建', link: '/course/data-analysis/ch01/02-env-setup' }
                  ]
                },
                {
                  text: '第 2 章 pandas 快速入门',
                  items: [
                    { text: '章节概览', link: '/course/data-analysis/ch02/' },
                    { text: 'pandas 快速入门', link: '/course/data-analysis/ch02/01-pandas-quickstart' },
                    { text: 'Series 和 DataFrame', link: '/course/data-analysis/ch02/02-series-dataframe' },
                    { text: 'DataFrame 增删改', link: '/course/data-analysis/ch02/03-dataframe-crud' },
                    { text: 'DataFrame 查询', link: '/course/data-analysis/ch02/04-dataframe-query' },
                    { text: '租房数据分析示例', link: '/course/data-analysis/ch02/05-rent-analysis' }
                  ]
                },
                {
                  text: '第 3 章 pandas 数据清洗',
                  items: [
                    { text: '章节概览', link: '/course/data-analysis/ch03/' },
                    { text: '数据组合', link: '/course/data-analysis/ch03/01-data-combine' },
                    { text: '缺失值处理', link: '/course/data-analysis/ch03/02-missing-value' },
                    { text: '数据整理', link: '/course/data-analysis/ch03/03-data-reshape' },
                    { text: 'pandas 数据类型', link: '/course/data-analysis/ch03/04-pandas-types' }
                  ]
                },
                {
                  text: '第 4 章 pandas 数据处理',
                  items: [
                    { text: '章节概览', link: '/course/data-analysis/ch04/' },
                    { text: 'apply 自定义函数', link: '/course/data-analysis/ch04/01-apply' },
                    { text: '数据分组操作', link: '/course/data-analysis/ch04/02-groupby' },
                    { text: '数据透视表', link: '/course/data-analysis/ch04/03-pivot-table' },
                    { text: 'datetime 数据类型', link: '/course/data-analysis/ch04/04-datetime' }
                  ]
                },
                {
                  text: '第 5 章 Python 数据可视化',
                  items: [
                    { text: '章节概览', link: '/course/data-analysis/ch05/' },
                    { text: 'Matplotlib 绘图', link: '/course/data-analysis/ch05/01-matplotlib' },
                    { text: 'pandas 绘图', link: '/course/data-analysis/ch05/02-pandas-plot' },
                    { text: 'seaborn 绘图', link: '/course/data-analysis/ch05/03-seaborn' },
                    { text: 'pyecharts 绘图', link: '/course/data-analysis/ch05/04-pyecharts' }
                  ]
                },
                {
                  text: '第 6 章 pandas 综合案例',
                  items: [
                    { text: '章节概览', link: '/course/data-analysis/ch06/' },
                    { text: 'Appstore 数据分析', link: '/course/data-analysis/ch06/01-appstore' },
                    { text: '优衣库销售数据分析', link: '/course/data-analysis/ch06/02-uniqlo' },
                    { text: 'RFM 用户分群', link: '/course/data-analysis/ch06/03-rfm' }
                  ]
                }
              ]
            }
          ]
        }
      ],
      '/guide/': [
        {
          text: '学习指南',
          items: [
            { text: '栏目概览', link: '/guide/' },
            { text: 'Markdown 写作', link: '/guide/writing' },
            { text: '参与共建', link: '/guide/contributing' }
          ]
        }
      ],
      '/resources/': [
        {
          text: '资源',
          items: [
            { text: '栏目概览', link: '/resources/' },
            { text: '实用工具', link: '/resources/tools' },
            { text: '行业资讯', link: '/resources/news' }
          ]
        }
      ],
      '/class/': [
        {
          text: '班级事务',
          items: [
            { text: '栏目概览', link: '/class/' },
            { text: '宿舍 7S 管理', link: '/class/7s' }
          ]
        }
      ],
      '/funding': [
        {
          text: '支持本站',
          items: [
            { text: '赞赏作者', link: '/funding' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mantoujun-lab' },
      { icon: {
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path d="M0 0h16v16H0z" fill="none" /><path fill="currentColor" d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" /></svg>'
      }, link: 'https://hjx-25pc1.xyz' }
    ],

    footer: {
      message: '基于 MIT 协议开源 · 由 25 级计算机应用 1 班同学共同维护',
      copyright: `© ${new Date().getFullYear()} mantoujun-lab`
    },

    // “编辑此页”链接:点击跳转到 GitHub 上的源文件,方便贡献者直接修改
    // 文档源文件统一存放在 docs/ 目录下,文本使用“编辑此页”与中文用户更友好
    editLink: {
      pattern: 'https://github.com/mantoujun-lab/class-docs/edit/main/docs/:path',
      text: '编辑此页'
    }
  }
})
