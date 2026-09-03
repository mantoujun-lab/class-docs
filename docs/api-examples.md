---
title: 运行时 API 示例
description: VitePress 运行时 API 用法示例,演示如何通过 useData() 在 .md 与 .vue 文件中访问站点、主题与页面数据。
keywords: VitePress API,useData,运行时 API,VitePress 教程,前端开发
outline: deep
---

# 运行时 API 示例

本页演示了 VitePress 提供的一些运行时 API 的使用方法。

主要的 `useData()` API 可以用于访问当前页面的站点、主题和页面数据。它在 `.md` 和 `.vue` 文件中都可以使用:

```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## 结果

### 主题数据
<pre>{{ theme }}</pre>

### 页面数据
<pre>{{ page }}</pre>

### 页面前置元数据
<pre>{{ frontmatter }}</pre>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

## 结果

### 主题数据
<pre>{{ theme }}</pre>

### 页面数据
<pre>{{ page }}</pre>

### 页面前置元数据
<pre>{{ frontmatter }}</pre>

## 更多

查看文档以了解 [运行时 API 的完整列表](https://vitepress.dev/reference/runtime-api#usedata)。
