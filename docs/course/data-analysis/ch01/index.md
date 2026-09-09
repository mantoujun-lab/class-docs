---
title: 第 1 章 Python 数据分析简介
description: 25 级计算机应用 1 班 Python 数据分析课程讲义第一章,介绍 Python 数据分析的优势与常用开源库,并完成 Anaconda 与 Jupyter Notebook 开发环境搭建。
keywords: Python 数据分析,数据分析简介,Anaconda,Jupyter Notebook,NumPy,pandas,matplotlib,seaborn,scikit-learn,海南省经济技术学校
---
# 第 1 章 Python 数据分析简介

本栏目对应《Python 数据分析》课程讲义第 1 章,围绕「为什么用 Python 做数据分析」与「如何搭建开发环境」两个问题展开,帮助大家在写第一行数据处理代码之前,先把工具链和概念框架理顺 (๑•̀ㅂ•́)و✧。

## 学习路径

本章内容遵循 **「认识优势 → 选定工具 → 装好环境 → 跑通 Notebook」** 的顺序,建议按顺序学习,前一小节的概念会在后一小节直接使用:

```text
┌───────────────┐    ┌───────────────┐
│ 数据分析简介  │ ─→ │ 开发环境搭建 │
│  (01 节)      │    │  (02 节)     │
└───────────────┘    └───────────────┘
      │                     │
   优势 / 开源库         Anaconda + Jupyter
   NumPy / pandas         conda / pip
   matplotlib / seaborn   .ipynb / cell
```

## 本章内容

| 页面 | 内容说明 |
| --- | --- |
| [数据分析简介](/course/data-analysis/ch01/01-introduction) | 介绍 Python 做数据分析的优势,梳理 NumPy、pandas、matplotlib、seaborn、scikit-learn、Jupyter Notebook 等常用开源库 |
| [开发环境搭建](/course/data-analysis/ch01/02-env-setup) | 讲解 Anaconda 的安装、虚拟环境与包管理,以及 Jupyter Notebook 的启动、界面与常用快捷键 |

## 前置知识

在开始本章之前,建议已经具备以下基础,否则部分小节可能看不太懂:

- Python 基本语法:变量、函数、`import` 语句、`for` / `if` 条件分支。
- 列表、字典、字符串等基本数据结构。
- `pip` 安装第三方库的方法,知道 `pip install 包名` 怎么用。
- Windows 基础操作:能在「开始菜单」找到软件、能在 PowerShell / CMD 中切换目录。

::: tip 学习环境小提示
本栏目命令示例以 Windows PowerShell / Anaconda Prompt 为准,macOS 与 Linux 用户请把 `conda activate` 等命令放在自带终端中执行,路径分隔符也需自行替换。
:::

---

> 📌 本章内容整理自 GitBook 版讲义,由班级同学整理迁移到 VitePress 站点。
