---
title: 参与共建
description: 25 级计算机应用 1 班知识库的参与共建指南,介绍本地预览、目录规范与 Pull Request 提交流程。
keywords: 参与共建,贡献指南,Pull Request,VitePress,本地预览,班级文档
---

# 参与共建

本站由班级同学共同维护,任何人都可以补充笔记、修正错误或推荐资源。本页说明从环境准备到提交 Pull Request 的完整流程。

## 站点结构

| 目录 | 存放内容 |
| --- | --- |
| `docs/course/` | 各学科课程笔记 |
| `docs/guide/` | 写作规范、协作流程、学习方法 |
| `docs/resources/` | 工具推荐与行业资讯 |
| `docs/class/` | 班级制度与管理规范 |
| `docs/public/` | 图片等静态资源,发布后位于站点根目录 |
| `docs/.vitepress/config.mts` | 导航、侧边栏与站点元信息 |

页面路径统一使用小写英文字母、数字与连字符,不要包含空格。

## 本地预览

需要先安装 [Node.js](https://nodejs.org/) 与 [pnpm](https://pnpm.io/)。

```powershell
# 克隆仓库
git clone https://github.com/mantoujun-lab/class-docs.git
cd class-docs

# 安装依赖
pnpm install

# 启动本地预览,默认地址 http://localhost:5173
pnpm docs:dev
```

提交前请构建一次,确认没有失效链接:

```powershell
pnpm docs:build
```

## 新增页面

1. 在对应目录下新建 Markdown 文件
2. 补全 frontmatter 的 `title`、`description`、`keywords` 三个字段
3. 按 [Markdown 写作](/guide/writing) 的规范编写正文
4. 在 `docs/.vitepress/config.mts` 的对应侧边栏分组中登记新页面

frontmatter 示例:

```md
---
title: 计算机基础
description: 操作系统、硬件组成与文件管理的课堂笔记整理。
keywords: 计算机基础,操作系统,硬件组成,文件管理
---
```

## 提交 Pull Request

```powershell
# 基于 main 新建分支
git checkout -b docs/add-course-note

# 提交改动,信息使用 Conventional Commits 格式
git add docs/course/fundamentals.md
git commit -m "docs(course): add computer fundamentals note"

# 推送并在 GitHub 上创建 Pull Request
git push -u origin docs/add-course-note
```

提交信息格式为 `<type>(scope): <subject>`,常用 type 包括 `docs`、`feat`、`fix`、`chore`,主题使用小写英文动词开头、不超过 50 字符、结尾不加句号。

::: warning 注意
请勿提交密钥、令牌、个人隐私信息以及 `docs/.vitepress/dist/`、`node_modules/` 等生成目录。
:::

---

> 📮 流程上有疑问,可在 [GitHub 仓库](https://github.com/mantoujun-lab/class-docs) 提交 Issue 讨论。
