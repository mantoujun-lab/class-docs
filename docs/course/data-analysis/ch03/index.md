---
title: pandas 数据清洗
description: pandas 数据清洗栏目,涵盖数据组合(concat/merge/join)、缺失值处理、数据整理与 pandas 数据类型,适合课堂复习。
keywords: pandas,数据清洗,数据组合,缺失值,数据整理,数据类型,concat,merge,join
---

## 栏目简介

本栏目对应《pandas 数据清洗》一章,围绕真实数据分析工作中最常见的清洗动作展开:把多张表组合成一张表、处理缺失值、整理数据形态,以及理解 pandas 中的常见数据类型。每节都配有可运行的代码示例与截图,适合课堂复习与上机练习。

## 本栏目内容

| 序号 | 主题 | 关键 API | 内容说明 |
| --- | --- | --- | --- |
| 3.1 | [数据组合](/course/data-analysis/ch03/01-data-combine) | `pd.concat` / `pd.merge` / `df.join` | 多张表按行/列拼接与关联组合 |
| 3.2 | [缺失值处理](/course/data-analysis/ch03/02-missing-value) | `isnull` / `fillna` / `dropna` | 识别、填充与删除缺失值 |
| 3.3 | [数据整理](/course/data-analysis/ch03/03-data-reshape) | `melt` / `pivot` / 堆叠 | 宽表与长表互转、堆叠与拆堆 |
| 3.4 | [pandas 数据类型](/course/data-analysis/ch03/04-pandas-types) | `astype` / `to_numeric` | pandas 常见数据类型与类型转换 |

## 学习建议

- 按章节顺序阅读,前三节侧重操作,第四节侧重概念。
- 每段代码都可在本地 Python 环境中复现,建议使用 VS Code 或 Jupyter Notebook 分块运行。
- 数据文件与图片资源位于仓库 `docs/public/data-analysis/` 目录下,代码示例中的相对路径仅供参考。

---

> 📌 本栏目内容由课堂讲义整理而来,代码示例可直接复制运行,如发现错误欢迎按 [参与共建](/guide/contributing) 流程反馈。
