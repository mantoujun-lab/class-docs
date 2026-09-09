---
title: pandas 数据处理
description: pandas 数据处理章节围绕 apply 自定义函数、数据分组、数据透视表与 datetime 时间序列展开，覆盖聚合、转换、过滤与时间序列分析的常见操作。
keywords: pandas,数据处理,apply,applymap,groupby,聚合,透视表,pivot_table,datetime,时间序列
---

## 栏目简介

本栏目是「数据分析讲义」的第 4 章，主题为 **pandas 数据处理**。在前面章节完成数据清洗与类型转换的基础上，本章进一步介绍 pandas 中最常用的几类「数据处理」操作，包括：

- 用 `apply` 与 `applymap` 把自定义函数应用到 `Series` 或 `DataFrame` 的每个元素；
- 用 `groupby` 完成分组后的聚合、转换与过滤；
- 用 `pivot_table` 制作数据透视表，从多个维度观察会员运营情况；
- 用 `datetime` 处理日期时间类型数据，支持日期运算、按时间取值与重采样。

每一节都配有可运行的代码示例与运行结果截图，建议按顺序学习：先掌握 `apply`，再进入分组与透视表，最后处理时间序列。

## 本章目录

| 小节 | 内容说明 |
| --- | --- |
| [apply 自定义函数](/course/data-analysis/ch04/01-apply) | `apply` / `applymap` 用法、函数向量化、`lambda` 表达式 |
| [数据分组操作](/course/data-analysis/ch04/02-groupby) | `groupby` 分组后的聚合、`transform` 转换、`filter` 过滤 |
| [数据透视表](/course/data-analysis/ch04/03-pivot-table) | `pivot_table` 用法与零售会员数据分析案例 |
| [datetime 数据类型](/course/data-analysis/ch04/04-datetime) | `datetime` 类型、日期运算、`date_range` 与重采样 |

---
