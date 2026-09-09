---
title: 数据分析讲义
description: 25 级计算机应用 1 班 Python 数据分析讲义,涵盖 pandas 快速入门、数据清洗、数据处理、数据可视化与综合案例,共 6 章 22 节,适合课堂复习与查阅。
keywords: 数据分析,Python,pandas,NumPy,Matplotlib,seaborn,pyecharts,数据清洗,数据可视化,RFM,海南省经济技术学校
---

# 数据分析讲义

本栏目收录《Python 数据分析》课程讲义,从开发环境搭建起步,逐步覆盖 pandas 数据结构、数据清洗与处理、可视化绘图,最后落到 Appstore、优衣库销售与 RFM 用户分群三大综合案例,共 **6 章 22 节**。讲义由 GitBook 版本迁移整理,备好示例所需的数据文件后即可复制运行,适合课堂复习与查阅 (๑•̀ㅂ•́)و✧。

## 学习路径

整套讲义按 **「入门 → 清洗 → 处理 → 可视化 → 综合实战」** 五阶段递进,每一阶段建立在前一阶段基础上,建议按顺序学习:

```text
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│  ch01   │ →  │  ch02   │ →  │  ch03   │ →  │  ch04   │ →  │  ch05   │
│ 简介+环境│    │ 快速入门 │    │ 数据清洗 │    │ 数据处理 │    │ 可视化  │
└─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘
                                                                     │
                                                                     ↓
                                                              ┌─────────┐
                                                              │  ch06   │
                                                              │ 综合案例 │
                                                              └─────────┘
```

## 章节目录

| 章节 | 主题 | 节数 | 你将掌握 |
| --- | --- | --- | --- |
| [第 1 章 Python 数据分析简介](/course/data-analysis/ch01/) | 入门与环境 | 2 | Python 数据分析优势、Anaconda、Jupyter Notebook |
| [第 2 章 pandas 快速入门](/course/data-analysis/ch02/) | 数据结构基础 | 5 | DataFrame/Series、CSV/TSV 读取、增删改查、租房数据示例 |
| [第 3 章 pandas 数据清洗](/course/data-analysis/ch03/) | 数据预处理 | 4 | 数据组合、缺失值处理、数据整理、pandas 数据类型 |
| [第 4 章 pandas 数据处理](/course/data-analysis/ch04/) | 进阶分析 | 4 | apply 自定义函数、分组聚合、数据透视表、datetime |
| [第 5 章 Python 数据可视化](/course/data-analysis/ch05/) | 绘图实战 | 4 | Matplotlib、pandas 绘图、seaborn、pyecharts |
| [第 6 章 pandas 综合案例](/course/data-analysis/ch06/) | 完整案例 | 3 | Appstore 数据分析、优衣库销售分析、RFM 用户分群 |

## 前置知识

在开始本栏目之前,建议已经掌握以下基础,否则部分代码可能看不懂:

- Python 基本语法:变量、函数、`import` 语句、`for` / `if` 条件分支。
- 列表、字典、字符串等基本数据结构。
- `pip` 安装第三方库的方法,知道 `pip install 包名` 怎么用。
- 推荐使用 VS Code + Python 扩展,或 Jupyter Notebook,方便分块运行代码。

::: tip 学习环境小提示
本栏目命令示例以 Windows PowerShell / Anaconda Prompt 为准,macOS 与 Linux 用户请把 `conda activate` 等命令放在自带终端中执行,路径分隔符也需自行替换。
:::

## 如何补充新内容

1. 在 `docs/course/data-analysis/chXX/` 下按章节新建 Markdown 文件,例如 `docs/course/data-analysis/ch02/06-new-topic.md`
2. 按 [Markdown 写作](/guide/writing) 的规范编写,代码块务必声明语言
3. 在 `docs/.vitepress/config.mts` 的 `/course/` 侧边栏中登记新页面
4. 按 [参与共建](/guide/contributing) 的流程提交 Pull Request

---

> 📌 本栏目讲义整理自 GitBook 版讲义,由班级同学整理迁移到 VitePress 站点。备好示例所需的数据文件后,代码即可直接复制运行,但建议先理解思路再敲代码,避免照搬带来的「学长坑」。
