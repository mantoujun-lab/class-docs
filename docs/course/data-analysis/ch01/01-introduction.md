---
title: Python 数据分析简介
description: 介绍 Python 做数据分析的优势,梳理 NumPy、pandas、matplotlib 等常用开源库,适合数据分析入门。
keywords: Python 数据分析,数据分析简介,NumPy,pandas,matplotlib,seaborn,scikit-learn,Jupyter Notebook,开源库,海南省经济技术学校
---
# Python 数据分析简介

## 学习目标

- 了解 Python 做数据分析的优势
- 知道 Python 数据分析常用开源库

## 1. 为什么使用 Python 进行数据分析

### 1.1 使用 Python 进行数据分析的优势

![chapter01-01](/data-analysis/chapter01-01.webp)

- Python 作为当下最为流行的编程语言之一,可以独立完成数据分析的各种任务

  > 1) 功能强大,在数据分析领域里有海量开源库,并持续更新
  > 2) 是当下热点——机器学习/深度学习 领域最热门的编程语言
  > 3) 除数据分析领域外,在爬虫/Web 开发等领域均有应用

- 与 Excel、PowerBI、Tableau 等软件比较

  > 1) Excel 有百万行数据限制,PowerBI/Tableau 在处理大数据的时候速度相对较慢
  > 2) Excel、Power BI 和 Tableau 需要付费购买授权
  > 3) Python 作为热门编程语言,功能远比 Excel、PowerBI、Tableau 等软件强大
  > 4) Python 跨平台,Windows、MacOS、Linux 都可以运行

- 与 R 语言比较

  > 1) Python 在处理海量数据的时候比 R 语言效率更高
  > 2) Python 的工程化能力更强,应用领域更广泛,R 专注于统计与数据分析领域
  > 3) Python 在非结构化数据(文本、音视频、图像)和深度学习领域比 R 更具有优势
  > 4) 在数据分析相关开源社区,Python 相关的内容远多于 R 语言

## 2. 常用 Python 数据分析开源库介绍

### 2.1 NumPy

![chapter01-02](/data-analysis/chapter01-02.webp)

- NumPy(Numerical Python) 是 Python 语言的一个扩展程序库
- 是一个运行速度非常快的数学库,主要用于数组计算,包含:

  > 1) 一个强大的 N 维数组对象 ndarray
  > 2) 广播功能函数
  > 3) 整合 C/C++/Fortran 代码的工具
  > 4) 线性代数、傅里叶变换、随机数生成等功能

### 2.2 pandas

![chapter01-03](/data-analysis/chapter01-03.webp)

- Pandas 是一个强大的分析结构化数据的工具集

  > 1) 它的使用基础是 Numpy(提供高性能的矩阵运算)
  > 2) 用于数据挖掘和数据分析,同时也提供数据清洗功能

- Pandas 利器之 Series

  > 1) 它是一种类似于一维数组的对象
  > 2) 是由一组数据(各种 NumPy 数据类型)以及一组与之相关的数据标签(即索引)组成
  > 3) 仅由一组数据也可产生简单的 Series 对象

- Pandas 利器之 DataFrame

  > 1) DataFrame 是 Pandas 中的一个表格型的数据结构
  > 2) 包含有一组有序的列,每列可以是不同的值类型(数值、字符串、布尔型等)
  > 3) DataFrame 即有行标签(行索引)也有列标签(列索引),可以被看做是由 Series 组成的字典

### 2.3 matplotlib

![chapter01-04](/data-analysis/chapter01-04.webp)

- Matplotlib 是一个功能强大的数据可视化开源 Python 库
- Python 中使用最多的图形绘图库
- 可以创建静态,动态和交互式的图表

### 2.4 seaborn

![chapter01-05](/data-analysis/chapter01-05.webp)

- Seaborn 是一个 Python 数据可视化开源库
- 建立在 matplotlib 之上,并集成了 pandas 的数据结构
- Seaborn 通过更简洁的 API 来绘制信息更丰富,更具吸引力的图像
- 面向数据集的 API,与 Pandas 配合使用起来比直接使用 Matplotlib 更方便

### 2.5 scikit-learn

![chapter01-06](/data-analysis/chapter01-06.webp)

- scikit-learn 是基于 Python 语言的机器学习工具

  > 1) 简单高效的数据挖掘和数据分析工具
  > 2) 可供大家在各种环境中重复使用
  > 3) 建立在 NumPy、SciPy 和 matplotlib 上

### 2.6 Jupyter Notebook

![chapter01-07](/data-analysis/chapter01-07.webp)

- Jupyter Notebook 是一个开源 Web 应用程序,使用 Jupyter Notebook 可以创建和共享

  > 1) 代码
  > 2) 数学公式
  > 3) 可视化图表
  > 4) 笔记文档

- Jupyter Notebook 用途

  > 1) 数据清理和转换
  > 2) 数值模拟
  > 3) 统计分析
  > 4) 数据可视化
  > 5) 机器学习等

- Jupyter Notebook 是数据分析学习和开发的首选开发环境

## 小结

- 了解 Python 做数据分析的优势
  - Python 可以独立高效的完成数据分析相关的全部工作
- 知道 Python 数据分析常用开源库
  - Pandas、Numpy、Matplotlib、Seaborn、SKlearn、Jupyter Notebook
