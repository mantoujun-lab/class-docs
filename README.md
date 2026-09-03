<div align="center">

# 📚 班级文档

**海南省经济技术学校 25 级计算机应用 1 班 · 知识点文档库**

[![GitHub License](https://img.shields.io/github/license/mantoujun-lab/class-docs?style=for-the-badge)](LICENSE)
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/mantoujun-lab/class-docs/pullfrog.yml?style=for-the-badge)](https://github.com/mantoujun-lab/class-docs/actions/workflows/pullfrog.yml)
[![VitePress](https://img.shields.io/badge/VitePress-black?style=for-the-badge&logo=vitepress)](https://vitepress.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-24_LTS-black?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)

[访问文档站](https://hjx-25pc1.xyz) · [GitHub 组织](https://github.com/mantoujun-lab)

</div>

---

## 👋 介绍

### 关于我们

本仓库是 **海南省经济技术学校** 25 级计算机应用 1 班的知识点文档库，由班级同学自发创建与维护。我们致力于将课堂所学、课外拓展、学习心得等内容系统化地整理下来，形成一个可长期查阅、持续更新的知识沉淀平台。

### 项目原理

项目基于 **VitePress** 构建静态文档站点，源代码托管在 **GitHub** 上，借助 **GitHub Actions** 完成自动化流程。每一次内容提交都会触发站点构建，确保文档站始终保持最新状态。

### 分享什么

只要与学习相关、可以公开的内容，都欢迎收录到本文档库中，包括但不限于：

- 📖 各学科的知识点总结与梳理
- 💻 编程笔记、代码示例与习题解析
- 🎯 学习心得、备考攻略与应试技巧
- 🔧 实用工具推荐与使用教程
- 📰 行业资讯、技术前沿与拓展阅读

## 🚀 项目

### 技术栈

- [VitePress](https://vitepress.dev/) — Vue 驱动的静态站点生成器，专为技术文档打造
- [TypeScript](https://www.typescriptlang.org/) — 配置文件使用静态类型，更健壮易维护
- [Node.js](https://nodejs.org/) 24 LTS — 本地开发与构建所需的运行时环境
- [GitHub Actions](https://github.com/features/actions) — 自动化工作流（Pullfrog AI Agent）

### 项目结构

```
class-docs/
├── docs/                      # 文档源码目录
│   ├── .vitepress/            # VitePress 配置
│   │   └── config.mts         # 站点配置文件(含 SEO head 配置)
│   ├── public/                # 静态资源（图片、图标等）
│   │   ├── favicon.png        # 网站图标
│   │   ├── funding_wechat.png # 微信赞赏码
│   │   ├── robots.txt         # 爬虫规则
│   │   ├── sitemap.xml        # 站点地图
│   │   ├── rss.xml            # RSS 订阅源
│   │   └── llms.txt           # LLM 爬虫站点说明
│   ├── index.md               # 首页
│   ├── markdown-examples.md   # Markdown 语法示例
│   ├── api-examples.md        # API 参考示例
│   └── funding.md             # 赞赏页面
├── .github/
│   └── workflows/
│       └── pullfrog.yml       # Pullfrog AI Agent 工作流
├── .gitignore
├── LICENSE
├── package.json
├── pnpm-lock.yaml
└── README.md
```

### 本地构建

在开始之前，请确保你的电脑上已经安装了 **Node.js 24 LTS** 或更高版本，以及 **pnpm** 包管理器。

```bash
# 克隆仓库
git clone https://github.com/mantoujun-lab/class-docs.git   # git
gh repo clone mantoujun-lab/class-docs                      # GitHub CLI

# 进入项目目录
cd class-docs

# 安装依赖（推荐使用 pnpm）
pnpm install

# 启动本地开发服务器
pnpm docs:dev

# 构建生产版本
pnpm docs:build

# 本地预览构建产物
pnpm docs:preview
```

启动开发服务器后，打开浏览器访问终端提示的本地地址（默认 `http://localhost:5173`）即可预览文档站。

### 部署

VitePress 项目构建后会生成纯静态资源（输出到 `docs/.vitepress/dist`），可以部署到任意静态托管平台，例如：

- **GitHub Pages** — 通过 GitHub Actions 自动发布到 gh-pages 分支
- **Vercel / Netlify** — 连接仓库后自动检测 VitePress 配置，一键部署
- **Cloudflare Pages** — 全球 CDN 加速，免费且速度优秀
- **自有服务器** — 将构建产物上传至 Nginx 等 Web 服务器即可

### 🔍 SEO 支持

本站已内置完整的搜索引擎优化（SEO）能力，便于各大搜索引擎与 AI 平台高效收录：

- **站点级 Meta** — `title / description / keywords / author / robots` 等基础标签
- **Open Graph & Twitter Card** — 链接在社交平台分享时呈现丰富的预览卡片
- **JSON-LD 结构化数据** — 使用 `schema.org/WebSite` 帮助搜索引擎理解站点信息
- **Canonical URL** — 避免重复内容惩罚，统一页面权重
- **页面级 frontmatter** — 每个 `.md` 页面均可独立声明 `title / description / keywords`
- **多语言声明** — `lang: 'zh-CN'`、`og:locale: 'zh_CN'`
- **`sitemap.xml`** — 站点地图，列出了全部可索引页面及其优先级
- **`robots.txt`** — 爬虫规则,显式允许 Google、Bing、百度以及常见 AI 爬虫(GPTBot、Claude、Perplexity 等)
- **`rss.xml`** — RSS 订阅源,方便读者与内容聚合平台追踪更新
- **`llms.txt`** — LLM 站点说明,供 GPTBot、Claude、Perplexity 等 AI 爬虫快速理解站点结构与内容
- **百度爬虫支持** — 单独的 `baiduspider` meta 标签,提升中文检索收录概率

如需进一步定制(如百度站长平台验证、Google Search Console 验证),可在 `docs/.vitepress/config.mts` 的 `head` 数组中追加对应 `<meta>` 标签。

## 🤝 贡献

### 提出建议

如果你发现文档中的错误、遗漏的知识点，或是有更好的内容组织建议，欢迎通过 [GitHub Issues](https://github.com/mantoujun-lab/class-docs/issues) 提出。无论是小到错别字，大到新的章节规划，我们都非常乐意倾听。

### 参与贡献

欢迎任何 **同学 / 校友 / 外部开发者** 参与到项目中来。贡献的方式非常多样：

- 🐛 提交 Issue 反馈错误或提出改进建议
- 💡 发起 Pull Request 补充知识点、修正文档
- ✍️ 撰写新的章节、笔记或学习心得
- 🎨 优化页面样式、交互体验与排版
- ⭐ 给项目点个 Star，这是对维护者最大的支持

在提交 Pull Request 之前，请先 **Fork** 仓库并创建一个新的分支。提交信息建议遵循约定式提交规范（Conventional Commits），例如：

- `docs: 补充 JavaScript 变量作用域知识点`
- `fix: 修正 Python 循环语法示例`
- `feat: 新增数据结构与算法章节`
- `style: 优化代码块配色与排版`

### 赞赏开发者

如果你觉得本文档库对你有帮助，愿意支持项目的持续维护，可以扫描下方的微信赞赏码 ☕

<img src="./docs/public/funding_wechat.png" alt="微信赞赏码" width="240" />

## 📄 许可证

本项目使用 [MIT License](LICENSE) 开源。可以自由地使用、修改和分发本项目的代码与内容。