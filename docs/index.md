---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

title: 25 级计算机应用 1 班知识库
description: 海南省经济技术学校 25 级计算机应用 1 班官方知识库首页，提供课程笔记、编程示例、学习心得与实用工具的统一入口，欢迎同学们共建共享。
keywords: 班级文档，知识库首页，计算机应用，学习笔记，编程教程，VitePress，海南省经济技术学校

hero:
  name: "25 级计算机应用 1 班"
  text: "班级文档 · 知识库"
  tagline: 记录学习点滴 · 分享实用内容 · 共同成长进步
  image:
    src: /favicon.png
    alt: 25 级计算机应用 1 班知识库
  actions:
    - theme: brand
      text: 开始浏览
      link: /guide/
    - theme: alt
      text: 参与共建
      link: /guide/contributing
    - theme: alt
      text: GitHub 仓库
      link: https://github.com/mantoujun-lab/class-docs
      target: _blank

features:
  - icon: 📖
    title: 课程笔记
    details: 计算机应用专业各学科知识点、课堂笔记与习题解析，系统复习好帮手。
    link: /course/
    linkText: 进入栏目
  - icon: 📝
    title: 学习指南
    details: Markdown 写作规范、文档协作流程与学习方法，人人可参与贡献。
    link: /guide/
    linkText: 进入栏目
  - icon: 🧰
    title: 资源
    details: 同学亲测好用的工具软件，以及值得关注的行业资讯与技术前沿。
    link: /resources/
    linkText: 进入栏目
  - icon: 🏠
    title: 班级事务
    details: 宿舍 7S 管理标准等班级制度与规范，方便随时查阅与执行。
    link: /class/
    linkText: 进入栏目
  - icon: 🤝
    title: 参与共建
    details: 从本地预览到提交 Pull Request 的完整流程，几步就能贡献一页文档。
    link: /guide/contributing
    linkText: 查看流程
  - icon: 🌟
    title: 赞赏支持
    details: 如果本站对你有帮助，欢迎通过赞赏支持我们持续维护与更新。
    link: /funding
    linkText: 赞赏作者
---

<script setup>
import { data } from './.vitepress/data/updates.data'
</script>

::: info 📢 班级公告
- 知识库持续更新中，欢迎同学们投稿共建，流程见[参与共建](/guide/contributing)。
- 《宿舍 7S 管理标准》已收录，请对照[宿舍 7S 管理](/class/7s)执行与自查。
:::

## 📊 站点速览

<div class="home-stats">
  <div class="home-stat">
    <span class="home-stat-num">{{ data.stats.pageCount }}</span>
    <span class="home-stat-label">文档页面</span>
  </div>
  <div class="home-stat">
    <span class="home-stat-num">{{ data.stats.sectionCount }}</span>
    <span class="home-stat-label">内容栏目</span>
  </div>
  <div class="home-stat">
    <span class="home-stat-num">{{ data.stats.lastUpdated }}</span>
    <span class="home-stat-label">最近更新</span>
  </div>
</div>

## 🕒 最近更新

<ul class="home-updates">
  <li v-for="item in data.updates" :key="item.url">
    <a :href="item.url">{{ item.title }}</a>
    <time class="home-updates-date">{{ item.date }}</time>
  </li>
</ul>

## 🔥 热门直达

- [宿舍 7S 管理标准](/class/7s)：宿舍卫生与值日安排的执行细则，随时查阅。
- [实用工具推荐](/resources/tools)：同学亲测好用的软件与在线工具。
- [Markdown 写作规范](/guide/writing)：投稿前必读的格式与排版要求。
- [参与共建](/guide/contributing)：从本地预览到提交 PR 的完整流程。

<style>
.vp-doc .home-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.vp-doc .home-stat {
  flex: 1 1 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 20px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
}

.vp-doc .home-stat-num {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.4;
  color: var(--vp-c-brand-1);
}

.vp-doc .home-stat-label {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.vp-doc ul.home-updates {
  margin: 0;
  padding: 0;
  list-style: none;
}

.vp-doc .home-updates li {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  margin: 0;
  padding: 10px 0;
  border-bottom: 1px dashed var(--vp-c-divider);
}

.vp-doc .home-updates li:last-child {
  border-bottom: none;
}

.vp-doc .home-updates a {
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.vp-doc .home-updates a:hover {
  text-decoration: underline;
}

.vp-doc .home-updates-date {
  flex-shrink: 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
</style>
