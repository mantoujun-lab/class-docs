---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "25 级计算机应用 1 班"
  text: "班级文档 · 知识库"
  tagline: 记录学习点滴 · 分享实用内容 · 共同成长进步
  image:
    src: /favicon.png
    alt: 班级文档
  actions:
    - theme: brand
      text: 开始浏览
      link: /markdown-examples
    - theme: alt
      text: 班级网站
      link: https://hjx-25pc1.xyz
      target: _blank
    - theme: alt
      text: GitHub 仓库
      link: https://github.com/mantoujun-lab
      target: _blank

features:
  - icon: 📚
    title: 课程资料
    details: 汇总各学科的课件、笔记与重点知识,方便同学们随时查阅复习。
    link: /markdown-examples
    linkText: 查看更多
  - icon: 🏠
    title: 宿舍 7S 管理
    details: 学生宿舍 7S 管理标准与实施细则,营造整洁有序的生活环境。
    link: /7s
    linkText: 阅读规范
  - icon: 💻
    title: 代码片段
    details: 收集常用代码模板、API 参考与开发工具使用技巧,助力高效编码。
    link: /api-examples
    linkText: 查看示例
  - icon: ✍️
    title: 写作指南
    details: Markdown 语法、文档排版与协作流程的入门指引,人人可参与贡献。
    link: /markdown-examples
    linkText: 了解详情
  - icon: 🌟
    title: 赞赏支持
    details: 如果本站对你有帮助,欢迎通过赞赏支持我们持续维护与更新。
    link: /funding
    linkText: 赞赏作者
  - icon: 🚀
    title: 持续更新
    details: 内容由班级同学共同维护,持续收录新知识、新案例与新工具。
---

## 关于本站

本站是 **25 级计算机应用 1 班** 的官方知识库与文档中心,旨在为同学们提供:

- **统一入口**:集中管理课程资料、规范文档与常用资源
- **协作共建**:支持同学共同编辑、提交 PR,让知识流动起来
- **长期沉淀**:每一次更新都会被版本化保存,方便回顾与对比

> 💡 **提示**:页面左侧导航栏可快速访问各栏目,顶部搜索框支持关键词检索。

## 如何贡献

我们欢迎每一位用户参与到文档的建设中来!贡献方式非常简单:

1. 在 [GitHub 仓库](https://github.com/mantoujun-lab/class-docs) Fork 项目到自己的账号
2. 在本地编辑或新增 Markdown 文档
3. 提交 Pull Request,等待审核合并

```sh
# 克隆仓库
git clone https://github.com/mantoujun-lab/class-docs.git

# 安装依赖
pnpm install

# 启动本地预览
pnpm docs:dev
```

---

> 📮 如有问题或建议,请联系维护者或在 GitHub 提交 Issue。

